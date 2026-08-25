import React, { useState, useEffect } from 'react';
import { ActiveScreen, CartItem, Product, User } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CollectionsScreen } from './components/CollectionsScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { ShoppingBagScreen } from './components/ShoppingBagScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { LoginScreen } from './components/LoginScreen';
import { CreateAccountScreen } from './components/CreateAccountScreen';
import { AboutScreen } from './components/AboutScreen';
import { ContactScreen } from './components/ContactScreen';
import { Toast, ToastData } from './components/ui/Toast';
import { Eye, Sun, Moon, Loader2 } from 'lucide-react';

export function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [isSimulatingLoading, setIsSimulatingLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      quantity: 1,
      selectedMaterial: '18K YELLOW GOLD',
      selectedChainLength: '18"',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[0].id]);
  const [user, setUser] = useState<User | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return false;
  });

  // Toast System
  const [toast, setToast] = useState<ToastData | null>(null);

  // Sync dark mode class with HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const showToast = (data: Omit<ToastData, 'id'>) => {
    setToast({
      ...data,
      id: Date.now().toString(),
    });
  };

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    material?: string,
    chainLength?: string,
    finish?: string
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedMaterial === (material || product.material) &&
        item.selectedChainLength === chainLength &&
        item.selectedFinish === finish
    );

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      });
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        selectedMaterial: material || product.material,
        selectedChainLength: chainLength,
        selectedFinish: finish,
      };
      setCart((prev) => [...prev, newItem]);
    }

    showToast({
      type: 'success',
      title: 'Acquisition Added to Bag',
      subtitle: `${product.name} (${quantity}x) added to your shopping dossier.`,
      actionLabel: 'View Bag',
      onAction: () => setActiveScreen('bag'),
    });
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartId));
    showToast({
      type: 'info',
      title: 'Item Removed',
      subtitle: 'Piece removed from shopping bag.',
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlistIds.includes(product.id);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast({
        type: 'info',
        title: 'Removed from Vault',
        subtitle: `${product.name} removed from your saved pieces.`,
      });
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast({
        type: 'success',
        title: 'Saved to Vault',
        subtitle: `${product.name} added to your private wishlist.`,
      });
    }
  };

  // Promo Code Validation
  const handleApplyPromo = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'ARCHIVE10' || formatted === 'TVISAA10') {
      setAppliedPromo({ code: formatted, discountPercent: 10, discountAmount: 0 });
      return true;
    }
    if (formatted === 'TVISAA50' || formatted === 'WELCOME') {
      setAppliedPromo({ code: formatted, discountPercent: 0, discountAmount: 50 });
      return true;
    }
    return false;
  };

  // Screen selection
  const handleSelectProduct = (product: Product) => {
    setIsLoadingScreen(true);
    setSelectedProduct(product);
    setActiveScreen('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsLoadingScreen(false);
    }, 280);
  };

  const handleScreenChange = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentScreenLoading = isLoadingScreen || isSimulatingLoading;

  const totalCartCount = cart.reduce((sum, itm) => sum + itm.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-sans transition-colors duration-300">
      
      {/* 1. Global Navigation Header */}
      <Header
        activeScreen={activeScreen}
        setActiveScreen={handleScreenChange}
        cartCount={totalCartCount}
        user={user}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* 2. Active Screen Renderer */}
      <div className="flex-1">
        {activeScreen === 'home' && (
          <HomeScreen
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            setActiveScreen={handleScreenChange}
            isLoading={isCurrentScreenLoading}
          />
        )}

        {activeScreen === 'collections' && (
          <CollectionsScreen
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            setActiveScreen={handleScreenChange}
            isLoading={isCurrentScreenLoading}
          />
        )}

        {activeScreen === 'product' && (
          <ProductDetailScreen
            product={selectedProduct}
            allProducts={PRODUCTS}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            setActiveScreen={handleScreenChange}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            isLoading={isCurrentScreenLoading}
          />
        )}

        {activeScreen === 'bag' && (
          <ShoppingBagScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            setActiveScreen={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
          />
        )}

        {activeScreen === 'checkout' && (
          <CheckoutScreen
            cart={cart}
            onClearCart={handleClearCart}
            setActiveScreen={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            appliedPromo={appliedPromo}
          />
        )}

        {activeScreen === 'login' && (
          <LoginScreen
            onLogin={setUser}
            setActiveScreen={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            user={user}
            onLogout={() => {
              setUser(null);
              showToast({
                type: 'info',
                title: 'Signed Out',
                subtitle: 'You have been signed out of your patron dossier.',
              });
            }}
          />
        )}

        {activeScreen === 'register' && (
          <CreateAccountScreen
            onLogin={setUser}
            setActiveScreen={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'about' && (
          <AboutScreen
            setActiveScreen={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'contact' && <ContactScreen />}
      </div>

      {/* 3. Global Footer */}
      <Footer
        setActiveScreen={(s) => {
          setActiveScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Global Toast Alert Banner */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* 5. Production Screen Switcher & Token QA Bar */}
      <aside
        aria-label="Design System Screen Navigator"
        className="fixed bottom-4 left-4 z-40 bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant shadow-xl p-2 hidden sm:flex items-center gap-1.5"
      >
        <div className="flex items-center gap-1 px-2 border-r border-outline-variant mr-1">
          <Eye className="w-3.5 h-3.5 text-secondary" />
          <span className="font-label-caps text-[9px] uppercase tracking-widest text-on-surface-muted font-bold">
            Screen:
          </span>
        </div>

        {(
          [
            { id: 'home', label: 'Home' },
            { id: 'collections', label: 'Catalog' },
            { id: 'product', label: 'PDP' },
            { id: 'bag', label: 'Bag' },
            { id: 'checkout', label: 'Checkout' },
            { id: 'login', label: 'Login' },
            { id: 'register', label: 'Register' },
            { id: 'about', label: 'Atelier' },
            { id: 'contact', label: 'Concierge' },
          ] as const
        ).map((scr) => (
          <button
            key={scr.id}
            type="button"
            onClick={() => {
              setActiveScreen(scr.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-2.5 py-1 text-[10px] font-button uppercase tracking-wider transition-colors ${
              activeScreen === scr.id
                ? 'bg-primary text-on-primary font-bold'
                : 'text-primary hover:bg-surface-container'
            }`}
          >
            {scr.label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setIsSimulatingLoading((prev) => !prev)}
          className={`ml-1 px-2 py-1 text-[10px] font-button uppercase tracking-wider border-l border-outline-variant pl-2 flex items-center gap-1 transition-colors ${
            isSimulatingLoading
              ? 'bg-secondary text-on-secondary font-bold'
              : 'text-primary hover:bg-surface-container'
          }`}
          title="Toggle Skeleton Loading State"
          aria-pressed={isSimulatingLoading}
        >
          <Loader2 className={`w-3 h-3 ${isSimulatingLoading ? 'animate-spin' : ''}`} />
          <span>{isSimulatingLoading ? 'Skeletons: ON' : 'Test Skeletons'}</span>
        </button>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="ml-1 p-1 text-primary hover:text-secondary border-l border-outline-variant pl-2"
          aria-label={isDarkMode ? 'Toggle Light' : 'Toggle Dark'}
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-warning" /> : <Moon className="w-3.5 h-3.5 text-secondary" />}
        </button>
      </aside>
    </div>
  );
}
export default App;
