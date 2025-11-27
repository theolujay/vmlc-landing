import React from 'react';

const TeacherAward: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Image */}
          <div className="w-full md:w-5/12">
            <div className="relative transform md:-rotate-3 max-w-sm mx-auto">
               <div className="absolute inset-0 bg-brand-blue/10 transform translate-x-3 translate-y-3 rounded-xl"></div>
               <img 
                 src="../public/assets/vmlc_kaji.svg" 
                 alt="Student and Teacher at a VMLC ceremony" 
                 className="relative z-10 rounded-xl shadow-xl w-full"
               />
            </div>
          </div>

          {/* Right Text */}
          <div className="w-full md:w-7/12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Kaji Mathematics Teacher <br />
              Award
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              This award seeks to reward an outstanding mathematics teacher based on nomination by their students and a satisfactory screening/verification of the performance of the students taught by the teacher in an external exam. Please, click the link below to nominate a teacher.
            </p>
            <a href="#" className="inline-block text-brand-blue font-bold text-lg hover:underline decoration-2 underline-offset-4">
              Nominate Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeacherAward;