import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const portalUrl = import.meta.env.VITE_PORTAL_URL;
  const email = import.meta.env.VITE_EMAIL;
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-8 items-center">
            <Link to="/#about" className="text-gray-900 hover:text-brand-blue font-medium text-sm xl:text-base">
              About
            </Link>
            <Link to="/#stages" className="text-gray-900 hover:text-brand-blue font-medium text-sm xl:text-base">
              Stages
            </Link>
            <Link to="/faqs" className="text-gray-900 hover:text-brand-blue font-medium text-sm xl:text-base">
              FAQs
            </Link>
            <Link to="/pre-register" className="text-gray-900 hover:text-brand-blue font-medium text-sm xl:text-base">
              Pre-register
            </Link>
            <Link to="/#footer" className="text-gray-900 hover:text-brand-blue font-medium text-sm xl:text-base">
              Contact us
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
            <a href={`mailto:${email}`} className="text-brand-blue font-bold text-sm xl:text-base hover:underline">
              Become a sponsor
            </a>
            <Button to="/register" variant="primary" className="px-4 py-2 text-sm xl:px-6 xl:py-2.5 xl:text-base font-bold">
              Register
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-brand-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
          <Link
            to="/#about"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
          >
            About the competition
          </Link>
          <Link
            to="/#stages"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
          >
            Competition stages
          </Link>
          <Link
            to="/faqs"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
          >
            FAQs
          </Link>
          <Link
            to="/pre-register"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
          >
            Pre-register
          </Link>
          <Link
            to="/#footer"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50"
          >
            Contact us
          </Link>
          <div className="mt-4 w-full flex flex-col gap-3 px-3">
            <Button
              href={`mailto:${email}`}
              variant="ghost"
              fullWidth
              className="justify-center border border-brand-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a sponsor
            </Button>
            <Button
              to="/register"
              variant="primary"
              fullWidth
              className="justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
