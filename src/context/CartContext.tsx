"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  id: string; // product.id + '-' + weight
  product: Product;
  weight: '100g' | '200g' | '1kg';
  grindSize: string;
  quantity: number;
  price: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, weight: '100g' | '200g' | '1kg', quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  checkoutWhatsApp: (t: any) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('koffie-rakjat-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('koffie-rakjat-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  const addToCart = (product: Product, weight: '100g' | '200g' | '1kg', quantity = 1) => {
    const id = `${product.id}-${weight}`;
    const price = product.prices[weight];

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { id, product, weight, grindSize: 'Whole Bean', quantity, price }];
    });
    setIsOpen(true); // Open the cart immediately when an item is added
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const checkoutWhatsApp = (t: any) => {
    if (cartItems.length === 0) return;

    // Formatting currency for WA message
    const formattedTotal = formatPrice(cartTotal);

    let message = `*${t.checkoutHeading} - KOFFIE RAKJAT*\n`;
    message += `===============================\n\n`;

    cartItems.forEach((item, index) => {
      const itemSubtotal = formatPrice(item.price * item.quantity);
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Variant: ${item.weight}\n`;
      message += `   - Grind Size: ${item.grindSize}\n`;
      message += `   - Qty: ${item.quantity}x @ ${formatPrice(item.price)}\n`;
      message += `   - Subtotal: ${itemSubtotal}\n\n`;
    });

    message += `===============================\n`;
    message += `*${t.cartTotal}: ${formattedTotal}*\n\n`;
    message += `_(Note: ${t.cartNote})_`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '6285134516251'; // PRD Phone: +62 851-3451-6251
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: mounted ? cartItems : [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: mounted ? cartCount : 0,
        cartTotal: mounted ? cartTotal : 0,
        isOpen,
        setIsOpen,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
