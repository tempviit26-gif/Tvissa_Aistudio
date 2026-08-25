import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { Check, ArrowRight, ShieldCheck, Gem, Sparkles, RefreshCw } from 'lucide-react';

interface FooterProps {
  setActiveScreen: (screen: ActiveScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveScreen }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant mt-auto text-on-surface transition-colors duration-300">
      
      {/* 4 Atelier Pillars Bar */}
      <div className="border-b border-outline-variant/60 bg-surface-container-lowest py-8 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary shrink-0">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <p className="font-button text-xs uppercase tracking-wider text-primary font-medium">100% Recycled Gold</p>
              <p className="font-body-md text-[11px] text-on-surface-muted">Fairmined 18k Bullion</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-button text-xs uppercase tracking-wider text-primary font-medium">Lifetime Guarantee</p>
              <p className="font-body-md text-[11px] text-on-surface-muted">Complimentary Servicing</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-button text-xs uppercase tracking-wider text-primary font-medium">Ethical Diamonds</p>
              <p className="font-body-md text-[11px] text-on-surface-muted">Kimberley Process Certified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-outline-variant flex items-center justify-center text-secondary shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-button text-xs uppercase tracking-wider text-primary font-medium">Insured Delivery</p>
              <p className="font-body-md text-[11px] text-on-surface-muted">Worldwide Signature Courier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-md grid grid-cols-1 md:grid-cols-12 gap-gutter lg:gap-12">
        
        {/* Brand & Manifesto */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-display-md text-2xl text-primary tracking-widest uppercase block">
            Tvisaa
          </span>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-sm">
            Handcrafted fine jewelry forged with restraint, timeless geometry, and centuries-old European goldsmithing traditions.
          </p>
          <div className="pt-2">
            <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-surface-muted block">
              Flagship Atelier: 450 Heritage Way, Suite 800, San Francisco
            </span>
          </div>
        </div>

        {/* Links Column 1: Collections */}
        <div className="md:col-span-2 space-y-3">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary font-semibold block mb-2">
            Collections
          </span>
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('collections')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                The Heritage Collection
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('collections')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                Curated Essentials
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('collections')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                Solitaire Rings
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('collections')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                Gold Talismans
              </button>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Atelier & Concierge */}
        <div className="md:col-span-2 space-y-3">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary font-semibold block mb-2">
            Atelier
          </span>
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('about')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                Our Manifesto
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('contact')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                Bespoke Commissions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('contact')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                Private Viewings
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveScreen('contact')}
                className="font-body-md text-xs text-on-surface-variant hover:text-secondary transition-colors"
              >
                Ring Sizer Kit
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary font-semibold block">
            Archival Gazette
          </span>
          <p className="font-body-md text-xs text-on-surface-variant">
            Receive private notifications for limited edition casting drops and atelier exhibitions.
          </p>

          {isSubscribed ? (
            <div className="p-3 border border-secondary bg-surface-container flex items-center gap-2 text-xs text-primary font-medium">
              <Check className="w-4 h-4 text-secondary shrink-0" />
              <span>You are registered for our private archival gazette.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex border-b border-outline-variant focus-within:border-primary transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-none py-2 text-xs font-body-md text-on-surface placeholder:text-on-surface-muted/60 focus:ring-0 focus:outline-none"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-primary hover:text-secondary transition-colors font-button text-xs uppercase tracking-widest flex items-center gap-1 shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {error && <p className="text-xs text-error">{error}</p>}
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/60 py-6 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-label-caps uppercase tracking-wider text-on-surface-muted">
          <span>© 2024 Tvisaa. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => setActiveScreen('about')} className="hover:text-primary">
              Privacy Policy
            </button>
            <button type="button" onClick={() => setActiveScreen('about')} className="hover:text-primary">
              Terms of Service
            </button>
            <button type="button" onClick={() => setActiveScreen('contact')} className="hover:text-primary">
              Complimentary Shipping
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
