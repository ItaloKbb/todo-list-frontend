import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva(
  'text-gray-800',
  {
    variants: {
      variant: {
        h1: 'text-4xl font-bold tracking-tight',
        h2: 'text-3xl font-bold tracking-tight',
        h3: 'text-2xl font-semibold',
        p: 'text-base font-normal', // Default
        small: 'text-sm font-medium text-gray-600',
        label: 'text-sm font-semibold text-gray-700',
      },
    },
    defaultVariants: {
      variant: 'p',
    },
  }
);

export interface TypographyProps extends VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'label';
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  as,
  variant,
  children,
  className,
  ...props
}) => {
  const Tag =
    as || (variant === 'p' || !variant ? 'p' : variant === 'small' ? 'small' : variant === 'label' ? 'label' : 'h1');

  return (
    <Tag className={typographyVariants({ variant, className })} {...props}>
      {children}
    </Tag>
  );
};