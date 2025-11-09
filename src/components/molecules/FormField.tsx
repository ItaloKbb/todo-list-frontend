import { forwardRef } from 'react';
import { Input, type InputProps } from '../atoms/Input';
import { Typography } from '../atoms/Typography';

interface FormFieldProps extends InputProps {
  label: string;
  id: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, error, className, ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {/* Átomo Typography usado como Label */}
        <Typography
          as="label"
          variant="label"
          htmlFor={id}
          className="mb-1 block"
        >
          {label}
        </Typography>

        {/* Átomo Input (agora com a ref) */}
        <Input ref={ref} id={id} {...props} />

        {/* Feedback de erro condicional */}
        {error && (
          <Typography
            variant="small"
            className="mt-1 text-red-600"
          >
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';