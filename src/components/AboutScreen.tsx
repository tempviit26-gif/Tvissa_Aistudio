import React from 'react';
import { ActiveScreen } from '../types';
import { Button } from './ui/Button';
import { Gem, ShieldCheck, Sparkles, Compass, Award, ArrowRight } from 'lucide-react';

interface AboutScreenProps {
  setActiveScreen: (screen: ActiveScreen) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ setActiveScreen }) => {
  return (
    <div className="pt-24 pb-stack-lg min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full space-y-stack-lg">
        
        {/* 1. Atelier Manifesto Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <span className="font-label-caps text-[11px] uppercase tracking-[0.3em] text-secondary font-bold block">
            Atelier Manifesto • Established MMXVIII
          </span>
          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-6xl text-primary font-normal leading-tight">
            Quiet Luxury, <br />
            <span className="italic font-serif">Forged with Restraint</span>
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Tvisaa was founded upon an uncompromising premise: that fine jewelry should reject seasonal obsolescence in favor of eternal architectural form, master goldsmithing, and strict ethical stewardship.
          </p>
        </section>

        {/* 2. Visual Story Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 aspect-[16/10] bg-surface-container overflow-hidden border border-outline-variant">
            <img
              src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1200&q=85"
              alt="Goldsmith at jeweler's bench with loupe"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="md:col-span-5 space-y-4">
            <span className="font-label-caps text-[10px] uppercase tracking-[0.25em] text-secondary font-bold block">
              The Artisan Benchmark
            </span>
            <h2 className="font-display-md text-2xl sm:text-3xl text-primary font-normal">
              100% Recycled Solid Bullion
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Every ring, pendant, and cuff is alloyed from 100% certified recycled 18k gold and fine silver. By re-refining existing precious bullion, we circumvent industrial mining without ever compromising the atomic purity or lustrous heft of our pieces.
            </p>
          </div>
        </section>

        {/* 3. Core Pillars Matrix */}
        <section className="bg-surface-container-low border border-outline-variant p-8 sm:p-14 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-display-md text-3xl text-primary font-normal">
              Our Uncompromising Standards
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant">
              Every piece in the Tvisaa vault adheres to four inviolable pillars of heritage manufacture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary">
                <Gem className="w-5 h-5" />
              </div>
              <h3 className="font-button text-xs uppercase tracking-wider text-primary font-bold">
                Conflict-Free Diamonds
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Adhering strictly to Kimberley Process certification and audited artisanal suppliers.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-button text-xs uppercase tracking-wider text-primary font-bold">
                Lifetime Guarantee
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Complimentary prong re-tightening, annual ultrasonic cleans, and surface refinishing.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-button text-xs uppercase tracking-wider text-primary font-bold">
                Zero Plating Compromise
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                We craft in solid bullion and heavy vermeil that will never peel, flake, or irritate skin.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-button text-xs uppercase tracking-wider text-primary font-bold">
                Bespoke Sizing
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Custom chain lengths and micro-quarter ring sizing crafted to individual order specifications.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Action Banner */}
        <section className="text-center py-12 border-t border-outline-variant space-y-6">
          <h2 className="font-display-md text-3xl text-primary font-normal">
            Commission a Bespoke Heirloom
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto">
            Schedule a private consultation at our San Francisco flagship salon or via private digital concierge.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setActiveScreen('contact')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Book Salon Viewing
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setActiveScreen('collections')}
            >
              View Catalog
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};
