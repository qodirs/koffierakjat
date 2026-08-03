"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductContext';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/data/products';
import Image from 'next/image';

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetCatalog } = useProducts();
  const { language, t } = useLanguage();
  
  // Modal / Form state
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Form fields
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [category, setCategory] = useState<'filter' | 'espresso'>('filter');
  const [roastLevel, setRoastLevel] = useState<'Light' | 'Medium' | 'Dark'>('Medium');
  const [tasteNotes, setTasteNotes] = useState('');
  const [descriptionId, setDescriptionId] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [price100g, setPrice100g] = useState<number>(0);
  const [price200g, setPrice200g] = useState<number>(0);
  const [price1kg, setPrice1kg] = useState<number>(0);
  const [isLimited, setIsLimited] = useState(false);
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setOrigin('');
    setCategory('filter');
    setRoastLevel('Medium');
    setTasteNotes('');
    setDescriptionId('');
    setDescriptionEn('');
    setPrice100g(45000);
    setPrice200g(85000);
    setPrice1kg(350000);
    setIsLimited(false);
    setIsPreOrder(false);
    setImageUrl('');
    setIsOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setOrigin(product.origin);
    setCategory(product.category);
    setRoastLevel(product.roastLevel);
    setTasteNotes(product.tasteNotes.join(', '));
    setDescriptionId(product.description.id);
    setDescriptionEn(product.description.en);
    setPrice100g(product.prices['100g']);
    setPrice200g(product.prices['200g']);
    setPrice1kg(product.prices['1kg']);
    setIsLimited(product.isLimited || false);
    setIsPreOrder(product.isPreOrder || false);
    setImageUrl(product.imageUrl);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Default image if not set
    const finalImageUrl = imageUrl.trim() || 
      (category === 'espresso' 
        ? '/images/coffee-pack-espresso.jpg' 
        : '/images/coffee-pack-filter.jpg');

    const productData = {
      name: name.trim(),
      origin: origin.trim(),
      category,
      roastLevel,
      tasteNotes: tasteNotes.split(',').map(note => note.trim()).filter(note => note.length > 0),
      description: {
        id: descriptionId.trim(),
        en: descriptionEn.trim() || descriptionId.trim()
      },
      prices: {
        '100g': Number(price100g),
        '200g': Number(price200g),
        '1kg': Number(price1kg)
      },
      isLimited,
      isPreOrder,
      imageUrl: finalImageUrl
    };

    if (editingProduct) {
      updateProduct({
        ...productData,
        id: editingProduct.id
      });
    } else {
      addProduct(productData);
    }

    setIsOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress image as jpeg (0.75 quality) to keep localStorage small
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        setImageUrl(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'id' ? 'Apakah Anda yakin ingin menghapus produk ini?' : 'Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-yellow"></div>
      </div>
    );
  }

  // Helper Stats calculations
  const totalProducts = products.length;
  const filterCount = products.filter(p => p.category === 'filter').length;
  const espressoCount = products.filter(p => p.category === 'espresso').length;
  const preOrderCount = products.filter(p => p.isPreOrder).length;

  return (
    <>
      <Navbar />
      
      <main className="flex-1 bg-brand-dark pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-8 mb-8">
            <div>
              <h1 className="font-outfit text-3xl font-extrabold text-white">
                {language === 'id' ? 'Dashboard Admin CMS' : 'Admin CMS Dashboard'}
              </h1>
              <p className="text-sm text-brand-cream/60 mt-1 font-light">
                {language === 'id' 
                  ? 'Kelola katalog biji kopi specialty Anda untuk sinkronisasi instan ke etalase.'
                  : 'Manage your specialty coffee beans catalog for instant storefront synchronization.'}
              </p>
            </div>
            
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={resetCatalog}
                className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-brand-cream text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer"
              >
                {language === 'id' ? 'Reset Katalog Default' : 'Reset Default Catalog'}
              </button>
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-brand-red/10 cursor-pointer flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>{language === 'id' ? 'Tambah Kopi' : 'Add Coffee'}</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] font-semibold text-brand-cream/40 uppercase tracking-wider block">Total Products</span>
              <span className="text-3xl font-bold text-white block">{totalProducts}</span>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] font-semibold text-brand-cream/40 uppercase tracking-wider block">Filter Coffee</span>
              <span className="text-3xl font-bold text-brand-yellow block">{filterCount}</span>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] font-semibold text-brand-cream/40 uppercase tracking-wider block">Espresso Coffee</span>
              <span className="text-3xl font-bold text-brand-yellow block">{espressoCount}</span>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] font-semibold text-brand-cream/40 uppercase tracking-wider block">Pre-Order / Limited</span>
              <span className="text-3xl font-bold text-brand-red block">{preOrderCount}</span>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-brand-dark-card border border-white/5 rounded-2xl overflow-hidden">
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-brand-dark-accent text-[10px] font-bold text-brand-yellow uppercase tracking-wider">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Origin / Roast</th>
                    <th className="py-4 px-6">Prices (100g / 200g / 1kg)</th>
                    <th className="py-4 px-6">Taste Notes</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-brand-cream/40 font-light">
                        {language === 'id' ? 'Tidak ada produk kopi tersedia.' : 'No coffee products available.'}
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-white/[0.02] transition-colors duration-150">
                        {/* Title & Category */}
                        <td className="py-4 px-6 flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg bg-brand-dark border border-white/10 overflow-hidden flex-shrink-0">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-brand-cream block leading-tight">{product.name}</span>
                            <span className="inline-block bg-white/5 text-[9px] font-medium text-brand-yellow border border-brand-yellow/10 rounded px-1.5 py-0.5 mt-1 uppercase tracking-wide">
                              {product.category}
                            </span>
                            {product.isLimited && (
                              <span className="ml-2 inline-block bg-brand-red/10 text-[9px] font-semibold text-brand-red border border-brand-red/20 rounded px-1.5 py-0.5 uppercase tracking-wide">
                                Limited
                              </span>
                            )}
                          </div>
                        </td>
                        {/* Origin & Roast */}
                        <td className="py-4 px-6">
                          <span className="text-brand-cream/80 block">{product.origin}</span>
                          <span className="text-xs text-brand-cream/45 block mt-0.5">{product.roastLevel} Roast</span>
                        </td>
                        {/* Prices */}
                        <td className="py-4 px-6">
                          <div className="text-xs space-y-0.5">
                            <div className="flex gap-2">
                              <span className="text-brand-cream/40 w-10">100g:</span>
                              <span className="text-brand-cream/80 font-semibold">{formatPrice(product.prices['100g'])}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-brand-cream/40 w-10">200g:</span>
                              <span className="text-brand-cream/80 font-semibold">{formatPrice(product.prices['200g'])}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-brand-cream/40 w-10">1kg:</span>
                              <span className="text-brand-cream/80 font-semibold">{formatPrice(product.prices['1kg'])}</span>
                            </div>
                          </div>
                        </td>
                        {/* Taste Notes */}
                        <td className="py-4 px-6 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {product.tasteNotes.map((note) => (
                              <span key={note} className="bg-brand-dark text-brand-cream/70 text-[9px] px-2 py-0.5 rounded border border-white/5">
                                {note}
                              </span>
                            ))}
                          </div>
                        </td>
                        {/* Action buttons */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-2.5 bg-white/5 border border-white/10 hover:border-brand-yellow/30 text-brand-cream hover:text-brand-yellow rounded-lg transition-colors cursor-pointer"
                              aria-label="Edit Product"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2.5 bg-brand-red/10 border border-brand-red/20 hover:border-brand-red text-brand-red rounded-lg transition-colors cursor-pointer"
                              aria-label="Delete Product"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile List Card View */}
            <div className="block md:hidden divide-y divide-white/5">
              {products.length === 0 ? (
                <div className="py-12 text-center text-brand-cream/40 font-light">
                  {language === 'id' ? 'Tidak ada produk kopi tersedia.' : 'No coffee products available.'}
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="p-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-brand-dark border border-white/10 overflow-hidden flex-shrink-0">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-brand-cream truncate leading-tight">{product.name}</h4>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="bg-white/5 text-[8px] font-semibold text-brand-yellow border border-brand-yellow/10 rounded px-1.5 py-0.5 uppercase">
                            {product.category}
                          </span>
                          {product.isLimited && (
                            <span className="bg-brand-red/10 text-[8px] font-semibold text-brand-red border border-brand-red/20 rounded px-1.5 py-0.5 uppercase">
                              Limited
                            </span>
                          )}
                          {product.isPreOrder && (
                            <span className="bg-brand-yellow/10 text-[8px] font-semibold text-brand-yellow border border-brand-yellow/20 rounded px-1.5 py-0.5 uppercase">
                              Pre-Order
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs bg-brand-dark-accent p-3 rounded-lg border border-white/5">
                      <div>
                        <span className="text-brand-cream/40 block text-[9px] uppercase tracking-wider">Origin & Roast</span>
                        <span className="text-brand-cream/80 block mt-0.5">{product.origin}</span>
                        <span className="text-brand-cream/60 block">{product.roastLevel} Roast</span>
                      </div>
                      <div>
                        <span className="text-brand-cream/40 block text-[9px] uppercase tracking-wider">Prices</span>
                        <span className="text-brand-cream/80 block mt-0.5 font-semibold">100g: {formatPrice(product.prices['100g'])}</span>
                        <span className="text-brand-cream/80 block font-semibold">200g: {formatPrice(product.prices['200g'])}</span>
                        <span className="text-brand-cream/80 block font-semibold">1kg: {formatPrice(product.prices['1kg'])}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {product.tasteNotes.slice(0, 3).map((note) => (
                          <span key={note} className="bg-brand-dark text-brand-cream/60 text-[9px] px-2 py-0.5 rounded border border-white/5">
                            {note}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-3 bg-white/5 border border-white/10 hover:border-brand-yellow/30 text-brand-cream hover:text-brand-yellow rounded-lg transition-colors cursor-pointer"
                          aria-label="Edit Product"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-3 bg-brand-red/10 border border-brand-red/20 hover:border-brand-red text-brand-red rounded-lg transition-colors cursor-pointer"
                          aria-label="Delete Product"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Slide-over / Modal Form (Add & Edit) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop Scrim */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-2xl bg-brand-dark-card border border-white/10 p-6 text-left shadow-2xl transition-all w-full max-w-xl animate-slide-up">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <h3 className="font-outfit text-2xl font-bold text-white">
                  {editingProduct 
                    ? (language === 'id' ? 'Edit Detail Kopi' : 'Edit Coffee Details') 
                    : (language === 'id' ? 'Tambah Kopi Baru' : 'Add New Coffee')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-brand-cream/50 hover:text-white cursor-pointer"
                  aria-label="Close Modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                    {language === 'id' ? 'Nama Kopi' : 'Coffee Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none placeholder-white/20"
                    placeholder="e.g. Arabica Gayo Atu Lintang"
                  />
                </div>

                {/* Origin */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                    {language === 'id' ? 'Asal / Origin' : 'Origin / Location'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none placeholder-white/20"
                    placeholder="e.g. Aceh Tengah, Sumatera, 1400-1600 masl"
                  />
                </div>

                {/* Category & Roast level */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as 'filter' | 'espresso')}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none cursor-pointer"
                    >
                      <option value="filter">Filter Coffee</option>
                      <option value="espresso">Espresso Coffee</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                      Roast Level *
                    </label>
                    <select
                      value={roastLevel}
                      onChange={(e) => setRoastLevel(e.target.value as 'Light' | 'Medium' | 'Dark')}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none cursor-pointer"
                    >
                      <option value="Light">Light Roast</option>
                      <option value="Medium">Medium Roast</option>
                      <option value="Dark">Dark Roast</option>
                    </select>
                  </div>
                </div>

                {/* Prices (100g, 200g, 1kg) */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-semibold text-brand-yellow uppercase tracking-wider block">
                      Price 100g (IDR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={price100g}
                      onChange={(e) => setPrice100g(Number(e.target.value))}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-semibold text-brand-yellow uppercase tracking-wider block">
                      Price 200g (IDR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={price200g}
                      onChange={(e) => setPrice200g(Number(e.target.value))}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-semibold text-brand-yellow uppercase tracking-wider block">
                      Price 1kg (IDR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={price1kg}
                      onChange={(e) => setPrice1kg(Number(e.target.value))}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none"
                    />
                  </div>
                </div>

                {/* Taste Notes */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                    {language === 'id' ? 'Catatan Rasa / Taste Notes' : 'Taste Notes'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={tasteNotes}
                    onChange={(e) => setTasteNotes(e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none placeholder-white/20"
                    placeholder="e.g. Orange, Caramel, Milk Chocolate (comma separated)"
                  />
                </div>

                {/* Description ID */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                    Description (Indonesian) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={descriptionId}
                    onChange={(e) => setDescriptionId(e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none placeholder-white/20 resize-none"
                    placeholder="Deskripsi kopi dalam Bahasa Indonesia"
                  />
                </div>

                {/* Description EN */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                    Description (English - Optional, fallback to ID)
                  </label>
                  <textarea
                    rows={2}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:border-brand-yellow focus:outline-none placeholder-white/20 resize-none"
                    placeholder="Coffee description in English"
                  />
                </div>

                {/* Image URL & Status Checkboxes */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider block">
                      {language === 'id' ? 'Foto Produk (Upload)' : 'Product Image (Upload)'}
                    </label>
                    
                    {!imageUrl ? (
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-4 bg-brand-dark hover:border-brand-yellow/30 transition-all group relative min-h-24">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-6 h-6 text-brand-cream/40 group-hover:text-brand-yellow transition-colors mb-2 pointer-events-none">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-brand-cream/60 group-hover:text-brand-cream transition-colors font-medium pointer-events-none">
                          {language === 'id' ? 'Pilih foto biji kopi' : 'Choose coffee photo'}
                        </span>
                        <span className="text-[9px] text-brand-cream/35 mt-0.5 pointer-events-none">
                          PNG, JPG (auto-compressed to keep storage light)
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 bg-brand-dark border border-white/10 rounded-xl p-3">
                        <div className="relative w-14 h-14 bg-brand-dark-accent rounded-lg border border-white/5 overflow-hidden flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt="Upload Preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-bold text-brand-yellow block uppercase">Active Image</span>
                          <span className="text-[10px] text-brand-cream/50 block truncate mt-0.5">
                            {imageUrl.startsWith('data:') ? 'Custom Compressed Image' : imageUrl}
                          </span>
                        </div>
                        <div className="relative overflow-hidden">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <button
                            type="button"
                            className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-brand-yellow/30 text-[10px] font-bold rounded text-brand-cream hover:text-brand-yellow transition-colors cursor-pointer"
                          >
                            {language === 'id' ? 'Ganti Foto' : 'Change Photo'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 text-xs text-brand-cream/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isLimited}
                        onChange={(e) => setIsLimited(e.target.checked)}
                        className="rounded border-white/10 bg-brand-dark text-brand-red focus:ring-brand-red cursor-pointer w-4 h-4"
                      />
                      <span>Limited Edition</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-brand-cream/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPreOrder}
                        onChange={(e) => setIsPreOrder(e.target.checked)}
                        className="rounded border-white/10 bg-brand-dark text-brand-yellow focus:ring-brand-yellow cursor-pointer w-4 h-4"
                      />
                      <span>Pre-Order</span>
                    </label>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-brand-cream text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand-yellow text-brand-dark hover:bg-brand-yellow-hover text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
