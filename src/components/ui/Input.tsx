import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rightElement?: React.ReactNode;
  variant?: 'underline' | 'boxed';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  rightElement,
  type = 'text',
  id,
  className = '',
  required,
  variant = 'underline',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface font-medium"
        >
          {label} {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {variant === 'underline' ? (
          <input
            id={inputId}
            type={effectiveType}
            required={required}
            className={`w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2.5 font-body-md text-sm text-on-surface placeholder:text-on-surface-muted/60 transition-colors focus-visible:outline-none ${
              error ? 'border-error focus:border-error' : ''
            } ${className}`}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            type={effectiveType}
            required={required}
            className={`w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-0 p-3 font-body-md text-sm text-on-surface placeholder:text-on-surface-muted/60 transition-colors focus-visible:outline-none ${
              error ? 'border-error focus:border-error' : ''
            } ${className}`}
            {...props}
          />
        )}

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 text-on-surface-muted hover:text-on-surface p-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        ) : (
          rightElement && <div className="absolute right-0 pr-1">{rightElement}</div>
        )}
      </div>

      {error ? (
        <p className="flex items-center gap-1 font-body-md text-xs text-error pt-1" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="font-body-md text-xs text-on-surface-muted pt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
};
