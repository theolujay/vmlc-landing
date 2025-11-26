import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Collage Image Placeholder */}
          <div className="w-full lg:w-1/2 relative">
             <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
                 {/* Simulate the scattered photo look */}
                 <div className="absolute top-4 left-4 w-5/6 h-5/6 bg-gray-100 rounded-lg shadow-xl transform -rotate-3 z-10 overflow-hidden border-4 border-white">
                    <img src="https://picsum.photos/600/800?random=1" alt="Student with check" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute bottom-4 right-4 w-3/4 h-3/4 bg-gray-100 rounded-lg shadow-lg transform rotate-6 z-20 overflow-hidden border-4 border-white">
                     <img src="https://picsum.photos/500/600?random=2" alt="Award ceremony" className="w-full h-full object-cover" />
                 </div>
                 {/* Decorative background circle */}
                 <div className="absolute -z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-50 rounded-full blur-3xl opacity-50"></div>
             </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-1 bg-blue-100 rounded-full text-brand-blue text-xs font-bold tracking-wide uppercase mb-6">
              About the competition
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Verboheit Mathematics League <br className="hidden md:block"/>
              Competition for <span className="text-brand-blue">Senior <br className="hidden md:block"/>
              Secondary Students</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Verboheit Mathematics League Competition is a mathematics competition for secondary school students, in senior secondary schools. Verboheit's mathematics league competition is inspired by our founder's background. She completed her secondary school education at a Jakande school in Lagos State, twenty four years ago.
              </p>
              <p>
                Her experience as a successful investment professional has shown that the foundational skills in mathematics, developed at the secondary school level is very critical to success in many areas of life in later years, especially in business, entrepreneurship and finance.
              </p>
              <p>
                Through this competition, she aims to reignite the desire for hard-work, perseverance and thoroughness, values which have been significantly eroded in recent years, in the young minds of school students.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;