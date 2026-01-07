import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Link, useSearchParams } from 'react-router-dom';

type UserType = 'candidate' | 'volunteer';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as UserType) === 'volunteer' ? 'volunteer' : 'candidate';
  const [userType, setUserType] = useState<UserType>(initialType);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    phone_number: '',
    school_name: '',
    school_type: 'public',
    current_class: 'SS1',
    state: 'Lagos',
    document_type: 'NIN',
    consent: false,
  };

  const initialVolunteerData = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    occupation: '',
    state: '',
    document_type: 'NIN',
    consent: false,
  };

  const [candidateData, setCandidateData] = useState(initialCandidateData);
  const [volunteerData, setVolunteerData] = useState(initialVolunteerData);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const userData = userType === 'candidate' ? candidateData : volunteerData;

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+234\d{10}$/;

    if (!emailRegex.test(userData.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(userData.phone_number)) {
      setStatus('error');
      setMessage('Please enter a valid phone number (+234xxxxxxxxxx).');
      return;
    }

    const apiKey = import.meta.env.VITE_API_KEY;
    const baseApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    try {
      const formData = new FormData();
      formData.append('user_type', userType);
      
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      if (documentFile) {
        formData.append('document', documentFile);
      }

      const response = await fetch(`${baseApiUrl}/v2/register/`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setMessage(`Registration successful as a ${userType}.\nWe sent you an email.`);
        // Reset forms
        setCandidateData(initialCandidateData);
        setVolunteerData(initialVolunteerData);
        setDocumentFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus('error');
      setMessage("Something's off. Please check your internet");
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="py-20 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
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
                    <label htmlFor="phone_number" className={labelClasses}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      required
                      value={userType === 'candidate' ? candidateData.phone_number : volunteerData.phone_number}
                      onChange={userType === 'candidate' ? handleCandidateChange : handleVolunteerChange}
                      className={inputClasses}
                      placeholder="+234..."
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
                        <label htmlFor="document_type" className={labelClasses}>Document Type</label>
                        <select
                          id="document_type"
                          name="document_type"
                          value={candidateData.document_type}
                          onChange={handleCandidateChange}
                          className={inputClasses}
                        >
                          <option value="NIN">NIN</option>
                          <option value="school result">School Result</option>
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
                        <label htmlFor="document_type" className={labelClasses}>Document Type</label>
                        <select
                          id="document_type"
                          name="document_type"
                          value={volunteerData.document_type}
                          onChange={handleVolunteerChange}
                          className={inputClasses}
                        >
                          <option value="NIN">NIN</option>
                          <option value="passport">Passport</option>
                          <option value="drivers license">Drivers' License</option>
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
                <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-2xl">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={userType === 'candidate' ? candidateData.consent : volunteerData.consent}
                    onChange={userType === 'candidate' ? handleCandidateChange : handleVolunteerChange}
                    className="w-5 h-5 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                  />
                  <label htmlFor="consent" className="text-sm font-medium text-brand-blue">
                    By selecting "Register", you're confirming that you have read and agreed to Verboheit MLC's <Link to="/terms-and-conditions" target="_blank" className="underline hover:text-blue-800">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank" className="underline hover:text-blue-800">Privacy Policy</Link>.
                  </label>
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
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
