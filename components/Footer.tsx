import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold mb-8">Want to learn <br /> more?</h2>
            <div className="space-y-4">
              <p className="text-xl">08060837331</p>
              <a href="mailto:verboheitconsulting@gmail.com" className="text-xl hover:text-gray-300 transition-colors block">
                verboheitconsulting@gmail.com
              </a>
            </div>
          </div>

          {/* Address & Social */}
          <div className="flex flex-col justify-end items-start md:items-end">
            <address className="not-italic text-lg text-gray-300 mb-6 text-left md:text-right">
              47 Castle and Temple Drive,<br />
              Lekki Phase 1
            </address>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-sm hover:bg-blue-500 transition-colors">
                <Linkedin size={20} className="text-white" />
              </a>
              <a href="#" className="bg-sky-500 p-2 rounded-sm hover:bg-sky-400 transition-colors">
                <Twitter size={20} className="text-white" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
          <p>&copy; Verboheit Consulting. All Rights Reserved 2023.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;