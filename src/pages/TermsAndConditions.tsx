import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-brand-accent rounded-full text-brand-blue text-sm font-bold tracking-wide uppercase mb-4">
            <span style={{ fontFamily: 'Helvetica, sans-serif' }}>Legal</span>
          </div>
          <h1
            className="font-black text-4xl md:text-5xl text-gray-900 mb-6"
            style={{ fontFamily: 'Segoe UI, sans-serif' }}
          >
            Terms & <span className="text-brand-blue">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Effective Date: 1st of December, 2025
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">1</span>
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By creating an account or using this platform, you agree to follow these terms and any updates we
              make to them.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">2</span>
              Who Can Use This Platform
            </h2>
            <ul className="list-disc pl-12 space-y-2 text-gray-600 leading-relaxed">
              <li><span className="font-bold text-gray-800">Candidates:</span> Students officially registering for the Verboheit Mathematics League Competition.</li>
              <li><span className="font-bold text-gray-800">Staff:</span> Approved volunteers or administrators helping to organize and manage the competition.</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">3</span>
              Your Responsibilities
            </h2>
            <p className="mb-4 text-gray-600 leading-relaxed">You agree to:</p>
            <ul className="list-disc pl-12 space-y-2 text-gray-600 leading-relaxed">
              <li>Provide accurate, up-to-date information.</li>
              <li>Keep your login details secure.</li>
              <li>Use the portal only for competition-related purposes.</li>
              <li>Avoid cheating, impersonation, or any unauthorized access.</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">4</span>
              Competition Rules
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All participants must follow the official competition guidelines. Any violation (e.g., cheating,
              falsifying details, or sharing restricted content) may lead to disqualification or suspension.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">5</span>
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All Verboheit content—including text, graphics, and branding—belongs to the organizers. You may
              not copy, modify, or distribute materials without written permission.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">6</span>
              Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We work hard to keep the portal reliable, but we can’t guarantee uninterrupted access. Verboheit is not
              responsible for data loss, connection issues, or any damages arising from use of the platform.
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">7</span>
              Changes to These Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these terms occasionally. If that happens, we’ll post a notice on the site or email you.
            </p>
          </section>

          <section className="bg-brand-accent border border-brand-blue/10 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">8</span>
              Contact
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Questions? Contact <a href="mailto:verboheitconsulting@gmail.com" className="text-brand-blue font-bold underline hover:opacity-80 transition-opacity">verboheitconsulting@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;