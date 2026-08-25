import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'md',
}) => {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const heightClasses = size === 'sm' ? 'h-8' : 'h-10';

  return (
    <div
      className={`inline-flex items-center border border-outline-variant bg-surface-container-lowest ${heightClasses} transition-colors`}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="w-8 h-full flex items-center justify-center text-on-surface hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </button>

      <span
        className="w-10 text-center font-body-md text-xs sm:text-sm font-medium text-on-surface select-none"
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="w-8 h-full flex items-center justify-center text-on-surface hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};
