import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  href,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-full font-large transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-blue-800 focus:ring-brand-blue',
    outline: 'border-2 border-white text-white hover:bg-white/10 focus:ring-white',
    white: 'bg-white text-brand-blue hover:bg-gray-100 focus:ring-white',
    ghost: 'text-brand-blue hover:bg-blue-50 focus:ring-brand-blue', // Used for footer or text links mainly
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
