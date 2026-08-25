import React, { useState } from 'react';
import { Product, ActiveScreen } from '../types';
import { ProductCard } from './ui/ProductCard';
import { Button } from './ui/Button';
import { ProductGridSkeleton } from './ui/SkeletonLoader';
import { Droplet, Shield, HeartHandshake, Truck, ArrowRight, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  isLoading?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  setActiveScreen,
  isLoading = false,
}) => {
  const [priceFilter, setPriceFilter] = useState<'all' | 'under500' | '500to1000' | 'over1000'>('all');
  const [isFiltering, setIsFiltering] = useState(false);

  const handlePriceFilterChange = (val: 'all' | 'under500' | '500to1000' | 'over1000') => {
    if (val === priceFilter) return;
    setIsFiltering(true);
    setPriceFilter(val);
    setTimeout(() => setIsFiltering(false), 260);
  };

  const filteredCurated = products
    .filter((p) => {
      if (priceFilter === 'under500') return p.price < 500;
      if (priceFilter === '500to1000') return p.price >= 500 && p.price <= 1000;
      if (priceFilter === 'over1000') return p.price > 1000;
      return true;
    })
    .slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Hero Editorial Section */}
      <section className="relative h-[85vh] min-h-[600px] max-h-[880px] w-full bg-surface-variant overflow-hidden flex items-end transition-colors duration-300">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full scale-100 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=85')",
          }}
          role="img"
          aria-label="Tvisaa fine jewelry campaign"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
        
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-16 sm:pb-24">
          <div className="max-w-2xl space-y-6 animate-fadeIn">
            <span className="font-label-caps text-[11px] uppercase tracking-[0.3em] text-secondary font-bold block">
              Vol. 12 — The Heritage Campaign
            </span>
            <h1 className="font-display-lg text-4xl sm:text-6xl md:text-7xl text-primary font-normal leading-[1.1] tracking-tight">
              The Art of <br />
              <span className="italic font-serif">Refinement</span>
            </h1>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-lg leading-relaxed">
              Quiet luxury forged with architectural restraint. Handcrafted from recycled 18k solid bullion and conflict-free natural diamonds.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setActiveScreen('collections')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Shop The Collection
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setActiveScreen('about')}
              >
                Atelier Manifesto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Marquee Ticker */}
      <section className="border-y border-outline-variant bg-surface-container-lowest overflow-hidden py-5 select-none" aria-label="Brand highlights ticker">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {Array(8)
            .fill([
              'TVISAA',
              '•',
              'THE HERITAGE COLLECTION',
              '•',
              'RECYCLED 18K GOLD',
              '•',
              'HANDCRAFTED IN MILAN',
              '•',
            ])
            .flat()
            .map((item, idx) => (
              <span
                key={idx}
                className="font-serif text-xl sm:text-2xl text-primary/70 tracking-widest px-6"
              >
                {item}
              </span>
            ))}
        </div>
      </section>

      {/* 3. Curated Essentials Section */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-stack-md">
          <div>
            <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-secondary font-bold block mb-1">
              Curated Selection
            </span>
            <h2 className="font-headline-sm text-2xl sm:text-3xl text-primary font-normal">
              Curated Essentials
            </h2>
          </div>

          {/* Interactive Price Filter Selector */}
          <div className="flex items-center gap-3 border border-outline-variant px-4 py-2 bg-surface-container-lowest">
            <span className="font-label-caps text-[10px] text-on-surface-muted uppercase tracking-widest shrink-0">
              Price Range:
            </span>
            <select
              value={priceFilter}
              onChange={(e) => handlePriceFilterChange(e.target.value as any)}
              className="bg-transparent border-none text-xs font-button uppercase tracking-wider text-primary focus:ring-0 focus:outline-none cursor-pointer pr-6"
              aria-label="Filter curated essentials by price"
            >
              <option value="all">All Prices</option>
              <option value="under500">Under $500</option>
              <option value="500to1000">$500 – $1,000</option>
              <option value="over1000">$1,000 & Above</option>
            </select>
          </div>
        </div>

        {/* 4-Column Essentials Grid */}
        {isLoading || isFiltering ? (
          <ProductGridSkeleton count={4} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {filteredCurated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={(p) => onAddToCart(p, 1)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setActiveScreen('collections')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Catalog ({products.length} Pieces)
          </Button>
        </div>
      </section>

      {/* 4. Atelier Craftsmanship Feature (Split Editorial) */}
      <section className="bg-surface-container-low border-y border-outline-variant py-stack-lg px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-secondary font-bold block">
              The Master Workbench
            </span>
            <h2 className="font-display-md text-3xl sm:text-4xl text-primary font-normal leading-tight">
              Forged with Restraint. <br />
              <span className="italic font-serif">Finished by Hand.</span>
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Every curve of our jewelry is shaped at the workbench. From hand-carved lost wax models to microscopic gemstone setting and hand-applied satin finishes, each creation requires between 12 to 40 hours of dedicated artisan attention.
            </p>
            <div className="pt-2 flex items-center gap-8 text-xs font-label-caps uppercase tracking-wider text-primary">
              <div>
                <p className="text-2xl font-serif text-secondary mb-1">100%</p>
                <p className="text-on-surface-muted">Recycled Metals</p>
              </div>
              <div className="w-px h-10 bg-outline-variant" />
              <div>
                <p className="text-2xl font-serif text-secondary mb-1">0.0%</p>
                <p className="text-on-surface-muted">Conflict Stones</p>
              </div>
              <div className="w-px h-10 bg-outline-variant" />
              <div>
                <p className="text-2xl font-serif text-secondary mb-1">Lifetime</p>
                <p className="text-on-surface-muted">Artisan Warranty</p>
              </div>
            </div>
            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setActiveScreen('about')}
              >
                Read Our Story
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-surface-container overflow-hidden border border-outline-variant">
              <img
                src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=800&q=85"
                alt="Goldsmith precision crafting at workbench"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="aspect-[3/4] bg-surface-container overflow-hidden border border-outline-variant mt-8">
              <img
                src="https://images.unsplash.com/photo-1611591475102-4a0081d6d45e?auto=format&fit=crop&w=800&q=85"
                alt="Finished 18k solid gold chain link detail"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-Pillar Atelier Standards Bar */}
      <section className="border-b border-outline-variant bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {[
            {
              icon: <Droplet className="w-6 h-6 stroke-[1.2]" />,
              title: 'Waterproof',
              desc: 'Solid bullion impervious to ocean water & moisture',
            },
            {
              icon: <Shield className="w-6 h-6 stroke-[1.2]" />,
              title: 'Tarnish-Resistant',
              desc: 'Rhodium barrier & solid non-reactive gold alloy',
            },
            {
              icon: <HeartHandshake className="w-6 h-6 stroke-[1.2]" />,
              title: 'Hypoallergenic',
              desc: 'Nickel-free, lead-free biocompatible metals',
            },
            {
              icon: <Truck className="w-6 h-6 stroke-[1.2]" />,
              title: 'Complimentary Delivery',
              desc: 'Insured worldwide shipping in bespoke presentation cases',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-8 sm:p-10 flex flex-col items-center text-center">
              <div className="text-secondary mb-4">{item.icon}</div>
              <h3 className="font-serif text-lg text-primary mb-2 font-normal uppercase tracking-wider">
                {item.title}
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
