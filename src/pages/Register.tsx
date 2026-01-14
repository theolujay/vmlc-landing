import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../components/ui/Button';

import FacialCaptureModal from '../components/FacialCaptureModal';
import Countdown from '../components/Countdown';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { extractErrorMessage, handleNetworkError } from '../utils/api';
import { validateEmail, validatePhone } from '../utils/validation';

type UserType = 'candidate' | 'volunteer';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Register: React.FC = () => {
  // useSearchParams: Access URL query parameters (e.g., ?type=volunteer).
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialType = (searchParams.get('type') as UserType) === 'volunteer' ? 'volunteer' : 'candidate';
  
  // State for form mode and status
  const [userType, setUserType] = useState<UserType>(initialType);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  // Intercept back button to ensure it goes to Home
  useEffect(() => {
    // Push the current state to history so "Back" stays within the app context initially
    // and triggers our popstate handler
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      navigate('/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  
  // useRef: References a DOM element directly. Here, used to clear the file input field programmatically.
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [regStatus, setRegStatus] = useState<{
    candidate_registration: { is_open: boolean; closing_date: string | null };
    staff_registration: { is_open: boolean; closing_date: string | null };
    support_email: string;
  } | null>(null);
  const [fetchingRegStatus, setFetchingRegStatus] = useState(true);
  const [regStatusError, setRegStatusError] = useState(false);

  // useEffect: Runs code after the component renders.
  // The empty dependency array [] means this runs only once when the component "mounts" (loads).
  useEffect(() => {
    const fetchRegStatus = async () => {
      try {
        // Accessing environment variables (like os.environ in Python)
        // const apiKey = import.meta.env.VITE_API_KEY;
        const baseApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        const response = await fetch(`${baseApiUrl}/v2/registration/`, {
          headers: {
            // 'x-api-key': apiKey,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRegStatus(data);
        } else {
            setRegStatusError(true);
        }
      } catch (error) {
        console.error('Failed to fetch registration status', error);
        setRegStatusError(true);
      } finally {
        setFetchingRegStatus(false);
      }
    };
    fetchRegStatus();
  }, []);

  // Sync userType if query param changes (optional but good for UX)
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'volunteer' || type === 'candidate') {
      setUserType(type as UserType);
    }
  }, [searchParams]);

  const initialCandidateData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    school_name: '',
    school_type: 'public',
    current_class: 'SS1',
    state: 'Lagos',
    document_type: 'school ID card',
    consent: false,
  };

  const initialVolunteerData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    occupation: '',
    state: '',
    document_type: 'NIN',
    consent: false,
  };

  // Multiple state variables for different form data sets
  const [candidateData, setCandidateData] = useState(initialCandidateData);
  const [volunteerData, setVolunteerData] = useState(initialVolunteerData);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  
  // Facial Capture State
  // Note: capturedImage is kept in memory (File) to avoid sensitive data persistence (Security)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);

  const [showPreRegisterPopup, setShowPreRegisterPopup] = useState(false);

  useEffect(() => {
    if (fetchingRegStatus) return;

    const isRegistrationClosed = regStatus && ((userType === 'candidate' && !regStatus.candidate_registration.is_open) || (userType === 'volunteer' && !regStatus.staff_registration.is_open));
    
    // Don't show if closed (they see the big message) or if successful
    if (isRegistrationClosed || status === 'success') return;

    const timer = setTimeout(() => {
        setShowPreRegisterPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [fetchingRegStatus, regStatus, userType, status]);

  // "Controlled Component" pattern:
  // The React state is the "single source of truth". When input changes, we update state.
  // The input value is always read from state.
  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    // Functional state update: prev represents the previous state.
    // We use spread syntax (...prev) to copy old data and overwrite only the changed field [name].
    setCandidateData((prev) => ({ ...prev, [name]: val }));
  };

  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setVolunteerData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setStatus('error');
        setMessage('File size exceeds 5MB limit. Please upload a smaller file.');
        setDocumentFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setDocumentFile(file);
        // Clear error if it was a file size error
        if (status === 'error' && message.includes('File size')) {
          setStatus('idle');
          setMessage('');
        }
      }
    }
  };

  const handleFaceCaptureConfirm = (file: File) => {
    setCapturedImage(file);
    const objectUrl = URL.createObjectURL(file);
    setCapturedPreview(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default HTML form submission (page reload)
    setStatus('loading');
    setMessage('');

    const userData = userType === 'candidate' ? candidateData : volunteerData;

    // Validation
    if (!validateEmail(userData.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(userData.phone)) {
      setStatus('error');
      setMessage('Please enter a valid phone number (091-XXXX-XXXX).');
      return;
    }

    if (!capturedImage) {
      setStatus('error');
      setMessage('Please capture your face for verification.');
      return;
    }

    const apiKey = import.meta.env.VITE_API_KEY;
    const baseApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    try {
      // FormData: Native browser API for constructing multipart/form-data requests.
      // Essential for file uploads.
      const formData = new FormData();
      formData.append('user_type', userType);
      
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      if (documentFile) {
        formData.append('document', documentFile);
      }
      
      // Requirement: Append captured image as 'face_capture'
      // Note: Image is stored in memory (File object) and not localStorage for security
      if (capturedImage) {
        formData.append('face_capture', capturedImage);
      }

      // Fetch API: Native JavaScript function for making network requests.
      const response = await fetch(`${baseApiUrl}/v2/register/`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          // Note: Content-Type header is NOT set manually for FormData.
          // The browser automatically sets it with the correct boundary.
        },
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || `Registration successful as a ${userType}.\nWe sent you an email.`);
        // Reset forms
        setCandidateData(initialCandidateData);
        setVolunteerData(initialVolunteerData);
        setDocumentFile(null);
        setCapturedImage(null);
        setCapturedPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setStatus('error');
        setMessage(extractErrorMessage(data));
      }
    } catch {
      setStatus('error');
      setMessage(handleNetworkError());
    }
  };

  // Cleanup preview URL on unmount or when it changes to prevent memory leaks.
  useEffect(() => {
    return () => {
      if (capturedPreview) {
        URL.revokeObjectURL(capturedPreview);
      }
    };
  }, [capturedPreview]);

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="py-20 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-2 py-1 bg-brand-accent rounded-full text-brand-blue text-sm font-bold tracking-wide uppercase mb-4">
            <span style={{ fontFamily: 'Helvetica, sans-serif' }}>We are live!</span>
          </div>
          <h1 className="font-black text-4xl md:text-5xl text-gray-900 mb-6" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            Register <span className="text-brand-blue">Today</span>
          </h1>
          <p className="text-xl text-gray-600">
            Choose your registration path and become part of the Verboheit Mathematics League Competition.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success!</h2>
              <p className="text-lg text-gray-600 mb-8">{message}</p>
              <Button onClick={() => setStatus('idle')} variant="primary">
                Register another person
              </Button>
            </div>
          ) : (
            <>
              <div className="flex p-1 bg-gray-100 rounded-2xl mb-10">
                <button
                  onClick={() => { setUserType('candidate'); setStatus('idle'); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                    userType === 'candidate' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Candidate
                </button>
                <button
                  onClick={() => { setUserType('volunteer'); setStatus('idle'); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                    userType === 'volunteer' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Volunteer
                </button>
              </div>

              {regStatus && (userType === 'candidate' ? regStatus.candidate_registration.is_open : regStatus.staff_registration.is_open) && (
                <Countdown 
                  targetDate={
                    (userType === 'candidate' 
                      ? regStatus.candidate_registration.closing_date 
                      : regStatus.staff_registration.closing_date) || ''
                  } 
                />
              )}

              {fetchingRegStatus ? (
                <div className="flex justify-center py-12">
                  <svg className="animate-spin h-10 w-10 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : regStatusError ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                    We couldn&apos;t check the registration status. Please check your internet connection and try again.
                  </p>
                  <Button onClick={() => window.location.reload()} variant="primary">
                    Refresh Page
                  </Button>
                </div>
              ) : regStatus && ((userType === 'candidate' && !regStatus.candidate_registration.is_open) || (userType === 'volunteer' && !regStatus.staff_registration.is_open)) ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                    {userType === 'candidate' ? 'Candidate' : 'Volunteer'} registration is currently not open. Please reach out to <a href={`mailto:${regStatus.support_email}`} className="text-brand-blue font-semibold hover:underline">{regStatus.support_email}</a> if you have inquiries
                  </p>
                  <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 max-w-lg mx-auto">
                    <p className="text-brand-blue font-semibold mb-4">
                      Would you like to be notified as soon as it opens?
                    </p>
                    <Link to="/pre-register">
                      <Button variant="primary" className="shadow-none">
                        Pre-register for Updates
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first_name" className={labelClasses}>First Name</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      required
                      value={userType === 'candidate' ? candidateData.first_name : volunteerData.first_name}
                      onChange={userType === 'candidate' ? handleCandidateChange : handleVolunteerChange}
                      className={inputClasses}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className={labelClasses}>Last Name</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      required
                      value={userType === 'candidate' ? candidateData.last_name : volunteerData.last_name}
                      onChange={userType === 'candidate' ? handleCandidateChange : handleVolunteerChange}
                      className={inputClasses}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={userType === 'candidate' ? candidateData.email : volunteerData.email}
                      onChange={userType === 'candidate' ? handleCandidateChange : handleVolunteerChange}
                      className={inputClasses}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={userType === 'candidate' ? candidateData.phone : volunteerData.phone}
                      onChange={userType === 'candidate' ? handleCandidateChange : handleVolunteerChange}
                      className={inputClasses}
                      placeholder="091-XXXX-XXXX"
                    />
                  </div>
                </div>

                {userType === 'candidate' ? (
                  <>
                    <div>
                      <label htmlFor="school_name" className={labelClasses}>School Name</label>
                      <input
                        type="text"
                        id="school_name"
                        name="school_name"
                        required
                        value={candidateData.school_name}
                        onChange={handleCandidateChange}
                        className={inputClasses}
                        placeholder="Federal Government College Ijanikin"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="state" className={labelClasses}>State</label>
                        <select
                          id="state"
                          name="state"
                          value={candidateData.state}
                          onChange={handleCandidateChange}
                          className={inputClasses}
                        >
                          <option value="Lagos">Lagos</option>
                          <option value="Ogun">Ogun</option>
                          <option value="Rivers">Rivers</option>
                          <option value="Cross River">Cross River</option>
                          <option value="Abuja">Abuja</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="school_type" className={labelClasses}>School Type</label>
                        <select
                          id="school_type"
                          name="school_type"
                          value={candidateData.school_type}
                          onChange={handleCandidateChange}
                          className={inputClasses}
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="current_class" className={labelClasses}>Current Class</label>
                        <select
                          id="current_class"
                          name="current_class"
                          value={candidateData.current_class}
                          onChange={handleCandidateChange}
                          className={inputClasses}
                        >
                          <option value="SS1">SS1</option>
                          <option value="SS2">SS2</option>
                          <option value="SS3">SS3</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="document_type" className={labelClasses}>Document Type
                          <span className="text-gray-500 font-normal text-xs ml-1">
                            (School ID card / Report card / NIN)
                          </span>
                        </label>
                        <select
                          id="document_type"
                          name="document_type"
                          value={candidateData.document_type}
                          onChange={handleCandidateChange}
                          className={inputClasses}
                        >
                          <option value="school ID card">School ID Card</option>
                          <option value="report card">Report Card</option>
                          <option value="NIN">NIN</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="occupation" className={labelClasses}>Occupation</label>
                        <input
                          type="text"
                          id="occupation"
                          name="occupation"
                          required
                          value={volunteerData.occupation}
                          onChange={handleVolunteerChange}
                          className={inputClasses}
                          placeholder="Teacher, Engineer, etc."
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className={labelClasses}>State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          required
                          value={volunteerData.state}
                          onChange={handleVolunteerChange}
                          className={inputClasses}
                          placeholder="Where are you currently?"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="document_type" className={labelClasses}>Document Type
                          <span className="text-gray-500 font-normal text-xs ml-1">
                            (NIN / Passport / Driver&apos;s License)
                          </span>
                        </label>
                        <select
                          id="document_type"
                          name="document_type"
                          value={volunteerData.document_type}
                          onChange={handleVolunteerChange}
                          className={inputClasses}
                        >
                          <option value="NIN">NIN</option>
                          <option value="passport">Passport</option>
                          <option value="drivers license">Driver&apos;s License</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                  <div>
                    <label htmlFor="document" className={labelClasses}>Document Upload</label>
                    <input
                      type="file"
                      id="document"
                      name="document"
                      required
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent file:text-brand-blue hover:file:bg-blue-200`}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <p className="mt-2 text-xs text-gray-500">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                  </div>

                {/* Facial Capture Section */}
                <div>
                    <label className={labelClasses}>Face Capture</label>
                    <div className={`${inputClasses} flex items-center justify-between py-2 h-[58px]`}>
                        <div className="flex items-center">
                            <button 
                                type="button" 
                                onClick={() => setIsModalOpen(true)}
                                className="mr-4 py-2 px-4 rounded-full border-0 text-sm font-semibold bg-brand-accent text-brand-blue hover:bg-blue-200 transition-colors focus:outline-none"
                            >
                                {capturedImage ? 'Recapture' : 'Capture'}
                            </button>
                            <span className={`text-sm truncate ${capturedImage ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                                {capturedImage ? 'Photo captured successfully' : 'No photo taken'}
                            </span>
                        </div>
                        
                        {capturedPreview && (
                            <div className="flex-shrink-0 relative">
                                <div className="h-10 w-10 rounded-full overflow-hidden border border-brand-blue shadow-sm">
                                    <img src={capturedPreview} alt="Face Preview" className="h-full w-full object-cover" />
                                </div>
                                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border border-white">
                                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                     <p className="mt-2 text-xs text-gray-500">Required for identity verification. Please ensure your face is clearly visible.</p>
                </div>

                <FacialCaptureModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleFaceCaptureConfirm}
                />

                <PreRegisterPopup 
                    isOpen={showPreRegisterPopup}
                    onClose={() => setShowPreRegisterPopup(false)}
                />

                <div className="space-y-4 bg-blue-50 p-4 rounded-2xl">
                  {/* Terms & Privacy Consent */}
                  <div className="flex items-start space-x-3">
                    <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={userType === 'candidate' ? candidateData.consent : volunteerData.consent}
                        onChange={userType === 'candidate' ? handleCandidateChange : handleVolunteerChange}
                        className="mt-1 w-5 h-5 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                    />
                    <label htmlFor="consent" className="text-sm font-medium text-brand-blue">
                        By selecting &quot;Register&quot;, you&apos;re confirming that you have read and agreed to Verboheit MLC&apos;s <Link to="/terms-and-conditions" target="_blank" className="underline hover:text-blue-800">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank" className="underline hover:text-blue-800">Privacy Policy</Link>.
                    </label>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-medium border border-red-100">
                    {message}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={status === 'loading' || !(userType === 'candidate' ? candidateData.consent : volunteerData.consent)}
                  className={status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'py-4 shadow-lg shadow-blue-200'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : `Register as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
                </Button>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">
                    Can&apos;t complete the full registration right now?{' '}
                    <Link to="/pre-register" className="text-brand-blue font-bold hover:underline">
                      Pre-register
                    </Link>{' '}
                    to receive updates.
                  </p>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);
};

const PreRegisterPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in slide-in-from-bottom-10 fade-in duration-300">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Not ready to register?</h3>
            <p className="text-gray-600 mb-6">
                If you don&apos;t have all your documents yet, you can <span className="text-brand-blue font-semibold">Pre-register</span> to stay updated and complete your registration later.
            </p>
            <div className="flex flex-col space-y-3">
                <Link to="/pre-register" className="w-full">
                    <Button variant="primary" fullWidth onClick={onClose}>
                        Go to Pre-registration
                    </Button>
                </Link>
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 font-medium text-sm py-2"
                >
                    I&apos;ll continue registering
                </button>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Register;
