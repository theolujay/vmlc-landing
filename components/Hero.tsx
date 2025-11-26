import React from 'react';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Students learning" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue/40 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Showcase your math skills <br />
            for a chance to win <br />
            amazing prizes
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl">
            Join the annual Verboheit Mathematics League Competition for a chance to win big!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button href="#" variant="primary" className="bg-brand-blue border border-white/20 shadow-lg hover:bg-brand-blue/90">
              Register as a candidate
            </Button>
            <Button href="#" variant="outline">
              Become a volunteer
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="uppercase tracking-widest text-xs font-semibold">Or</span>
            <a href="#" className="font-semibold text-white hover:underline decoration-2 underline-offset-4">
              Become a sponsor
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements from PDF (faint checks/shapes) - Simplified as css gradient above */}
    </section>
  );
};

export default Hero;