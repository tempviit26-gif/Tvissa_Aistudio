import React from 'react';
import { Check } from 'lucide-react';

interface RadioOption {
  id: string;
  title: string;
  description?: string;
  priceBadge?: string;
  badge?: string;
}

interface RadioCardGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`} role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.id;
        const optId = `${name}-${opt.id}`;

        return (
          <label
            key={opt.id}
            htmlFor={optId}
            className={`flex items-start justify-between p-4 border cursor-pointer transition-all duration-200 ${
              isSelected
                ? 'border-primary bg-surface-container-low'
                : 'border-outline-variant bg-surface-container-lowest hover:border-outline'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                <input
                  type="radio"
                  id={optId}
                  name={name}
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onChange(opt.id)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-outline-variant bg-surface'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-on-primary" />}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-button text-xs uppercase tracking-[0.1em] text-primary font-medium">
                    {opt.title}
                  </span>
                  {opt.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-label-caps uppercase bg-secondary-container text-on-secondary-container">
                      {opt.badge}
                    </span>
                  )}
                </div>
                {opt.description && (
                  <p className="font-body-md text-xs text-on-surface-variant mt-1">
                    {opt.description}
                  </p>
                )}
              </div>
            </div>

            {opt.priceBadge && (
              <span className="font-body-md text-xs font-medium text-primary shrink-0 pl-2">
                {opt.priceBadge}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};
