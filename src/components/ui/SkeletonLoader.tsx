import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-surface-container-high ${className}`}
      aria-hidden="true"
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col border border-outline-variant bg-surface-container-lowest p-4">
      <Skeleton className="w-full aspect-[3/4] mb-4" />
      <Skeleton className="h-3 w-16 mb-2 mx-auto" />
      <Skeleton className="h-4 w-32 mb-4 mx-auto" />
      <div className="flex justify-between pt-2 border-t border-outline-subtle">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
};
