import React, { useState } from 'react';
import { CartItem, ActiveScreen } from '../types';
import { Button } from './ui/Button';
import { QuantityStepper } from './ui/QuantityStepper';
import { EmptyState } from './ui/EmptyState';
import { Input } from './ui/Input';
import { Trash2, ShoppingBag, ShieldCheck, ArrowRight, Truck, Tag, Check } from 'lucide-react';

interface ShoppingBagScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  appliedPromo: { code: string; discountPercent: number; discountAmount: number } | null;
  onApplyPromo: (code: string) => boolean;
}

export const ShoppingBagScreen: React.FC<ShoppingBagScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  setActiveScreen,
  appliedPromo,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo
    ? appliedPromo.discountPercent > 0
      ? (subtotal * appliedPromo.discountPercent) / 100
      : appliedPromo.discountAmount
    : 0;
  const shipping = subtotal > 0 ? 0 : 0; // Complimentary courier on all fine jewelry
  const estimatedTax = Math.round((subtotal - discount) * 0.0825);
  const orderTotal = Math.max(0, subtotal - discount + shipping + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim());
    if (success) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promotional voucher code. Try "ARCHIVE10" or "TVISAA50".');
      setPromoSuccess(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-stack-lg min-h-[75vh] flex items-center justify-center">
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8 stroke-[1.2]" />}
            title="Your Shopping Bag is Empty"
            description="You have not yet selected any heirloom pieces for acquisition. Browse our catalog of handcrafted solid gold and gemstone creations."
            actionLabel="Discover The Heritage Collection"
            onAction={() => setActiveScreen('collections')}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-stack-lg min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        
        {/* Header */}
        <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
          <div>
            <span className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-secondary font-bold block mb-1">
              Acquisition Dossier
            </span>
            <h1 className="font-display-lg text-3xl sm:text-4xl text-primary font-normal">
              Shopping Bag
            </h1>
          </div>
          <span className="font-body-md text-xs text-on-surface-muted">
            {cart.reduce((cnt, itm) => cnt + itm.quantity, 0)} Selected Pieces
          </span>
        </div>

        {/* Complimentary Shipping Progress Banner */}
        <div className="mb-8 p-4 bg-surface-container-low border border-outline-variant flex items-center gap-3">
          <Truck className="w-5 h-5 text-secondary shrink-0" />
          <div className="flex-1 text-xs font-body-md text-on-surface">
            <span className="font-semibold text-primary">Complimentary Armored Courier: </span>
            Every piece is shipped via insured signature-required delivery in an archival gift case.
          </div>
        </div>

        {/* 2-Column Ledger & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-start">
          
          {/* Left Column: Cart Items (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-outline-variant/60 border-t border-b border-outline-variant/60">
            {cart.map((item) => (
              <article
                key={item.id}
                className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                {/* Image & Description */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 sm:w-24 aspect-[3/4] bg-surface-container overflow-hidden border border-outline-variant shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="font-label-caps text-[9px] uppercase tracking-[0.2em] text-on-surface-muted">
                      {item.product.category}
                    </span>
                    <h3 className="font-headline-sm text-base text-primary font-normal">
                      {item.product.name}
                    </h3>
                    <div className="font-body-md text-xs text-on-surface-variant space-y-0.5 pt-1">
                      <p>Metal: <span className="font-medium text-primary">{item.selectedMaterial || item.product.material}</span></p>
                      {item.selectedChainLength && <p>Length: {item.selectedChainLength}</p>}
                      {item.selectedFinish && <p>Finish: {item.selectedFinish}</p>}
                    </div>
                  </div>
                </div>

                {/* Stepper, Price & Remove Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                  <p className="font-body-lg text-base text-primary font-medium">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(newQty) => onUpdateQuantity(item.id, newQty)}
                      size="sm"
                      min={1}
                      max={10}
                    />

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-on-surface-muted hover:text-error transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-error"
                      aria-label={`Remove ${item.product.name} from bag`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column: Order Summary & Checkout (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant p-6 sm:p-8 space-y-6">
            <h2 className="font-button text-xs uppercase tracking-[0.25em] text-primary font-bold pb-4 border-b border-outline-variant">
              Summary of Acquisition
            </h2>

            {/* Price Calculations Ledger */}
            <div className="space-y-3 font-body-md text-xs sm:text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-primary font-medium">${subtotal.toLocaleString()}</span>
              </div>

              {appliedPromo && discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Promotional Voucher ({appliedPromo.code})</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant">
                <span>Insured Courier Delivery</span>
                <span className="text-primary font-medium">Complimentary</span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Sales Tax</span>
                <span className="text-primary font-medium">${estimatedTax.toLocaleString()}</span>
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-between items-baseline">
                <span className="font-serif text-base text-primary font-medium">Estimated Total</span>
                <span className="font-body-lg text-2xl text-primary font-bold">
                  ${orderTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Voucher Code Form */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <div className="flex items-center gap-2">
                <Input
                  variant="boxed"
                  placeholder="Voucher code (e.g. ARCHIVE10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="text-xs"
                />
                <Button variant="secondary" size="md" type="submit">
                  Apply
                </Button>
              </div>
              {promoError && <p className="text-xs text-error mt-2">{promoError}</p>}
              {promoSuccess && (
                <p className="text-xs text-success mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Voucher applied successfully.
                </p>
              )}
            </form>

            {/* Proceed to Checkout CTA */}
            <div className="pt-4 space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setActiveScreen('checkout')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Checkout
              </Button>

              <button
                type="button"
                onClick={() => setActiveScreen('collections')}
                className="w-full text-center font-button text-[11px] uppercase tracking-widest text-on-surface-muted hover:text-primary transition-colors py-1"
              >
                Continue Browsing Catalog
              </button>
            </div>

            {/* Security Guarantee Note */}
            <div className="pt-4 border-t border-outline-subtle flex items-center gap-2 text-[11px] font-label-caps uppercase text-on-surface-muted justify-center">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>256-Bit Encrypted High-Security Checkout</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
