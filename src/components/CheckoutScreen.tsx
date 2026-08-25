import React, { useState } from 'react';
import { CartItem, ActiveScreen, CheckoutFormState } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { RadioCardGroup } from './ui/RadioCard';
import { Check, ShieldCheck, ArrowLeft, Lock, Truck, CreditCard, Sparkles, Building } from 'lucide-react';

interface CheckoutScreenProps {
  cart: CartItem[];
  onClearCart: () => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  appliedPromo: { code: string; discountPercent: number; discountAmount: number } | null;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  onClearCart,
  setActiveScreen,
  appliedPromo,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<CheckoutFormState>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    shippingMethod: 'complimentary',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    billingSameAsShipping: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo
    ? appliedPromo.discountPercent > 0
      ? (subtotal * appliedPromo.discountPercent) / 100
      : appliedPromo.discountAmount
    : 0;
  const shippingCost = formData.shippingMethod === 'overnight' ? 85 : 0;
  const estimatedTax = Math.round((subtotal - discount) * 0.0825);
  const orderTotal = Math.max(0, subtotal - discount + shippingCost + estimatedTax);

  const handleInputChange = (field: keyof CheckoutFormState, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) {
      errs.email = 'A valid email address is required for dispatch certificates.';
    }
    if (!formData.phone || formData.phone.length < 8) {
      errs.phone = 'Phone number is required for courier delivery coordination.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!formData.address.trim()) errs.address = 'Delivery street address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.state.trim()) errs.state = 'State / Province is required.';
    if (!formData.zipCode.trim()) errs.zipCode = 'Postal code is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 15) {
        errs.cardNumber = 'Valid 16-digit card number required.';
      }
      if (!formData.cardExpiry || !formData.cardExpiry.includes('/')) {
        errs.cardExpiry = 'MM/YY required.';
      }
      if (!formData.cardCvc || formData.cardCvc.length < 3) {
        errs.cardCvc = '3-4 digit CVC required.';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handlePlaceOrder = () => {
    if (!validateStep4()) return;

    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      const generatedOrder = `TV-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsCompleted(true);
      onClearCart();
    }, 1800);
  };

  if (isCompleted) {
    return (
      <div className="pt-28 pb-stack-lg min-h-[80vh] flex items-center justify-center">
        <main className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop w-full text-center">
          <div className="p-8 sm:p-12 border border-outline-variant bg-surface-container-lowest space-y-6">
            <div className="w-16 h-16 bg-surface-container border border-secondary flex items-center justify-center text-secondary mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="font-label-caps text-[11px] uppercase tracking-[0.3em] text-secondary font-bold block">
              Order Authorized & Sealed
            </span>

            <h1 className="font-display-lg text-3xl sm:text-4xl text-primary font-normal">
              Thank You for Your Patronage
            </h1>

            <div className="py-4 border-y border-outline-variant bg-surface-container-low/50">
              <p className="font-label-caps text-[11px] uppercase tracking-widest text-on-surface-muted">
                Dossier Tracking Number
              </p>
              <p className="font-body-lg text-xl text-primary font-bold tracking-wider mt-1">
                {orderNumber}
              </p>
            </div>

            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
              We have dispatched a formal confirmation and certificate of authenticity to{' '}
              <strong className="text-primary">{formData.email || 'your email'}</strong>. Our master artisans are preparing your presentation case for signature courier.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setActiveScreen('home')}
              >
                Return to Storefront
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setActiveScreen('collections')}
              >
                Explore More Collections
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-stack-lg min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        
        {/* Top return link & header */}
        <div className="pb-6 border-b border-outline-variant mb-8 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setActiveScreen('bag')}
            className="inline-flex items-center gap-2 font-button text-xs uppercase tracking-[0.2em] text-primary hover:text-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping Bag</span>
          </button>
          <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-muted flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-secondary" /> Encrypted Checkout
          </span>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-10 text-center font-label-caps text-[10px] uppercase tracking-wider">
          {[
            { num: 1, label: 'Patron Info' },
            { num: 2, label: 'Shipping Address' },
            { num: 3, label: 'Courier Method' },
            { num: 4, label: 'Payment' },
          ].map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div
                key={s.num}
                className={`pb-3 border-b-2 transition-all ${
                  isCurrent
                    ? 'border-primary text-primary font-bold'
                    : isDone
                    ? 'border-secondary text-secondary'
                    : 'border-outline-variant text-on-surface-muted'
                }`}
              >
                <span>{s.num}. {s.label}</span>
              </div>
            );
          })}
        </div>

        {/* 2-Column Form & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-start">
          
          {/* Form Columns (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-6 sm:p-8 space-y-8">
            
            {/* Step 1: Patron Contact */}
            {step === 1 && (
              <section className="space-y-6 animate-fadeIn">
                <h2 className="font-headline-sm text-2xl text-primary font-normal">
                  1. Patron Contact Dossier
                </h2>
                <p className="font-body-md text-xs text-on-surface-variant">
                  We require your direct contact credentials to deliver real-time dispatch updates and diamond certifications.
                </p>

                <div className="space-y-4 pt-2">
                  <Input
                    variant="boxed"
                    label="Email Address"
                    type="email"
                    required
                    placeholder="patron@domain.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                  />

                  <Input
                    variant="boxed"
                    label="Mobile Phone (for Armored Courier Coordination)"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={errors.phone}
                    helperText="Required by courier for delivery signature verification."
                  />
                </div>

                <div className="pt-4">
                  <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
                    Continue to Shipping Address
                  </Button>
                </div>
              </section>
            )}

            {/* Step 2: Insured Delivery Address */}
            {step === 2 && (
              <section className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline-sm text-2xl text-primary font-normal">
                    2. Insured Shipping Address
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-label-caps uppercase text-secondary hover:underline"
                  >
                    Edit Contact
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    variant="boxed"
                    label="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={errors.firstName}
                  />
                  <Input
                    variant="boxed"
                    label="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={errors.lastName}
                  />
                </div>

                <Input
                  variant="boxed"
                  label="Street Address"
                  required
                  placeholder="123 Luxury Way"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={errors.address}
                />

                <Input
                  variant="boxed"
                  label="Apartment, Suite, Unit (Optional)"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    variant="boxed"
                    label="City"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    error={errors.city}
                  />
                  <Input
                    variant="boxed"
                    label="State / Region"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    error={errors.state}
                  />
                  <Input
                    variant="boxed"
                    label="Postal Code"
                    required
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    error={errors.zipCode}
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <Button variant="secondary" size="lg" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
                    Continue to Courier Selection
                  </Button>
                </div>
              </section>
            )}

            {/* Step 3: Courier Selection */}
            {step === 3 && (
              <section className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline-sm text-2xl text-primary font-normal">
                    3. Delivery Courier Method
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-label-caps uppercase text-secondary hover:underline"
                  >
                    Edit Address
                  </button>
                </div>

                <RadioCardGroup
                  name="shippingMethod"
                  selectedValue={formData.shippingMethod}
                  onChange={(val) => handleInputChange('shippingMethod', val)}
                  options={[
                    {
                      id: 'complimentary',
                      title: 'Insured Armored Ground Courier',
                      description: '2–4 Business Days. Signature verification and tamper-proof archival box included.',
                      priceBadge: 'Complimentary ($0.00)',
                      badge: 'Standard',
                    },
                    {
                      id: 'overnight',
                      title: 'Priority Overnight Armored Transport',
                      description: 'Next Business Morning. Direct bespoke transport with dedicated courier agent.',
                      priceBadge: '$85.00',
                      badge: 'Expedited',
                    },
                  ]}
                />

                <div className="pt-4 flex gap-4">
                  <Button variant="secondary" size="lg" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
                    Continue to Payment Instrument
                  </Button>
                </div>
              </section>
            )}

            {/* Step 4: Payment Instrument */}
            {step === 4 && (
              <section className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline-sm text-2xl text-primary font-normal">
                    4. Payment Instrument
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs font-label-caps uppercase text-secondary hover:underline"
                  >
                    Edit Method
                  </button>
                </div>

                <RadioCardGroup
                  name="paymentMethod"
                  selectedValue={formData.paymentMethod}
                  onChange={(val) => handleInputChange('paymentMethod', val)}
                  options={[
                    {
                      id: 'credit_card',
                      title: 'Credit / Debit Card',
                      description: 'Visa, Mastercard, American Express, Diners Club',
                      badge: 'Instant',
                    },
                    {
                      id: 'wire_transfer',
                      title: 'Direct Atelier Wire Transfer',
                      description: 'Reserved for acquisitions above $5,000. Instructions issued upon placement.',
                    },
                  ]}
                />

                {formData.paymentMethod === 'credit_card' && (
                  <div className="p-4 border border-outline-variant bg-surface-container-low space-y-4">
                    <Input
                      variant="boxed"
                      label="Card Number"
                      placeholder="4532 •••• •••• 8892"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      error={errors.cardNumber}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        variant="boxed"
                        label="Expiration (MM/YY)"
                        placeholder="12/28"
                        required
                        value={formData.cardExpiry}
                        onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        error={errors.cardExpiry}
                      />
                      <Input
                        variant="boxed"
                        label="CVC / CVV"
                        placeholder="849"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                        error={errors.cardCvc}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 flex gap-4">
                  <Button variant="secondary" size="lg" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isAuthorizing}
                    onClick={handlePlaceOrder}
                  >
                    Authorize Acquisition • ${orderTotal.toLocaleString()}
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Order Summary Ledger (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant p-6 sm:p-8 space-y-6">
            <h3 className="font-button text-xs uppercase tracking-[0.25em] text-primary font-bold pb-3 border-b border-outline-variant">
              In Your Bag ({cart.length})
            </h3>

            <div className="divide-y divide-outline-variant/60 max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover bg-surface-container border border-outline-variant shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-headline-sm text-xs text-primary truncate">{item.product.name}</p>
                    <p className="font-body-md text-[11px] text-on-surface-muted">
                      Qty: {item.quantity} • {item.selectedMaterial || item.product.material}
                    </p>
                  </div>
                  <span className="font-body-md text-xs font-medium text-primary">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-outline-variant space-y-2 text-xs font-body-md">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-primary font-medium">${subtotal.toLocaleString()}</span>
              </div>
              {appliedPromo && discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Voucher Discount</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Courier Transport</span>
                <span className="text-primary font-medium">
                  {formData.shippingMethod === 'overnight' ? '$85.00' : 'Complimentary'}
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Sales Tax</span>
                <span className="text-primary font-medium">${estimatedTax.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-outline-variant flex justify-between items-baseline">
                <span className="font-serif text-sm text-primary font-bold">Total Valuation</span>
                <span className="font-body-lg text-xl text-primary font-bold">
                  ${orderTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 border border-outline-subtle bg-surface-container text-[11px] font-label-caps text-on-surface-muted uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span>Complimentary Returns Within 30 Days</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
