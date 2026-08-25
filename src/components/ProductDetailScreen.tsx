import React, { useState, useMemo } from 'react';
import { Product, ActiveScreen } from '../types';
import { Button } from './ui/Button';
import { QuantityStepper } from './ui/QuantityStepper';
import { Accordion } from './ui/Accordion';
import { ProductCard } from './ui/ProductCard';
import { ProductDetailSkeleton } from './ui/SkeletonLoader';
import { ArrowLeft, Heart, Shield, Sparkles, Truck, Check, Share2 } from 'lucide-react';

interface ProductDetailScreenProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (
    product: Product,
    quantity: number,
    material: string,
    chainLength?: string,
    finish?: string
  ) => void;
  onSelectProduct: (product: Product) => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  isLoading?: boolean;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  allProducts,
  onAddToCart,
  onSelectProduct,
  setActiveScreen,
  isWishlisted,
  onToggleWishlist,
  isLoading = false,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(
    product?.materialsAvailable?.[0] || product?.material || ''
  );
  const [selectedChainLength, setSelectedChainLength] = useState(
    product?.chainLengths?.[0] || '18"'
  );
  const [selectedFinish, setSelectedFinish] = useState(
    product?.finishes?.[0] || 'High Polish'
  );
  const [selectedRingSize, setSelectedRingSize] = useState('7');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (isLoading || !product) {
    return <ProductDetailSkeleton />;
  }

  // Dynamic price calculation based on chosen metal
  const calculatedPrice = useMemo(() => {
    let base = product.price;
    if (selectedMaterial === 'STERLING SILVER') {
      base = Math.max(320, Math.round(base * 0.45));
    } else if (selectedMaterial === 'PLATINUM') {
      base = Math.round(base * 1.35);
    }
    return base;
  }, [product.price, selectedMaterial]);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      const customProduct = {
        ...product,
        price: calculatedPrice,
      };
      onAddToCart(
        customProduct,
        quantity,
        selectedMaterial,
        product.category === 'Necklaces' || product.category === 'Bracelets'
          ? selectedChainLength
          : undefined,
        product.finishes ? selectedFinish : undefined
      );
      setIsAdding(false);
    }, 300);
  };

  // Recommended pairing pieces
  const recommended = allProducts
    .filter((p) => p.id !== product.id && (p.category !== product.category || p.featured))
    .slice(0, 3);

  const accordionItems = [
    {
      id: 'details',
      title: 'Artisan Specifications & Sizing',
      defaultOpen: true,
      content: (
        <div className="space-y-3">
          <p className="font-body-md text-xs text-on-surface-variant">
            {product.subMaterial}
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-xs text-on-surface-variant font-body-md">
            {product.details?.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'craftsmanship',
      title: 'Lost-Wax Casting & Metallurgy',
      content: (
        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
          {product.craftsmanship}
        </p>
      ),
    },
    {
      id: 'care',
      title: 'Lifetime Guarantee & Maintenance',
      content: (
        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
          {product.careAndRepair}
        </p>
      ),
    },
    {
      id: 'shipping',
      title: 'Complimentary White-Glove Courier',
      content: (
        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
          {product.shipping}
        </p>
      ),
    },
  ];

  return (
    <div className="pt-24 pb-stack-lg min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        
        {/* Navigation Breadcrumb / Return */}
        <div className="flex items-center justify-between pb-8 mb-4 border-b border-outline-variant/50">
          <button
            type="button"
            onClick={() => setActiveScreen('collections')}
            className="inline-flex items-center gap-2 font-button text-xs uppercase tracking-[0.2em] text-primary hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </button>

          <div className="flex items-center gap-4 text-xs font-label-caps uppercase text-on-surface-muted">
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </div>
        </div>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-14 items-start">
          
          {/* Left: Interactive Media Stage & Thumbnails (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Hero */}
            <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden border border-outline-variant group">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={`${product.name} - View ${selectedImageIdx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-on-primary font-label-caps text-[9px] uppercase tracking-[0.25em]">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel Row */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3" role="tablist" aria-label="Product image thumbnails">
              {product.images.map((img, idx) => {
                const isSelected = selectedImageIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`aspect-square border overflow-hidden transition-all ${
                      isSelected
                        ? 'border-primary ring-1 ring-primary'
                        : 'border-outline-variant opacity-70 hover:opacity-100 hover:border-outline'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Product Attributes & Acquisition Control (5 cols, sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            
            {/* Title & Valuation */}
            <div className="space-y-2 border-b border-outline-variant/60 pb-6">
              <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-secondary font-bold block">
                Heritage Atelier • {product.category}
              </span>
              <h1 className="font-display-lg text-3xl sm:text-4xl text-primary font-normal">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 pt-2">
                <p className="font-body-lg text-2xl text-primary font-medium">
                  ${calculatedPrice.toLocaleString()}
                </p>
                <span className="font-label-caps text-[10px] uppercase tracking-wider text-success px-2 py-0.5 bg-success-container text-on-success-container">
                  In Stock & Ready for Courier
                </span>
              </div>
            </div>

            {/* Description Narrative */}
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Selectors Form */}
            <div className="space-y-6 pt-2">
              
              {/* 1. Metal & Material Selector */}
              {product.materialsAvailable && product.materialsAvailable.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-primary font-medium">
                      Precious Metal: <span className="text-secondary">{selectedMaterial}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.materialsAvailable.map((mat) => {
                      const isSelected = selectedMaterial === mat;
                      return (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => setSelectedMaterial(mat)}
                          className={`px-4 py-2.5 text-xs font-button uppercase tracking-wider border transition-all ${
                            isSelected
                              ? 'border-primary bg-primary text-on-primary font-semibold'
                              : 'border-outline-variant bg-surface-container-lowest text-primary hover:border-primary'
                          }`}
                        >
                          {mat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Chain Length or Ring Size Selector */}
              {product.chainLengths && product.chainLengths.length > 0 ? (
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-primary font-medium">
                      Chain Length: <span className="text-on-surface-muted">{selectedChainLength}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveScreen('contact')}
                      className="text-[10px] font-label-caps uppercase text-secondary hover:underline"
                    >
                      Fit Guide
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {product.chainLengths.map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setSelectedChainLength(len)}
                        className={`w-14 py-2 text-xs font-button uppercase border transition-all ${
                          selectedChainLength === len
                            ? 'border-primary bg-primary text-on-primary font-semibold'
                            : 'border-outline-variant bg-surface-container-lowest text-primary hover:border-primary'
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              ) : product.category === 'Rings' ? (
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-primary font-medium">
                      Ring Size (US): <span className="text-on-surface-muted">{selectedRingSize}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveScreen('contact')}
                      className="text-[10px] font-label-caps uppercase text-secondary hover:underline"
                    >
                      Request Sizer Kit
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {['5', '6', '7', '8', '9'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedRingSize(sz)}
                        className={`w-12 py-2 text-xs font-button uppercase border transition-all ${
                          selectedRingSize === sz
                            ? 'border-primary bg-primary text-on-primary font-semibold'
                            : 'border-outline-variant bg-surface-container-lowest text-primary hover:border-primary'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* 3. Finish Selector if available */}
              {product.finishes && (
                <div className="space-y-2.5">
                  <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-primary font-medium block">
                    Surface Patina: <span className="text-on-surface-muted">{selectedFinish}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.finishes.map((fn) => (
                      <button
                        key={fn}
                        type="button"
                        onClick={() => setSelectedFinish(fn)}
                        className={`px-4 py-2 text-xs font-button uppercase border transition-all ${
                          selectedFinish === fn
                            ? 'border-primary bg-primary text-on-primary font-semibold'
                            : 'border-outline-variant bg-surface-container-lowest text-primary hover:border-primary'
                        }`}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Acquisition CTA */}
            <div className="pt-4 space-y-4 border-t border-outline-variant/60">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-surface-muted block mb-1">
                    Quantity
                  </span>
                  <QuantityStepper
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={10}
                  />
                </div>

                <div className="flex-1 pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isAdding}
                    onClick={handleAdd}
                  >
                    Add to Bag • ${(calculatedPrice * quantity).toLocaleString()}
                  </Button>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    className="p-3.5 border border-outline-variant text-primary hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-error text-error' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Complimentary Guarantee Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-label-caps uppercase text-on-surface-muted">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-secondary" />
                  <span>Complimentary Insured Courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-secondary" />
                  <span>Lifetime Authenticity Warranty</span>
                </div>
              </div>
            </div>

            {/* Structured Editorial Accordion */}
            <div className="pt-4">
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>

        {/* Recommended Pairing Collection */}
        <section className="mt-stack-lg pt-stack-md border-t border-outline-variant">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-secondary font-bold block mb-1">
                Complete The Parure
              </span>
              <h3 className="font-headline-sm text-2xl text-primary font-normal">
                Complementary Pieces
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveScreen('collections')}
              className="font-button text-xs uppercase tracking-widest text-primary hover:text-secondary transition-colors underline"
            >
              View All Pieces →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {recommended.map((rec) => (
              <ProductCard
                key={rec.id}
                product={rec}
                onSelect={(p) => {
                  onSelectProduct(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onQuickAdd={(p) => onAddToCart(p, 1)}
                isWishlisted={false}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
