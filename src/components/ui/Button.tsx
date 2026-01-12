import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from '../../types';

// React.FC<ButtonProps> explicitly types this function as a React Functional Component accepting ButtonProps.
// We destructure the props in the arguments list for easier access (e.g., extracting 'children' from 'props.children').
const Button: React.FC<ButtonProps> = ({
  children, // 'children' is a special prop that contains whatever is passed between the opening and closing tags of the component.
  variant = 'primary', // Default value
  fullWidth = false,
  className = '',
  href,
  to,
  ...props // '...props' gathers all remaining properties into a 'props' object (Rest operator), similar to **kwargs in Python.
}) => {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-full font-large transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Object mapping for variants (cleaner than multiple if/else statements)
  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-blue-800 focus:ring-brand-blue',
    outline: 'border-2 border-white text-white hover:bg-white/10 focus:ring-white',
    white: 'bg-white text-brand-blue hover:bg-gray-100 focus:ring-white',
    ghost: 'text-brand-blue hover:bg-blue-50 focus:ring-brand-blue', // Used for footer or text links mainly
  };

  // Template literal used to construct the final class string
  const combinedClassName = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  // Polymorphic rendering: The component decides what HTML tag to render based on props.
  
  // 1. If 'to' is present, it's an internal link (Client-side routing)
  if (to) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // We spread '...props' to pass down any extra attributes (like onClick, id, etc.) to the underlying element.
      <Link to={to} className={combinedClassName} {...(props as any)}>
        {children}
      </Link>
    );
  }

  // 2. If 'href' is present, it's an external link (Standard <a> tag)
  if (href) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <a href={href} className={combinedClassName} {...(props as any)}>
        {children}
      </a>
    );
  }

  // 3. Default: Render a standard button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
