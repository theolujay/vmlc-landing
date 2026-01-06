import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { PreRegisterData } from '../types';

const PreRegister: React.FC = () => {
  const [formData, setFormData] = useState<PreRegisterData>({
    full_name: '',
    email: '',
    phone_number: '',
    user_type: 'candidate',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const apiKey = import.meta.env.VITE_PRE_REGISTER_API_KEY;
      const response = await fetch('/pre-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for pre-registering!');
        setFormData({
          full_name: '',
          email: '',
          phone_number: '',
          user_type: 'candidate',
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to the server. Please check your internet connection.');
    }
  };

  return (
    <div className="py-20 bg-white min-h-[60vh] animate-fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* <div className="inline-block px-1 py-1 bg-brand-accent rounded-full text-brand-blue text-sm font-bold tracking-wide uppercase mb-4">
            <span style={{ fontFamily: 'Helvetica, sans-serif' }}>Get Involved</span>
          </div> */}
          <h1
            className="font-black text-4xl md:text-5xl text-gray-900 mb-6"
            style={{ fontFamily: 'Segoe UI, sans-serif' }}
          >
            Pre-register <span className="text-brand-blue">Now</span>
          </h1>
          <p className="text-xl text-gray-600">
            Recieve updates about registering for the Verboheit Mathematics League Competition.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <Button onClick={() => setStatus('idle')} variant="primary">
                Register Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="jane.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="+2348012345678"
                />
              </div>

              <div>
                <label htmlFor="user_type" className="block text-sm font-semibold text-gray-700 mb-2">
                  I want to be involved as a
                </label>
                <select
                  id="user_type"
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="candidate">Candidate</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={status === 'loading'}
                className={status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
              >
                {status === 'loading' ? 'Submitting...' : 'Pre-register Now'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreRegister;
