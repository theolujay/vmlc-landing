import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    // 'relative' creates a positioning context for children with 'absolute'.
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* 
         Background Layer:
         'absolute inset-0' stretches this div to fill the entire parent <section>.
         'z-0' places it behind other content.
      */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero.png"
          alt="Past winners"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Gradient Overlay: Adds a dark fade to make text more readable over the image. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/0 mix-blend-multiply"></div>
      </div>

      {/* 
         Content Layer:
         'relative z-10' places this ON TOP of the background layer.
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 text-white">
        <div className="max-w-3xl">
          {/* Responsive Typography: 'text-[56px]' is a custom size. */}
          <h1 className="font-serif font-bold text-[56px] leading-[68px] tracking-[-0.02em] mb-6">
            Showcase your math skills <br />
            for a chance to win <br />
            amazing prizes
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl">
            Join the annual Verboheit Mathematics League Competition for a chance to win big!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              to="/register"
              variant="primary"
            >
              Register as a candidate
            </Button>
            <Button to="/register?type=volunteer" variant="outline">
              Become a volunteer
            </Button>
          </div>

          {/* Divider with OR */}
          <div className="flex items-center gap-1 mb-6 max-w-md">
            <div className="flex-1 h-[1px] bg-gray-400"></div>
            <span className="text-gray-300 text-md font-normal px-2">Or</span>
            <div className="flex-1 h-[1px] bg-gray-400"></div>
          </div>

          <div className="text-sm text-gray-300">
            <Link
              to="/support-us"
              className="font-semibold text-white hover:underline decoration-10 underline-offset-4"
            >
              Support Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;