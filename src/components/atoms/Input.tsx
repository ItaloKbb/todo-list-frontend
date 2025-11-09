import React, { forwardRef } from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref} // Passamos a ref para o input real
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md 
          text-gray-900 
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          ${className} 
        `}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';