"use client";

import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  nested?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  className = '',
  nested = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`w-full my-2 ${className}`}>
      <button
        className={`
          w-full transition-all duration-300
          ${nested 
            ? 'h-8 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 text-gray-800 text-sm px-4 text-left' 
            : 'h-9 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 hover:from-blue-500 hover:via-blue-900 hover:to-blue-300 text-white text-center px-2'}
          font-medium
          focus:outline-none
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && (
        <div className={`border border-gray-300 mt-1 rounded-md ${nested ? 'p-2 ml-4' : 'p-4'}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
