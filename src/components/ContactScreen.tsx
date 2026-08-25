import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Check, Mail, Phone, MapPin, Clock, Sparkles, Send } from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointment' | 'sizer' | 'general'>('appointment');

  // Appointment State
  const [apptName, setApptName] = useState('');
  const [apptEmail, setApptEmail] = useState('');
  const [apptDate, setApptDate] = useState('');
  const [apptType, setApptType] = useState('salon');
  const [apptNotes, setApptNotes] = useState('');
  const [apptSuccess, setApptSuccess] = useState(false);
  const [apptLoading, setApptLoading] = useState(false);

  // Sizer State
  const [sizerName, setSizerName] = useState('');
  const [sizerAddress, setSizerAddress] = useState('');
  const [sizerEmail, setSizerEmail] = useState('');
  const [sizerSuccess, setSizerSuccess] = useState(false);

  const handleApptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptName || !apptEmail) return;
    setApptLoading(true);
    setTimeout(() => {
      setApptLoading(false);
      setApptSuccess(true);
    }, 600);
  };

  const handleSizerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sizerName || !sizerAddress) return;
    setSizerSuccess(true);
  };

  return (
    <div className="pt-24 pb-stack-lg min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-label-caps text-[11px] uppercase tracking-[0.3em] text-secondary font-bold block">
            Atelier Concierge & Salon
          </span>
          <h1 className="font-display-lg text-4xl sm:text-5xl text-primary font-normal">
            Private Consultation
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Connect with our gemologists, master goldsmiths, and private client liaisons for bespoke commissions, custom sizing, or salon appointments.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center border-b border-outline-variant max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('appointment')}
            className={`pb-4 px-6 font-button text-xs uppercase tracking-widest transition-all border-b-2 ${
              activeTab === 'appointment'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-muted hover:text-primary'
            }`}
          >
            Salon Appointment
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sizer')}
            className={`pb-4 px-6 font-button text-xs uppercase tracking-widest transition-all border-b-2 ${
              activeTab === 'sizer'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-muted hover:text-primary'
            }`}
          >
            Ring Sizer Kit
          </button>
        </div>

        {/* 2-Column Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-start">
          
          {/* Left: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-6 sm:p-10">
            {activeTab === 'appointment' ? (
              apptSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-surface-container border border-secondary flex items-center justify-center text-secondary mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display-md text-2xl text-primary font-normal">
                    Viewing Request Received
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    Thank you, {apptName}. A senior concierge will contact you at <strong className="text-primary">{apptEmail}</strong> within four business hours to finalize your salon itinerary.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setApptSuccess(false);
                      setApptName('');
                      setApptEmail('');
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleApptSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-headline-sm text-xl text-primary font-normal mb-1">
                      Reserve a Private Viewing
                    </h3>
                    <p className="font-body-md text-xs text-on-surface-variant">
                      Experience our archival vault in-person or via high-definition digital stream.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      variant="boxed"
                      label="Patron Name"
                      required
                      placeholder="Eleanor Vance"
                      value={apptName}
                      onChange={(e) => setApptName(e.target.value)}
                    />
                    <Input
                      variant="boxed"
                      label="Patron Email"
                      type="email"
                      required
                      placeholder="eleanor@domain.com"
                      value={apptEmail}
                      onChange={(e) => setApptEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      variant="boxed"
                      label="Preferred Date"
                      type="date"
                      value={apptDate}
                      onChange={(e) => setApptDate(e.target.value)}
                    />
                    <div>
                      <label className="block font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface font-medium mb-1.5">
                        Consultation Type
                      </label>
                      <select
                        value={apptType}
                        onChange={(e) => setApptType(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant p-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-primary"
                      >
                        <option value="salon">San Francisco Flagship Salon</option>
                        <option value="digital">Private Video Concierge</option>
                        <option value="bespoke">Bespoke Custom Engagement Commission</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface font-medium mb-1.5">
                      Specific Pieces of Interest / Notes
                    </label>
                    <textarea
                      rows={3}
                      value={apptNotes}
                      onChange={(e) => setApptNotes(e.target.value)}
                      placeholder="E.g., Interested in inspecting the Lumina Solitaire Ring and 18K Solid Gold Cuffs..."
                      className="w-full bg-surface-container-lowest border border-outline-variant p-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={apptLoading}
                    type="submit"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Request Viewing Reservation
                  </Button>
                </form>
              )
            ) : (
              sizerSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-surface-container border border-secondary flex items-center justify-center text-secondary mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display-md text-2xl text-primary font-normal">
                    Ring Sizer Kit Dispatched
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    Your complimentary precision stainless steel ring sizing gauge has been queued for dispatch to <strong className="text-primary">{sizerAddress}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSizerSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-headline-sm text-xl text-primary font-normal mb-1">
                      Request Complimentary Ring Sizer Kit
                    </h3>
                    <p className="font-body-md text-xs text-on-surface-variant">
                      We provide a calibrated European jeweler's sizing mandrel and belt gauge at zero charge.
                    </p>
                  </div>

                  <Input
                    variant="boxed"
                    label="Full Name"
                    required
                    value={sizerName}
                    onChange={(e) => setSizerName(e.target.value)}
                  />

                  <Input
                    variant="boxed"
                    label="Email Address"
                    type="email"
                    required
                    value={sizerEmail}
                    onChange={(e) => setSizerEmail(e.target.value)}
                  />

                  <Input
                    variant="boxed"
                    label="Mailing Address"
                    required
                    placeholder="Street Address, City, State, Postal Code"
                    value={sizerAddress}
                    onChange={(e) => setSizerAddress(e.target.value)}
                  />

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    type="submit"
                  >
                    Dispatch Sizer Kit (Complimentary)
                  </Button>
                </form>
              )
            )}
          </div>

          {/* Right: Atelier Address & Concierge Contacts (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant p-6 sm:p-8 space-y-6">
            <h3 className="font-button text-xs uppercase tracking-[0.25em] text-primary font-bold pb-3 border-b border-outline-variant">
              Atelier Coordinates
            </h3>

            <div className="space-y-5 text-xs sm:text-sm font-body-md">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-primary">San Francisco Flagship Salon</p>
                  <p className="text-on-surface-variant">450 Heritage Way, Suite 800</p>
                  <p className="text-on-surface-variant">San Francisco, CA 94108</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-primary">Salon Hours</p>
                  <p className="text-on-surface-variant">Monday – Saturday: 10:00 AM – 7:00 PM</p>
                  <p className="text-on-surface-variant">Sunday: By Private Invitation Only</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-primary">Direct Concierge Telephone</p>
                  <p className="text-on-surface-variant">+1 (800) 555-8847</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-primary">Electronic Correspondence</p>
                  <p className="text-on-surface-variant">concierge@tvisaa.com</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant">
              <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-muted">
                Private White-Glove Security On-Premises
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
