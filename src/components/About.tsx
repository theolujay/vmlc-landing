import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* Left Side: Single Tilted Card Image */}
          <div className="w-full lg:w-1/2 relative flex flex-col items-center gap-4">
            <div className="relative w-full max-w-sm aspect-[3/4] transform -rotate-3 transition-transform hover:rotate-0 duration-500 ease-out">
              {/* The Card Container */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border-8 border-white overflow-hidden">
                <img
                  src="/assets/tosin.png"
                  alt="Tosin Ojo, Founder"
                  className="w-full h-full object-cover"
                />
                {/* Overlay to hint at it being a collage or photo */}
                <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none"></div>
              </div>

              {/* Decorative background blob */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/80 rounded-full blur-3xl"></div>
            </div>
            <br></br>

            {/* Caption Block */}
            <a
              href="https://www.linkedin.com/in/oluwatosin-ojo-cfa-13a93929/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-sm bg-white px-6 py-3 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:border-brand-blue transition-all"
            >
              <div className="w-full max-w-sm bg-white px-6 py-3 rounded-lg shadow-lg border border-gray-200">
                <div className="text-center font-[Segoe_UI,sans-serif] space-y-0.5">
                  <p className="text-gray-800 font-bold text-base">Tosin Ojo,</p>
                  <p className="text-gray-700 font-medium text-sm">
                    Founder, Verboheit Mathematics League Competition
                  </p>
                </div>
              </div>
            </a>
          </div>
          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block w-[229px] h-[44px] px-6 py-3 bg-brand-accent rounded-[100px] text-center text-brand-blue text-xs font-bold tracking-wide uppercase mb-6">
                <span style={{ fontFamily: 'Helvetica, sans-serif' }}>About the competition</span>
            </div>
            <h2
              className="font-black text-[38px] leading-[48px] tracking-[-0.02em] text-gray-900 mb-6"
              style={{ fontFamily: 'Segoe UI, sans-serif' }}
            >
              Verboheit Mathematics League Competition for <br className="hidden md:block" />{' '}
              <span className="text-brand-blue">Senior Secondary Students</span>
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Verboheit Mathematics League Competition is a mathematics competition for secondary
                school students, in senior secondary schools. Verboheit's mathematics league
                competition is inspired by our founder's background. She completed her secondary
                school education at a Jakande school in Lagos State, twenty four years ago.
              </p>
              <p>
                Her experience as a successful investment professional has shown that the
                foundational skills in mathematics, developed at the secondary school level is very
                critical to success in many areas of life in later years, especially in business,
                entrepreneurship and finance.
              </p>
              <p>
                Through this competition, she aims to reignite the desire for hard-work,
                perseverance and thoroughness, values which have been significantly eroded in recent
                years, in the young minds of school students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;