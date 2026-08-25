export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Necklaces' | 'Earrings' | 'Rings' | 'Bracelets';
  price: number;
  originalPrice?: number;
  material: string;
  subMaterial: string;
  materialsAvailable: string[];
  chainLengths?: string[];
  finishes?: string[];
  tag?: 'New' | 'Best Seller' | 'Limited Edition' | 'Artisan Exclusive';
  images: string[];
  description: string;
  details: string[];
  craftsmanship: string;
  careAndRepair: string;
  shipping: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId?: string;
  product: Product;
  quantity: number;
  selectedMaterial: string;
  selectedChainLength?: string;
  selectedFinish?: string;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export type ActiveScreen = 
  | 'home'
  | 'collections'
  | 'product'
  | 'product-detail'
  | 'bag'
  | 'checkout'
  | 'login'
  | 'register'
  | 'order-success'
  | 'about'
  | 'contact';

export interface FilterOptions {
  category: string;
  material: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest';
  viewMode: 'grid' | 'list';
}

export interface CheckoutFormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  shippingMethod: string;
  paymentMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  billingSameAsShipping: boolean;
}
