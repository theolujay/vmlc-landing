import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-brand-accent rounded-full text-brand-blue text-sm font-bold tracking-wide uppercase mb-4">
            <span style={{ fontFamily: 'Helvetica, sans-serif' }}>Privacy</span>
          </div>
          <h1
            className="font-black text-4xl md:text-5xl text-gray-900 mb-6"
            style={{ fontFamily: 'Segoe UI, sans-serif' }}
          >
            Privacy <span className="text-brand-blue">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Effective Date: 1st of December, 2025
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">1</span>
              What We Collect
            </h2>
            <p className="mb-4 text-gray-600 leading-relaxed">When you use this platform, we may collect:</p>
            <ul className="list-disc pl-12 space-y-2 text-gray-600 leading-relaxed">
              <li><span className="font-bold text-gray-800">Personal details:</span> Name, email, school, phone number, ID card, facial scan, school result for candidates, utility bill for staff.</li>
              <li><span className="font-bold text-gray-800">Competition-related data:</span> Registration info, exam performance.</li>
              <li><span className="font-bold text-gray-800">Technical data:</span> IP address, device type, browser.</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">2</span>
              Why We Collect It
            </h2>
            <p className="mb-4 text-gray-600 leading-relaxed">We use your information to:</p>
            <ul className="list-disc pl-12 space-y-2 text-gray-600 leading-relaxed">
              <li>Register and verify your account and identity.</li>
              <li>Manage your participation in the competition.</li>
              <li>Communicate updates and results.</li>
              <li>Improve the platform experience.</li>
              <li>(If you agree) share updates or educational content about future events.</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">3</span>
              How We Protect Your Data
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use reasonable technical and organizational measures to protect your data from loss, misuse, or
              unauthorized access.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">4</span>
              Who We Share Data With
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We only share data with trusted partners who help us operate the competition—such as email or
              hosting providers. <span className="font-bold text-gray-900">We never sell your information.</span>
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">5</span>
              How Long We Keep Your Data
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your data is kept only for as long as necessary to run the competition and meet legal obligations.
              Afterward, it may be securely deleted or anonymized.
            </p>
          </section>

          <section className="bg-brand-accent border border-brand-blue/10 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">6</span>
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You can request to access, update, or delete your personal data anytime by contacting{' '}
              <a href="mailto:verboheit@gmail.com" className="text-brand-blue font-bold underline hover:opacity-80 transition-opacity">verboheitconsulting@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;