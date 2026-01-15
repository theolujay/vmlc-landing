import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { validateEmail, validatePhone } from '../utils/validation';
import { extractErrorMessage, handleNetworkError } from '../utils/api';

type SupportType = 'sponsorship' | 'partnership' | 'media_publicity' | 'other';

interface SupportFormData {
  full_name: string;
  email: string;
  organization?: string;
  support_type: SupportType;
  phone?: string;
  message: string;
  consent: boolean;
}

const SupportUs: React.FC = () => {
  const [formData, setFormData] = useState<SupportFormData>({
    full_name: '',
    email: '',
    organization: '',
    support_type: 'sponsorship',
    phone: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Validation
    if (!validateEmail(formData.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setStatus('error');
      setMessage('Please enter a valid phone number (091-XXXX-XXXX).');
      return;
    }

    // const apiKey = import.meta.env.VITE_API_KEY;
    const baseApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    try {
      const response = await fetch(`${baseApiUrl}/v2/support-us/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'x-api-key': apiKey,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for your support inquiry! Our team will reach out to you shortly. A confirmation email has been sent to your inbox.');
        setFormData({
          full_name: '',
          email: '',
          organization: '',
          support_type: 'sponsorship',
          phone: '',
          message: '',
          consent: false,
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(extractErrorMessage(errorData));
      }
    } catch {
      setStatus('error');
      setMessage(handleNetworkError());
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="py-20 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-2 py-1 bg-brand-accent rounded-full text-brand-blue text-sm font-bold tracking-wide uppercase mb-4">
            <span style={{ fontFamily: 'Helvetica, sans-serif' }}>You count</span>
          </div>
          <h1 className="font-black text-4xl md:text-5xl text-gray-900 mb-6" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            Support <span className="text-brand-blue">Verboheit</span>
          </h1>
          <p className="text-xl text-gray-600">
            Join us in empowering disciplined learning through competitive mathematics.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
              <p className="text-lg text-gray-600 mb-8">{message}</p>
              <Button onClick={() => setStatus('idle')} variant="primary">
                Send another inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full_name" className={labelClasses}>Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organization" className={labelClasses}>Organization (Optional)</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Your Company or School"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClasses}>Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="091-XXXX-XXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="support_type" className={labelClasses}>Support Type</label>
                <select
                  id="support_type"
                  name="support_type"
                  value={formData.support_type}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="sponsorship">Sponsorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="media">Media/Publicity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClasses}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="How would you like to support us?"
                ></textarea>
              </div>

              <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-2xl">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="w-5 h-5 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                />
                <label htmlFor="consent" className="text-sm font-medium text-brand-blue">
                  I consent to be contacted by the Verboheit team regarding my support inquiry.
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
                disabled={status === 'loading' || !formData.consent}
                className={status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'py-4 shadow-lg shadow-blue-200'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
