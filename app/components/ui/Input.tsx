'use client';

import { forwardRef } from 'react';
import { Search } from 'lucide-react';

interface InputProps {
  title?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  minWidth?: string;
  maxWidth?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  name?: string;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  title,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  disabled = false,
  required = false,
  error,
  success = false,
  icon,
  iconPosition = 'left',
  minWidth,
  maxWidth,
  autoFocus = false,
  autoComplete,
  name,
  id
}, ref) => {
  const baseClasses = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-900 placeholder-gray-500 bg-white shadow-sm";
  
  const stateClasses = error 
    ? "border-red-300 focus:ring-red-200 focus:border-red-400" 
    : success 
    ? "border-green-300 focus:ring-green-200 focus:border-green-400" 
    : "border-gray-200 focus:ring-blue-200 focus:border-blue-400 hover:border-blue-400 hover:shadow-md";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-text";

  const iconClasses = icon 
    ? iconPosition === 'left' 
      ? "pl-10" 
      : "pr-10" 
    : "";

  const inputClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${iconClasses} ${className}`;

  return (
    <div className="relative" style={{ minWidth, maxWidth }}>
      {title && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          className={inputClasses}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 