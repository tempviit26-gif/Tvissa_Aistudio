import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangle' | 'text' | 'circle' | 'pill';
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangle',
  animate = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'pill':
        return 'rounded-full';
      case 'text':
        return 'h-4 w-full';
      case 'rectangle':
      default:
        return '';
    }
  };

  return (
    <div
      className={`${animate ? 'animate-shimmer' : 'bg-surface-container-high'} ${getVariantStyles()} ${className}`}
      aria-hidden="true"
    />
  );
};

interface ProductCardSkeletonProps {
  variant?: 'grid' | 'detailed';
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  variant = 'grid',
}) => {
  if (variant === 'detailed') {
    return (
      <div
        className="flex flex-col sm:flex-row gap-6 p-6 border border-outline-variant bg-surface-container-lowest"
        aria-hidden="true"
      >
        {/* Left image placeholder */}
        <div className="w-full sm:w-48 aspect-[3/4] shrink-0 bg-surface-container overflow-hidden relative">
          <Skeleton className="w-full h-full" />
          <Skeleton className="absolute top-2 left-2 w-14 h-4" />
        </div>

        {/* Right info placeholder */}
        <div className="flex flex-col justify-between flex-grow space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 w-2/3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-6 w-4/5" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-1.5 pt-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-outline-subtle">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-surface-container-lowest border border-outline-variant overflow-hidden"
      aria-hidden="true"
    >
      {/* Image stage */}
      <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
        <Skeleton className="w-full h-full" />
        <Skeleton className="absolute top-3 left-3 w-12 h-4" />
        <Skeleton className="absolute top-3 right-3 w-7 h-7" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col items-center text-center flex-grow justify-between space-y-4">
        <div className="w-full flex flex-col items-center space-y-2">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="pt-3 w-full border-t border-outline-subtle flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  viewMode?: 'grid' | 'detailed';
  columns?: string;
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 6,
  viewMode = 'grid',
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (viewMode === 'detailed') {
    return (
      <div className="space-y-4" aria-busy="true" aria-label="Loading products">
        {items.map((key) => (
          <ProductCardSkeleton key={key} variant="detailed" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid ${columns} gap-gutter`}
      aria-busy="true"
      aria-label="Loading product grid"
    >
      {items.map((key) => (
        <ProductCardSkeleton key={key} variant="grid" />
      ))}
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="pt-24 pb-stack-lg min-h-screen" aria-busy="true" aria-label="Loading product details">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {/* Breadcrumb row skeleton */}
        <div className="flex items-center justify-between pb-8 mb-4 border-b border-outline-variant/50">
          <Skeleton className="h-4 w-36" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-14 items-start">
          {/* Left: Media Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage */}
            <div className="w-full aspect-[4/5] bg-surface-container border border-outline-variant relative overflow-hidden">
              <Skeleton className="w-full h-full" />
              <Skeleton className="absolute top-4 left-4 w-16 h-5" />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="aspect-square border border-outline-variant overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Specifications & CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header & Valuation */}
            <div className="space-y-3 border-b border-outline-variant/60 pb-6">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-9 w-4/5" />
              <div className="flex items-center gap-4 pt-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            {/* Description Narrative */}
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-3/4" />
            </div>

            {/* Metal & Options Selectors */}
            <div className="space-y-6 pt-2">
              {/* Precious Metal Selector */}
              <div className="space-y-2.5">
                <Skeleton className="h-3 w-36" />
                <div className="flex flex-wrap gap-2.5">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-28" />
                </div>
              </div>

              {/* Sizing / Length Selector */}
              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-14" />
                  <Skeleton className="h-9 w-14" />
                  <Skeleton className="h-9 w-14" />
                </div>
              </div>
            </div>

            {/* CTA & Quantity Section */}
            <div className="pt-4 space-y-4 border-t border-outline-variant/60">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <Skeleton className="h-2.5 w-12" />
                  <Skeleton className="h-12 w-28" />
                </div>
                <div className="flex-1 pt-4">
                  <Skeleton className="h-12 w-full" />
                </div>
                <div className="pt-4">
                  <Skeleton className="h-12 w-12" />
                </div>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            {/* Accordion List Skeleton */}
            <div className="pt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border-b border-outline-variant py-4 flex justify-between items-center">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Recommendation Section Skeleton */}
        <section className="mt-stack-lg pt-stack-md border-t border-outline-variant">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="h-4 w-28" />
          </div>
          <ProductGridSkeleton count={3} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
        </section>
      </div>
    </div>
  );
};

export const CollectionsScreenSkeleton: React.FC = () => {
  return (
    <div className="pt-24 pb-stack-lg min-h-screen" aria-busy="true" aria-label="Loading collection">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {/* Editorial Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 flex flex-col items-center">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-12 w-3/4 max-w-md" />
          <div className="space-y-1.5 w-full max-w-lg pt-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5 mx-auto" />
          </div>
        </div>

        {/* Category Pill Tabs Skeleton */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>

        {/* Controls Bar Skeleton */}
        <div className="border-y border-outline-variant bg-surface-container-lowest py-4 px-4 sm:px-6 flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-32 hidden sm:block" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
};
