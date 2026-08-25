import React, { useEffect } from 'react';
import { ActiveScreen, User } from '../../types';
import { X, Moon, Sun, ShoppingBag, User as UserIcon, Gem, Sparkles } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  cartCount: number;
  user: User | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeScreen,
  setActiveScreen,
  cartCount,
  user,
  isDarkMode,
  onToggleDarkMode,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateTo = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    onClose();
  };

  const navLinks: { label: string; screen: ActiveScreen; count?: number }[] = [
    { label: 'Storefront', screen: 'home' },
    { label: 'The Heritage Collection', screen: 'collections' },
    { label: 'Shopping Bag', screen: 'bag', count: cartCount },
    { label: 'Atelier Manifesto', screen: 'about' },
    { label: 'Salon Concierge', screen: 'contact' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex justify-start animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      onClick={onClose}
    >
      <div
        className="w-4/5 max-w-sm h-full bg-surface-container-lowest border-r border-outline-variant p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-outline-variant">
            <span className="font-display-md text-xl text-primary tracking-widest uppercase">
              Tvisaa
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-on-surface-muted hover:text-on-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 flex flex-col space-y-4" aria-label="Mobile main navigation">
            {navLinks.map((link) => {
              const isActive = activeScreen === link.screen;
              return (
                <button
                  key={link.screen}
                  type="button"
                  onClick={() => navigateTo(link.screen)}
                  className={`w-full py-3 px-3 text-left font-button text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-between border-l-2 ${
                    isActive
                      ? 'border-secondary bg-surface-container text-primary font-bold'
                      : 'border-transparent text-on-surface hover:border-outline-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-on-primary text-[10px] font-medium">
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Account Section */}
          <div className="mt-8 pt-6 border-t border-outline-subtle space-y-3">
            <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-on-surface-muted font-bold block px-3">
              Client Dossier
            </span>
            {user ? (
              <div className="px-3 py-2 bg-surface-container border border-outline-subtle flex items-center justify-between">
                <div>
                  <p className="font-body-md text-xs font-medium text-primary">{user.name}</p>
                  <p className="font-body-md text-[11px] text-on-surface-muted">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('login')}
                  className="text-[10px] font-button uppercase text-secondary hover:underline"
                >
                  Switch
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-3">
                <button
                  type="button"
                  onClick={() => navigateTo('login')}
                  className="py-2.5 px-3 border border-outline-variant text-[10px] font-button uppercase tracking-wider text-primary hover:bg-surface-container text-center"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('register')}
                  className="py-2.5 px-3 bg-primary text-on-primary text-[10px] font-button uppercase tracking-wider text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer controls: Dark mode & guarantee */}
        <div className="pt-6 border-t border-outline-variant space-y-4">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="w-full py-3 px-3 border border-outline-variant flex items-center justify-between font-button text-xs uppercase tracking-widest text-primary hover:bg-surface-container transition-colors"
          >
            <span className="flex items-center gap-2">
              {isDarkMode ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-secondary" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </span>
            <span className="text-[10px] text-on-surface-muted">
              {isDarkMode ? 'Ivory' : 'Charcoal'}
            </span>
          </button>

          <p className="text-center font-label-caps text-[9px] uppercase tracking-widest text-on-surface-muted">
            © 2024 Tvisaa. Handcrafted Excellence.
          </p>
        </div>
      </div>
    </div>
  );
};
