import React, { useState } from 'react';
import { ActiveScreen, User, Product } from '../types';
import { Search, User as UserIcon, ShoppingBag, Menu, Sun, Moon } from 'lucide-react';
import { SearchOverlay } from './ui/SearchOverlay';
import { MobileDrawer } from './ui/MobileDrawer';

interface HeaderProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  cartCount: number;
  user: User | null;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  setActiveScreen,
  cartCount,
  user,
  products,
  onSelectProduct,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-surface-container-low/95 backdrop-blur-md border-b border-outline-variant/40 transition-colors duration-300">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20 grid grid-cols-3 items-center">
          
          {/* Left Column: Desktop Navigation & Mobile Menu Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-primary hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden md:flex items-center gap-8" aria-label="Main desktop navigation">
              <button
                type="button"
                onClick={() => setActiveScreen('collections')}
                className={`font-button text-xs uppercase tracking-[0.2em] transition-colors gold-underline ${
                  activeScreen === 'collections'
                    ? 'text-secondary font-semibold'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                Collections
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen('about')}
                className={`font-button text-xs uppercase tracking-[0.2em] transition-colors gold-underline ${
                  activeScreen === 'about'
                    ? 'text-secondary font-semibold'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                Atelier
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen('contact')}
                className={`font-button text-xs uppercase tracking-[0.2em] transition-colors gold-underline ${
                  activeScreen === 'contact'
                    ? 'text-secondary font-semibold'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                Concierge
              </button>
            </nav>
          </div>

          {/* Center Column: Symmetrically Centered Logo */}
          <div className="flex justify-center text-center">
            <button
              type="button"
              onClick={() => setActiveScreen('home')}
              className="font-display-md text-2xl sm:text-3xl text-primary tracking-widest uppercase transition-opacity hover:opacity-85 focus-visible:outline-none"
              aria-label="Tvisaa Home"
            >
              Tvisaa
            </button>
          </div>

          {/* Right Column: Search, Theme Toggle, Account, Shopping Bag */}
          <div className="flex items-center justify-end gap-3 sm:gap-6">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 text-primary hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-secondary" />}
            </button>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-primary hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-label="Search jewelry catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Account Icon */}
            <button
              type="button"
              onClick={() => setActiveScreen('login')}
              className="p-2 text-primary hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary relative"
              aria-label={user ? `Account: ${user.name}` : 'Login or Create Account'}
              title={user ? user.name : 'Account'}
            >
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {user && (
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full"
                  aria-label="Signed in"
                />
              )}
            </button>

            {/* Shopping Bag Button with Counter */}
            <button
              type="button"
              onClick={() => setActiveScreen('bag')}
              className="p-2 text-primary hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary relative"
              aria-label={`Shopping bag containing ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-on-primary text-[9px] font-button font-bold flex items-center justify-center border border-surface">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Global Interactive Search Modal */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={onSelectProduct}
      />

      {/* Global Interactive Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        cartCount={cartCount}
        user={user}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
    </>
  );
};
