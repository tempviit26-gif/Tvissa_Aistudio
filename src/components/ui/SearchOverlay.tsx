import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex flex-col justify-start items-center px-4 pt-16 sm:pt-24 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-outline-variant pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-on-surface-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections, diamonds, cuffs, solitaires..."
              className="w-full bg-transparent border-none text-base sm:text-lg font-body-md text-on-surface placeholder:text-on-surface-muted/60 focus:ring-0 focus:outline-none"
              aria-label="Search the Tvisaa catalog"
            />
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-on-surface-muted hover:text-on-surface text-xs uppercase font-label-caps"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-on-surface-muted hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-8">
              <span className="font-label-caps text-[10px] uppercase tracking-[0.25em] text-on-surface-muted font-semibold block mb-4">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Lumina Pendant', '18K Solid Gold', 'Solitaire Ring', 'Aura Hoops', 'Emerald Cuff'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 border border-outline-variant text-xs font-button uppercase tracking-wider text-primary hover:bg-surface-container transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-surface-muted block mb-3">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece Found' : 'Pieces Found'}
              </span>
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 border border-outline-subtle hover:border-primary hover:bg-surface-container-low cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-12 object-cover bg-surface-container shrink-0"
                    />
                    <div>
                      <h4 className="font-headline-sm text-sm text-primary group-hover:text-secondary transition-colors">
                        {prod.name}
                      </h4>
                      <p className="font-body-md text-xs text-on-surface-muted">
                        {prod.category} • {prod.material}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-body-md text-sm font-medium text-primary">
                      ${prod.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-on-surface-muted group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-headline-sm text-lg text-primary mb-1">
                No matching pieces found
              </p>
              <p className="font-body-md text-xs text-on-surface-muted">
                Try searching for materials like "Gold", categories like "Necklaces", or browse our collections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
