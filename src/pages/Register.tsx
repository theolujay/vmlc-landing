import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../components/ui/Button';

// import FacialCaptureModal from '../components/FacialCaptureModal';
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
        const baseApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        const response = await fetch(`${baseApiUrl}/v2/registration/`, {});
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
  const [showPreRegisterPopup, setShowPreRegisterPopup] = useState(false);

  useEffect(() => {
    if (fetchingRegStatus) return;

    const isRegistrationClosed = regStatus && ((userType === 'candidate' && !regStatus.candidate_registration.is_open) || (userType === 'volunteer' && !regStatus.staff_registration.is_open));
    
    // Don't show if closed (they see the big message) or if successful
    if (isRegistrationClosed || status === 'success') return;
  }, [fetchingRegStatus, regStatus, userType, status]);

  // Helper to infer Inbox URL from email domain
  const getInboxUrl = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();

    const providers: Record<string, string> = {
      'gmail.com': 'https://mail.google.com',
      'outlook.com': 'https://outlook.live.com',
      'hotmail.com': 'https://outlook.live.com',
      'live.com': 'https://outlook.live.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'icloud.com': 'https://www.icloud.com',
    };

    return providers[domain] || 'mailto:';
  };

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

  const handleGoToMail = () => {
    const currentUserEmail = userType === 'candidate' ? candidateData.email : volunteerData.email;
    const url = getInboxUrl(currentUserEmail);
    
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noreferrer');
    } else {
      window.location.href = url;
    }
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

    const baseApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    try {
      // FormData: Native browser API for constructing multipart/form-data requests.
      // Essential for file uploads.
      const formData = new FormData();
      formData.append('user_type', userType);
      
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (documentFile) {
        formData.append('document', documentFile);
      }

      // Fetch API: Native JavaScript function for making network requests.
      const response = await fetch(`${baseApiUrl}/v2/register/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Acknowledged');
        // Reset forms
        setCandidateData(initialCandidateData);
        setVolunteerData(initialVolunteerData);
        setDocumentFile(null);
        /*
        setCapturedImage(null);
        setCapturedPreview(null);
        */
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        const errorData = await response.json();
        setStatus('error');
        setMessage(extractErrorMessage(errorData));
      }
    } catch (error) {
      setStatus('error');
      setMessage(handleNetworkError(error));
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  // Subtle path-specific theme configuration
  const theme = {
    isVolunteer: userType === 'volunteer',
    cardBg: userType === 'volunteer' ? 'bg-cyan-50/30' : 'bg-white',
    accentColor: userType === 'volunteer' ? 'brand-cyan' : 'brand-blue', 
    accentText: userType === 'volunteer' ? 'text-brand-cyan' : 'text-brand-blue',
    toggleActive: userType === 'volunteer' ? 'bg-blue-50/50 text-brand-blue shadow-sm' : 'bg-white text-brand-blue shadow-sm',
    fileBtn: userType === 'volunteer' 
      ? 'file:bg-blue-50/50 file:text-brand-blue hover:file:bg-blue-100/50' 
      : 'file:bg-brand-accent file:text-brand-blue hover:file:bg-blue-200',
    consentBg: userType === 'volunteer' ? 'bg-blue-50/20' : 'bg-blue-50',
    submitShadow: userType === 'volunteer' ? 'shadow-blue-100/50' : 'shadow-blue-200',
    spinnerColor: 'text-brand-blue', 
  };

  // Success state - Enhanced with email button
  if (status === 'success') {
    const currentUserEmail = userType === 'candidate' ? candidateData.email : volunteerData.email;
    const isGmail = currentUserEmail.toLowerCase().includes('gmail.com');

    return (
      <div className="py-20 bg-gray-50 min-h-screen animate-fade-in">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            <p className="text-lg text-gray-600 mb-8">{message}</p>
            <div className="space-y-4">
              <Button onClick={handleGoToMail} variant="primary" className="w-full">
                Go to {isGmail ? 'Gmail' : 'Email'} App
              </Button>
              <Link to="/" className="block text-blue-600 hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        <div className={`border border-gray-200 rounded-3xl p-8 shadow-sm transition-colors duration-500 ${theme.cardBg}`}>
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 text-green-600  shadow rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Successful</h2>
                <p className="text-lg text-gray-500 italic mb-8">Please check your email for your portal login credentials.</p>
              </div>
              <Button 
                onClick={() => window.open(import.meta.env.VITE_PORTAL_URL, '_blank', 'noopener,noreferrer')} 
                variant="primary"
              >
                Go to Portal
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
              <div className={`mt-8 p-6 ${theme.consentBg} border-blue-100 rounded-2xl border max-w-lg mx-auto`}>
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

              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  {message}
                </div>
              )}

              <Button type="submit" variant="primary" disabled={status === 'loading'} className="w-full">
                {status === 'loading' ? 'Registering...' : 'Register'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;