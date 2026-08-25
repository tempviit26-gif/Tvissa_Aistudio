import React from 'react';
import { Product } from '../../types';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  variant?: 'grid' | 'detailed';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isWishlisted = false,
  onToggleWishlist,
  variant = 'grid',
}) => {
  const primaryImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  if (variant === 'detailed') {
    return (
      <article
        className="group flex flex-col sm:flex-row gap-6 p-6 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300"
        aria-labelledby={`product-title-${product.id}`}
      >
        <div
          onClick={() => onSelect(product)}
          className="relative w-full sm:w-48 aspect-[3/4] bg-surface-container overflow-hidden cursor-pointer shrink-0"
        >
          <img
            src={primaryImage}
            alt={`${product.name} - Handcrafted ${product.material}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {product.tag && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary text-[9px] font-label-caps uppercase tracking-widest">
              {product.tag}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-between flex-grow">
          <div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="font-label-caps text-[10px] text-on-surface-muted uppercase tracking-[0.2em] block mb-1">
                  {product.category} • {product.material}
                </span>
                <h3
                  id={`product-title-${product.id}`}
                  onClick={() => onSelect(product)}
                  className="font-headline-sm text-xl text-primary font-normal hover:text-secondary transition-colors cursor-pointer"
                >
                  {product.name}
                </h3>
              </div>
              <p className="font-body-lg text-lg text-primary font-medium">
                ${product.price.toLocaleString()}
              </p>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-outline-subtle">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="px-6 py-2.5 bg-primary text-on-primary text-[11px] font-button uppercase tracking-[0.15em] hover:bg-primary-container transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              View Piece
            </button>
            {onQuickAdd && (
              <button
                type="button"
                onClick={() => onQuickAdd(product)}
                className="p-2.5 border border-outline-variant text-primary hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                aria-label={`Quick add ${product.name} to bag`}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            )}
            {onToggleWishlist && (
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className="p-2.5 border border-outline-variant text-primary hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-error text-error' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low transition-colors duration-500 overflow-hidden"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Product Image Stage */}
      <div
        onClick={() => onSelect(product)}
        className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container cursor-pointer"
      >
        <img
          src={primaryImage}
          alt={`${product.name} - Front view in ${product.material}`}
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          loading="lazy"
        />
        <img
          src={hoverImage}
          alt={`${product.name} - Alternate view`}
          className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105"
          loading="lazy"
        />

        {/* Tag Pill */}
        {product.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-on-primary text-[9px] font-label-caps uppercase tracking-[0.2em]">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="absolute top-3 right-3 p-2 bg-surface/80 backdrop-blur-sm text-primary hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-error text-error' : ''}`} />
          </button>
        )}

        {/* Quick Add Hover Slide-Up Banner */}
        {onQuickAdd && (
          <div className="absolute inset-x-0 bottom-0 p-3 bg-surface-container-lowest/95 backdrop-blur-sm border-t border-outline-variant transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:flex items-center justify-between">
            <span className="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-muted">
              {product.materialsAvailable?.[0] || product.material}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              className="text-[10px] font-button uppercase tracking-[0.2em] text-primary hover:text-secondary font-medium focus-visible:outline-none"
            >
              + Quick Bag
            </button>
          </div>
        )}
      </div>

      {/* Product Card Details */}
      <div className="p-5 flex flex-col items-center text-center flex-grow justify-between">
        <div className="w-full">
          <span className="font-label-caps text-[9px] text-on-surface-muted uppercase tracking-[0.25em] block mb-1">
            {product.category}
          </span>
          <h3
            id={`product-title-${product.id}`}
            onClick={() => onSelect(product)}
            className="font-headline-sm text-base text-primary font-normal tracking-wide hover:text-secondary transition-colors cursor-pointer truncate"
          >
            {product.name}
          </h3>
        </div>

        <div className="mt-3 pt-3 w-full border-t border-outline-subtle flex items-center justify-between">
          <span className="font-body-md text-xs text-on-surface-muted truncate max-w-[55%] text-left">
            {product.material}
          </span>
          <p className="font-body-lg text-sm text-primary font-medium text-right">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </article>
  );
};
