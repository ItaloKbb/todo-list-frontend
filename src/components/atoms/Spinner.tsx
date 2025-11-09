import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva(
  'animate-spin rounded-full border-t-2 border-b-2',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-4', // Default
        lg: 'h-12 w-12 border-4',
      },
      // Define a cor da borda visível
      color: {
        primary: 'border-blue-600', // Default
        secondary: 'border-gray-600',
        white: 'border-white',
      },
      trackColor: {
        light: 'border-gray-200', // Default
        dark: 'border-gray-700',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
      trackColor: 'light',
    },
  }
);

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  'aria-label'?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size,
  color,
  trackColor,
  'aria-label': ariaLabel = 'Carregando',
  ...props
}) => {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={spinnerVariants({ size, color, trackColor, className })}
      {...props}
    />
  );
};