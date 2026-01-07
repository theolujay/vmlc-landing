import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const email = import.meta.env.VITE_EMAIL || '';
  const phone = import.meta.env.VITE_PHONE || '';
  const cleanPhone = phone.replace(/-/g, '');

  return (
    <footer id="footer" className="bg-black text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
          {/* Main Content (Span 2 columns on desktop) */}
          <div className="md:col-span-2 space-y-6">
            {/* Row 1: Heading and FAQs nudge */}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h2 className="text-3xl font-bold">
                Want to learn more?
              </h2>
              <Link
                to="/faqs"
                className="text-md text-gray-400 hover:text-white transition-colors"
              >
                Check our FAQs
              </Link>
            </div>

            {/* Row 2: Contact Info (Side-by-side) */}
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              <a
                href={`https://wa.me/${cleanPhone}`}
                className="text-lg hover:text-gray-300 transition-colors"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="text-lg hover:text-gray-300 transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Social Links (Right-aligned on desktop) */}
          <div className="flex gap-3 md:justify-end">
            <a
              href="https://www.linkedin.com/company/verboheit/"
              className="bg-[#0A66C2] p-2.5 rounded hover:bg-[#004182] transition-colors inline-flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-white" />
            </a>
            <a
              href="https://www.instagram.com/verboheit_maths_competition/"
              className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-2.5 rounded hover:opacity-90 transition-opacity inline-flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram size={20} className="text-white" />
            </a>
            <a 
              href="https://www.facebook.com/p/Verboheit-Mathematics-League-Competition-61567079554764/" 
              className="bg-[#1877F2] p-2.5 rounded hover:bg-[#0C63D4] transition-colors inline-flex items-center justify-center"
              aria-label="Facebook"
            >
              <Facebook size={20} className="text-white" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-sm text-gray-500">
          <p>&copy; Verboheit Consulting. All Rights Reserved {new Date().getFullYear()}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
