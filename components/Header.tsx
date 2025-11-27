import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import Logo from '../public/assets/Logo'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/">
              <Logo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#about" className="text-gray-900 hover:text-brand-blue font-medium text-md">About the competition</a>
            <a href="#stages" className="text-gray-900 hover:text-brand-blue font-medium text-md">Competition stages</a>
            <a href="#footer" className="text-gray-900 hover:text-brand-blue font-medium text-md">Contact us</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-brand-blue font-bold text-md hover:underline">Become a sponsor</a>
            <Button href="#" variant="primary" className="px-6 py-2.5 font-bold text-md">Register</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50">About the competition</a>
            <a href="#stages" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50">Competition stages</a>
            <a href="#footer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50">Contact us</a>
            <div className="mt-4 w-full flex flex-col gap-3 px-3">
                <Button href="mailto:verboheitmlc@gmail.com" variant="ghost" fullWidth className="justify-center border border-brand-blue">Become a sponsor</Button>
                <Button href="https://portal.verboheit.org/register" variant="primary" fullWidth className="justify-center">Register</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;