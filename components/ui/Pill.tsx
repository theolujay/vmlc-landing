import React from 'react';
import { PillProps } from '../../types';
import { Check } from 'lucide-react';

const Pill: React.FC<PillProps> = ({ text }) => {
  return (
    <div className="flex items-center bg-indigo-100/80 rounded-full px-5 py-3 mb-3 w-fit shadow-sm">
      <div className="mr-3 text-brand-blue">
        <Check size={18} strokeWidth={3} />
      </div>
      <span className="text-gray-800 font-medium text-sm md:text-base">{text}</span>
    </div>
  );
};

export default Pill;