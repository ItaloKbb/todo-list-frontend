import React from 'react';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
  return (
    <input
      type="checkbox"
      className={`
        h-5 w-5 rounded border-gray-300 text-blue-600 
        shadow-sm
        focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    />
  );
};