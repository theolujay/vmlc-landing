import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="text-center mb-12 border-b border-gray-100 pb-12">
            <h1 className="font-black text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
              Privacy <span className="text-brand-blue">Policy</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Effective Date: 1st of December, 2025
            </p>
          </div>

          <div className="prose prose-blue max-w-none space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">1</span>
                What We Collect
              </h2>
              <p className="mb-4">When you use this platform, we may collect:</p>
              <ul className="list-disc pl-12 space-y-2">
                <li><span className="font-bold text-gray-800">Personal details:</span> Name, email, school, phone number, ID card, facial scan, school result for candidates, utility bill for staff.</li>
                <li><span className="font-bold text-gray-800">Competition-related data:</span> Registration info, exam performance.</li>
                <li><span className="font-bold text-gray-800">Technical data:</span> IP address, device type, browser.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">2</span>
                Why We Collect It
              </h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-12 space-y-2">
                <li>Register and verify your account and identity.</li>
                <li>Manage your participation in the competition.</li>
                <li>Communicate updates and results.</li>
                <li>Improve the platform experience.</li>
                <li>(If you agree) share updates or educational content about future events.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">3</span>
                How We Protect Your Data
              </h2>
              <p>
                We use reasonable technical and organizational measures to protect your data from loss, misuse, or
                unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">4</span>
                Who We Share Data With
              </h2>
              <p>
                We only share data with trusted partners who help us operate the competition—such as email or
                hosting providers. <span className="font-bold text-gray-900">We never sell your information.</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">5</span>
                How Long We Keep Your Data
              </h2>
              <p>
                Your data is kept only for as long as necessary to run the competition and meet legal obligations.
                Afterward, it may be securely deleted or anonymized.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-brand-blue text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-sm mr-3">6</span>
                Your Rights
              </h2>
              <p>
                You can request to access, update, or delete your personal data anytime by contacting{' '}
                <a href="mailto:verboheit@gmail.com" className="text-brand-blue font-bold underline">verboheitconsulting@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
