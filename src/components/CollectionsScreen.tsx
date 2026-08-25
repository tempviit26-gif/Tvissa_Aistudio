import React, { useState, useMemo, useEffect } from 'react';
import { Product, ActiveScreen } from '../types';
import { ProductCard } from './ui/ProductCard';
import { EmptyState } from './ui/EmptyState';
import { ProductGridSkeleton } from './ui/SkeletonLoader';
import { LayoutGrid, List, SlidersHorizontal, X, ArrowUpDown, Gem } from 'lucide-react';

interface CollectionsScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  isLoading?: boolean;
}

export const CollectionsScreen: React.FC<CollectionsScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  isLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Smooth micro-skeleton transition when switching categories or metals
  const handleCategoryChange = (cat: string) => {
    if (cat === selectedCategory) return;
    setIsFiltering(true);
    setSelectedCategory(cat);
    setTimeout(() => setIsFiltering(false), 280);
  };

  const handleMaterialChange = (mat: string) => {
    if (mat === selectedMaterial) return;
    setIsFiltering(true);
    setSelectedMaterial(mat);
    setTimeout(() => setIsFiltering(false), 280);
  };

  const handlePriceChange = (price: string) => {
    if (price === selectedPriceRange) return;
    setIsFiltering(true);
    setSelectedPriceRange(price);
    setTimeout(() => setIsFiltering(false), 280);
  };

  const categories = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets'];
  const materials = ['All', '18K YELLOW GOLD', 'STERLING SILVER', 'ROSE GOLD', 'DIAMONDS'];
  const priceRanges = [
    { label: 'All', id: 'All' },
    { label: 'Under $500', id: 'under500' },
    { label: '$500 – $1,000', id: '500to1000' },
    { label: '$1,000 – $2,000', id: '1000to2000' },
    { label: '$2,000+', id: 'over2000' },
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Material filter
        if (selectedMaterial !== 'All') {
          const matchPrimary = product.material.toUpperCase().includes(selectedMaterial.toUpperCase());
          const matchAvailable = product.materialsAvailable?.some((m) =>
            m.toUpperCase().includes(selectedMaterial.toUpperCase())
          );
          if (!matchPrimary && !matchAvailable) return false;
        }
        // Price filter
        if (selectedPriceRange === 'under500' && product.price >= 500) return false;
        if (selectedPriceRange === '500to1000' && (product.price < 500 || product.price > 1000)) return false;
        if (selectedPriceRange === '1000to2000' && (product.price < 1000 || product.price > 2000)) return false;
        if (selectedPriceRange === 'over2000' && product.price <= 2000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedMaterial, selectedPriceRange, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' || selectedMaterial !== 'All' || selectedPriceRange !== 'All';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setSelectedPriceRange('All');
  };

  return (
    <div className="pt-24 pb-stack-lg min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-label-caps text-[11px] uppercase tracking-[0.3em] text-secondary font-bold block mb-2">
            Archival Catalog • Vol. 12
          </span>
          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-6xl text-primary font-normal leading-tight">
            The Heritage Collection
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed max-w-xl mx-auto">
            Discover timeless geometry and quiet luxury forged in recycled solid gold, ethically mined sterling bullion, and conflict-free natural diamonds.
          </p>
        </div>

        {/* Category Pill Navigation */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10" role="tablist" aria-label="Product categories">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 font-button text-xs uppercase tracking-[0.2em] transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-primary text-on-primary border-primary font-semibold'
                    : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary hover:bg-surface-container-low'
                }`}
              >
                {cat === 'All' ? 'All Pieces' : cat}
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Filter trigger, active count, sort dropdown, view toggle */}
        <div className="border-y border-outline-variant bg-surface-container-lowest py-4 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 mb-8">
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 border text-xs font-button uppercase tracking-wider transition-colors ${
                isFilterPanelOpen || hasActiveFilters
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-outline-variant text-primary hover:bg-surface-container'
              }`}
              aria-expanded={isFilterPanelOpen}
              aria-controls="filter-panel"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-secondary" />}
            </button>

            <span className="font-body-md text-xs text-on-surface-muted hidden sm:inline-block">
              Showing <strong className="text-primary">{filteredProducts.length}</strong> of {products.length} pieces
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-[10px] text-on-surface-muted uppercase tracking-widest hidden md:inline">
                Sort:
              </span>
              <div className="relative flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border border-outline-variant px-3 py-2 text-xs font-button uppercase tracking-wider text-primary focus:ring-0 focus:outline-none cursor-pointer pr-8"
                  aria-label="Sort collection"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Alphabetical (A-Z)</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-on-surface-muted absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-outline-variant" role="group" aria-label="View layout switcher">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-muted hover:text-primary hover:bg-surface-container'
                }`}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('detailed')}
                className={`p-2 transition-colors ${
                  viewMode === 'detailed'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-muted hover:text-primary hover:bg-surface-container'
                }`}
                aria-label="Detailed list view"
                aria-pressed={viewMode === 'detailed'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterPanelOpen && (
          <div
            id="filter-panel"
            className="p-6 sm:p-8 bg-surface-container-low border border-outline-variant mb-8 space-y-6 animate-fadeIn"
          >
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <h3 className="font-button text-xs uppercase tracking-[0.2em] text-primary font-bold">
                Refine Pieces
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] font-label-caps uppercase text-error hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Material Selector */}
              <div>
                <label className="block font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-surface-muted font-bold mb-2">
                  Precious Metal & Stone
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => handleMaterialChange(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 text-xs font-body-md text-primary focus:ring-0 focus:outline-none"
                >
                  {materials.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Selector */}
              <div>
                <label className="block font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-surface-muted font-bold mb-2">
                  Price Valuation
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 text-xs font-body-md text-primary focus:ring-0 focus:outline-none"
                >
                  {priceRanges.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {pr.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Quick Selector */}
              <div>
                <label className="block font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-surface-muted font-bold mb-2">
                  Jewelry Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant p-2.5 text-xs font-body-md text-primary focus:ring-0 focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? 'All Jewelry Categories' : c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[10px] font-label-caps uppercase text-on-surface-muted">
              Active Filters:
            </span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-outline-variant text-xs font-body-md text-primary">
                Category: {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="hover:text-error"
                  aria-label={`Remove category filter: ${selectedCategory}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedMaterial !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-outline-variant text-xs font-body-md text-primary">
                Material: {selectedMaterial}
                <button
                  type="button"
                  onClick={() => setSelectedMaterial('All')}
                  className="hover:text-error"
                  aria-label={`Remove material filter: ${selectedMaterial}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedPriceRange !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-outline-variant text-xs font-body-md text-primary">
                Price: {priceRanges.find((p) => p.id === selectedPriceRange)?.label}
                <button
                  type="button"
                  onClick={() => setSelectedPriceRange('All')}
                  className="hover:text-error"
                  aria-label="Remove price filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-[10px] font-button uppercase tracking-wider text-secondary underline hover:text-primary ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Grid / List Display */}
        {isLoading || isFiltering ? (
          <ProductGridSkeleton
            count={6}
            viewMode={viewMode}
            columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
        ) : filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter animate-fadeIn">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onQuickAdd={(p) => onAddToCart(p, 1)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  variant="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onQuickAdd={(p) => onAddToCart(p, 1)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  variant="detailed"
                />
              ))}
            </div>
          )
        ) : (
          <EmptyState
            icon={<Gem className="w-8 h-8 stroke-[1.2]" />}
            title="No Heirloom Pieces Found"
            description="We could not find any pieces matching your selected filter criteria. Try adjusting your metal, price, or category choices."
            actionLabel="Reset All Filters"
            onAction={resetFilters}
          />
        )}
      </main>
    </div>
  );
};
