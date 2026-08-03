"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark overflow-x-hidden">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs font-bold text-brand-yellow tracking-widest uppercase block animate-slide-up">
            FIND US
          </span>
          <h1 className="font-cormorant text-3xl sm:text-5xl font-extrabold text-white leading-tight animate-slide-up">
            {t.contactTitle}
          </h1>
          <p className="text-brand-cream/65 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {t.contactSubtitle}
          </p>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section className="py-16 sm:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Store Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Hours */}
              <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-yellow/15 border border-brand-yellow/20 rounded-lg text-brand-yellow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <h3 className="font-cormorant text-lg font-bold text-white leading-tight">{t.hoursLabel}</h3>
                </div>
                <p className="text-brand-cream/70 text-sm font-light pl-11">
                  {t.hoursValue}
                </p>
              </div>

              {/* Card 2: Address */}
              <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-yellow/15 border border-brand-yellow/20 rounded-lg text-brand-yellow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </span>
                  <h3 className="font-cormorant text-lg font-bold text-white leading-tight">{t.addressLabel}</h3>
                </div>
                <p className="text-brand-cream/70 text-sm font-light leading-relaxed pl-11">
                  {t.addressValue}
                </p>
              </div>

              {/* Card 3: Social Media */}
              <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-yellow/15 border border-brand-yellow/20 rounded-lg text-brand-yellow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                  </span>
                  <h3 className="font-cormorant text-lg font-bold text-white leading-tight">{t.socialsLabel}</h3>
                </div>
                
                <div className="flex flex-col gap-2 pl-11">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-brand-cream/70 hover:text-brand-yellow transition-colors duration-150"
                  >
                    <span>Instagram KOFFIE RAKJAT</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-brand-cream/70 hover:text-brand-yellow transition-colors duration-150"
                  >
                    <span>TikTok KOFFIE RAKJAT</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Google Maps Embed iframe */}
            <div className="lg:col-span-7 w-full space-y-4">
              <div className="glass-container p-3 rounded-3xl border border-white/5 shadow-xl w-full h-[450px] relative overflow-hidden">
                {/* Responsive Iframe */}
                <iframe
                  title="Koffie Rakjat Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9575836417726!2d110.46820549999999!3d-7.0142831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708dd83080ee09%3A0xc0fb13bb4f849cf1!2sJl.%20Fatmawati%20No.87%2C%20Pedurungan%20Kidul%2C%20Kec.%20Pedurungan%2C%20Kota%20Semarang%2C%20Jawa%20Tengah%2050246!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1.25rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="bg-brand-dark-accent"
                />
              </div>
              
              <div className="flex justify-end">
                <a
                  href="https://maps.google.com/?q=Jl.+Fatmawati+No.87,+Pedurungan+Kidul,+Kec.+Pedurungan,+Kota+Semarang,+Jawa+Tengah+50246"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-extrabold px-6 py-3 rounded-full text-xs transition-colors duration-150 inline-flex items-center gap-1.5 shadow-md"
                >
                  <span>{t.mapsButton}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
