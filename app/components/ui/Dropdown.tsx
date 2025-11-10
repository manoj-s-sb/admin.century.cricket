'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  title?: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  minWidth?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
  classname?: string;
}

export default function Dropdown({
  title,
  placeholder,
  options,
  value,
  onChange,
  className = '',
  disabled = false,
  minWidth = '140px',
  showAllOption = true,
  allOptionLabel = 'All',
  classname = 'text-[15px]'
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const displayValue = value === 'All' ? placeholder : value;
  const isAllSelected = value === 'All';

  return (
    <div className={`relative ${className}`} style={{ minWidth }} ref={dropdownRef}>
      {title && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {title}
        </label>
      )}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center w-full gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-base shadow-sm hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span className={`flex-1 text-left truncate ${
          isAllSelected ? 'text-gray-500 font-normal' : 'text-gray-900 font-medium'
        } ${classname}`}>
          {displayValue}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          {showAllOption && (
            <button
              onClick={() => handleOptionClick('All')}
              className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-blue-50 transition-colors rounded ${
                value === 'All' ? 'bg-blue-50 text-gray-900 font-medium' : 'text-gray-500 font-normal'
              }`}
            >
              <span className="truncate">{allOptionLabel}</span>
            </button>
          )}
          
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-blue-50 transition-colors rounded ${
                value === option.value ? 'bg-blue-50 text-gray-900 font-medium' : 'text-gray-500 font-normal'
              }`}
            >
              <span className="truncate">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 