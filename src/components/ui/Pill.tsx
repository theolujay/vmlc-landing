import React from 'react';
import { PillProps } from '../../types';
import { Check } from 'lucide-react';

const Pill: React.FC<PillProps> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center bg-brand-accent rounded-full px-5 py-3 mb-3 w-fit shadow-sm ${className}`}>
      <div className="mr-3 text-gray-800">
        <Check size={16} strokeWidth={3} />
      </div>
      <span className="text-gray-900 font-medium text-sm md:text-base">{text}</span>
    </div>
  );
};

export default Pill;