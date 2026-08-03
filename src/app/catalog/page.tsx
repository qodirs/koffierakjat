"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';

type CategoryFilter = 'all' | 'filter' | 'espresso';

export default function CatalogPage() {
  const { t } = useLanguage();
  const { products } = useProducts();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.category.toLowerCase() === activeFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark overflow-x-hidden">
      <Navbar />
      <CartDrawer />

      {/* Catalog Header */}
      <section className="relative py-16 sm:py-24 border-b border-white/5 overflow-hidden">
        {/* Glow Backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-bold text-brand-yellow tracking-widest uppercase block animate-slide-up">
            KOFFIE RAKJAT SELECTION
          </span>
          <h1 className="font-cormorant text-3xl sm:text-5xl font-extrabold text-white leading-tight animate-slide-up">
            {t.catalogTitle}
          </h1>
          <p className="text-brand-cream/65 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {t.catalogSubtitle}
          </p>
        </div>
      </section>

      {/* Filter Tabs Section */}
      <section className="py-8 bg-brand-dark-card border-b border-white/5 sticky top-20 z-30 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-brand-dark border border-white/5 rounded-full">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-brand-yellow text-brand-dark'
                  : 'text-brand-cream/70 hover:text-brand-cream'
              }`}
            >
              {t.categoryAll}
            </button>
            <button
              onClick={() => setActiveFilter('filter')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === 'filter'
                  ? 'bg-brand-yellow text-brand-dark'
                  : 'text-brand-cream/70 hover:text-brand-cream'
              }`}
            >
              {t.categoryFilter}
            </button>
            <button
              onClick={() => setActiveFilter('espresso')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === 'espresso'
                  ? 'bg-brand-yellow text-brand-dark'
                  : 'text-brand-cream/70 hover:text-brand-cream'
              }`}
            >
              {t.categoryEspresso}
            </button>
          </div>
        </div>
      </section>

      {/* Grid Display Section */}
      <section className="py-16 sm:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-brand-cream/50">
              <p className="text-sm font-light">Tidak ada kopi dalam kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
