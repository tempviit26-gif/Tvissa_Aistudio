import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-16 border border-outline-variant bg-surface-container-lowest max-w-xl mx-auto my-8">
      <div className="w-16 h-16 bg-surface-container border border-outline-variant flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="font-headline-sm text-2xl text-primary mb-2 font-normal">
        {title}
      </h3>
      <p className="font-body-md text-sm text-on-surface-variant max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {actionLabel && onAction && (
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <Button variant="secondary" size="md" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
