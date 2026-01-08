import React from 'react';
import Button from './ui/Button';

const Partners: React.FC = () => {
  const portalUrl = import.meta.env.VITE_PORTAL_URL
  const email = import.meta.env.VITE_EMAIL
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12">Partner with us</h2>

        {/* Wide Banner Image */}
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-16 shadow-lg">
          <img
            src="/assets/partner_collage.svg"
            alt="Collage of candidates, volunteers, and the founder"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Two Columns Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Become a Sponsor */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a Sponsor</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We believe in the power of partnerships to transform education. By sponsoring our
              Senior Secondary School Maths Competition, you have the opportunity to contribute to
              the future of young minds in Nigeria. Your support will not only showcase your
              commitment to education and community development but also shape the next generation
              of leaders and problem solvers.
            </p>
            <Button
              to="/support-us"
              variant="primary"
              className="bg-brand-blue text-white"
            >
              Become a Sponsor
            </Button>
          </div>

          {/* Become a Volunteer */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a Volunteer</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Are you an enthusiastic undergraduate looking to enhance your skills beyond the
              classroom? Are you eager to develop your project management capabilities and make a
              meaningful difference in the lives of school students in Nigeria?
            </p>
            <Button
              to="/register?type=volunteer"
              variant="primary"
              className="bg-brand-blue text-white"
            >
              Volunteer now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
