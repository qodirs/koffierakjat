"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [selectedWeight, setSelectedWeight] = useState<'100g' | '200g' | '1kg'>('100g');

  const activePrice = product.prices[selectedWeight];

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handleAdd = () => {
    addToCart(product, selectedWeight, 1);
  };

  return (
    <div className="glass-card flex flex-col h-full rounded-2xl overflow-hidden group">
      {/* Visual Header / Thumbnail */}
      <div className="relative h-44 bg-brand-dark-accent flex items-center justify-between overflow-hidden">
        {/* Glowing circle background for visual aesthetic */}
        <div className="absolute inset-0 bg-radial from-brand-yellow/5 to-transparent pointer-events-none" />

        {/* Coffee Bag Mockup Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-w-7xl) 33vw, 100vw"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isLimited && (
            <span className="bg-brand-red text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
              {t.limitedBadge}
            </span>
          )}
          {product.isPreOrder && (
            <span className="bg-brand-yellow text-brand-dark text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
              {t.preOrderBadge}
            </span>
          )}
        </div>

        {/* Roast Level Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/5 border border-white/10 text-brand-cream/80 text-[10px] font-medium px-2 py-0.5 rounded-full">
            {product.roastLevel} Roast
          </span>
        </div>
      </div>

      {/* Info & Configurations */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Name & Origin */}
        <div className="mb-3">
          <h3 className="font-cormorant text-xl font-bold text-brand-cream group-hover:text-brand-yellow transition-colors duration-200 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-brand-cream/55 font-light mt-0.5">{product.origin}</p>
        </div>

        {/* Description */}
        <p className="text-xs text-brand-cream/70 font-light leading-relaxed mb-4 flex-1 line-clamp-3">
          {useLanguage().language === 'id' ? product.description.id : product.description.en}
        </p>

        {/* Taste Notes */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5 mt-1">
            {product.tasteNotes.map((note) => (
              <span
                key={note}
                className="bg-brand-dark-accent border border-white/5 text-brand-cream/75 text-[10px] px-2.5 py-0.5 rounded-full"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Configurations: Weight */}
        <div className="mb-5 space-y-2">
          <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
            {t.weightLabel}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['100g', '200g', '1kg'] as const).map((weight) => (
              <button
                key={weight}
                type="button"
                onClick={() => setSelectedWeight(weight)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedWeight === weight
                    ? 'bg-brand-yellow border-brand-yellow text-brand-dark'
                    : 'border-white/10 text-brand-cream/75 hover:border-brand-yellow/30'
                }`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        {/* Configurations: Grind Size (Whole Bean static display) */}
        <div className="mb-5 p-2.5 bg-brand-dark-accent border border-white/5 rounded-lg text-[10px]">
          <span className="font-semibold text-brand-cream/80 block uppercase tracking-wide mb-0.5">
            {t.grindLabel}
          </span>
          <span className="text-brand-yellow font-bold">{t.grindWhole}</span>
          <span className="text-brand-cream/40 block mt-0.5 leading-snug">{t.grindWholeNote}</span>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-brand-cream/45">Price</span>
            <span className="font-cormorant text-lg font-bold text-brand-yellow">
              {formatPrice(activePrice)}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-brand-red/10 cursor-pointer"
          >
            <span>{t.addToCart}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
