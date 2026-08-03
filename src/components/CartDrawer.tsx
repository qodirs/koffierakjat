"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export const CartDrawer: React.FC = () => {
  const { cartItems, isOpen, setIsOpen, updateQuantity, removeFromCart, cartTotal, checkoutWhatsApp } = useCart();
  const { t } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-full sm:max-w-md glass-cart shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-yellow">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <h2 className="font-outfit text-lg font-bold tracking-wide text-brand-cream">{t.cartTitle}</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-brand-cream/60 hover:text-brand-cream hover:bg-white/5 rounded-full transition-all duration-200"
            aria-label="Close Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-between text-center pt-20">
              <div className="bg-brand-dark-accent p-6 rounded-full border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-brand-cream/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <p className="text-brand-cream/50 text-sm font-light mt-4">{t.cartEmpty}</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Mock Image Placeholder using Brand colors since real images don't exist yet */}
                  <div className="relative w-16 h-16 rounded-lg bg-brand-dark-accent border border-white/10 flex items-center justify-between flex-shrink-0">
                    <span className="text-[10px] text-brand-yellow font-bold text-center w-full uppercase">{item.weight}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-outfit text-sm font-bold text-brand-cream truncate pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-brand-cream/40 hover:text-brand-red p-1 transition-colors duration-150"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-brand-cream/60 mt-0.5">
                      {item.grindSize} | {item.weight}
                    </p>
                    
                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-white/10 rounded-full bg-brand-dark overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-brand-cream/60 hover:text-brand-cream hover:bg-white/5 transition-all duration-150"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-brand-cream w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-brand-cream/60 hover:text-brand-cream hover:bg-white/5 transition-all duration-150"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Price */}
                      <span className="font-outfit text-sm font-bold text-brand-yellow">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-brand-dark-card space-y-4">
            <div className="flex justify-between items-center text-brand-cream">
              <span className="text-sm font-light">{t.cartTotal}</span>
              <span className="font-outfit text-xl font-extrabold text-brand-yellow">
                {formatPrice(cartTotal)}
              </span>
            </div>
            
            <p className="text-[10px] text-brand-cream/55 leading-relaxed font-light">
              {t.cartNote}
            </p>

            <button
              onClick={() => checkoutWhatsApp(t)}
              className="w-full flex items-center justify-between bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-extrabold px-6 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-brand-yellow/10"
            >
              <span>{t.checkoutBtn}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default CartDrawer;
