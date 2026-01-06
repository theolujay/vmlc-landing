import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const email = import.meta.env.VITE_EMAIL || '';
  const phone = import.meta.env.VITE_PHONE || '';
  const cleanPhone = phone.replace(/-/g, '');
  return (
    <footer id="footer" className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Want to learn <br /> more?
            </h2>
            <div className="space-y-4">
              <a
                href={`https://wa.me/${cleanPhone}`}
                className="text-xl hover:text-gray-300 transition-colors block underline decoration-gray-600 hover:decoration-gray-300 underline-offset-4"
              >
                <p className="text-xl">{phone}</p>
              </a>
              <a
                href={`mailto:${email}`}
                className="text-xl hover:text-gray-300 transition-colors block underline decoration-gray-600 hover:decoration-gray-300 underline-offset-4"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Address & Social */}
          <div className="flex flex-col justify-end items-start md:items-end">
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/verboheit/"
                className="bg-[#0A66C2] p-2 rounded-sm hover:bg-[#004182] transition-colors"
              >
                <Linkedin size={20} className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/verboheit_maths_competition/"
                className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-2 rounded-sm hover:opacity-90 transition-opacity"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/p/Verboheit-Mathematics-League-Competition-61567079554764/"
                className="bg-[#1877F2] p-2 rounded-sm hover:bg-[#0C63D4] transition-colors"
              >
                <Facebook size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
          <p>&copy; Verboheit Consulting. All Rights Reserved {new Date().getFullYear()}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
