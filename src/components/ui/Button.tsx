import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-button uppercase tracking-[0.2em] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeClasses = {
    sm: 'text-[10px] px-4 py-2.5 gap-1.5',
    md: 'text-[12px] px-6 py-3.5 gap-2',
    lg: 'text-[13px] px-8 py-4 gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-primary text-on-primary border border-primary hover:bg-primary-container hover:border-primary-container active:scale-[0.99]',
    secondary:
      'bg-transparent text-primary border border-primary hover:bg-primary hover:text-on-primary active:scale-[0.99]',
    ghost:
      'bg-transparent text-primary hover:bg-surface-container-high active:scale-[0.99]',
    gold:
      'bg-secondary text-on-secondary border border-secondary hover:bg-secondary/90 active:scale-[0.99]',
    danger:
      'bg-error text-on-error border border-error hover:bg-error/90 active:scale-[0.99]',
  }[variant];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-label="Loading" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
