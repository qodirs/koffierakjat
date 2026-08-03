"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark-card border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="Koffie Rakjat Logo"
                width={40}
                height={40}
                className="rounded-full border border-brand-yellow/20"
              />
              <span className="font-outfit text-lg font-bold tracking-wider text-brand-cream">
                KOFFIE RAKJAT
              </span>
            </div>
            <p className="text-brand-cream/60 text-sm max-w-md leading-relaxed mb-6">
              {t.footerTagline} {t.aboutSubtitle}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-dark-accent rounded-full border border-white/5 hover:border-brand-yellow/30 text-brand-cream/70 hover:text-brand-yellow transition-all duration-200 hover:scale-105"
                aria-label="Instagram Link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-dark-accent rounded-full border border-white/5 hover:border-brand-yellow/30 text-brand-cream/70 hover:text-brand-yellow transition-all duration-200 hover:scale-105"
                aria-label="TikTok Link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
              <a
                href="https://wa.me/6285134516251"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-dark-accent rounded-full border border-white/5 hover:border-brand-yellow/30 text-brand-cream/70 hover:text-brand-yellow transition-all duration-200 hover:scale-105"
                aria-label="WhatsApp Link"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.948h.003c4.368 0 7.927-3.56 7.93-7.928a7.86 7.86 0 0 0-2.326-5.594ZM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.936c-.202-.101-1.202-.593-1.387-.661-.186-.069-.321-.101-.456.101-.135.2-.522.661-.64 1.202-.119.068-.237.101-.439.001-.202-.1-.856-.315-1.63-1.006-.603-.538-1.01-1.205-1.127-1.405-.119-.2-.013-.308.088-.408.09-.09.202-.237.303-.356.101-.119.135-.2.203-.334.067-.135.034-.251-.017-.356-.051-.101-.456-1.097-.625-1.507-.165-.401-.347-.346-.476-.352-.123-.006-.264-.007-.405-.007a.78.78 0 0 0-.568.264c-.19.202-.727.712-.727 1.737s.747 2.02 1.013 2.378c.266.357 1.469 2.244 3.56 3.146.498.215.885.342 1.189.439.501.159.957.137 1.319.083.405-.06 1.202-.492 1.37-.967.168-.475.168-.88.119-.966c-.049-.08-.186-.135-.387-.237Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Sitemap Links */}
          <div>
            <h3 className="font-outfit text-sm font-semibold text-brand-yellow uppercase tracking-wider mb-5">
              Menu
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-brand-cream/65 hover:text-brand-yellow transition-colors duration-150">
                  {t.navHome}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-brand-cream/65 hover:text-brand-yellow transition-colors duration-150">
                  {t.navCatalog}
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-brand-cream/65 hover:text-brand-yellow transition-colors duration-150">
                  {t.navJournal}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-cream/65 hover:text-brand-yellow transition-colors duration-150">
                  {t.navContact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-outfit text-sm font-semibold text-brand-yellow uppercase tracking-wider mb-5">
              Info
            </h3>
            <ul className="space-y-4 text-sm text-brand-cream/65">
              <li>
                <span className="block font-medium text-brand-cream/80">{t.hoursLabel}:</span>
                <span className="block mt-1 font-light text-xs">{t.hoursValue}</span>
              </li>
              <li>
                <span className="block font-medium text-brand-cream/80">{t.addressLabel}:</span>
                <span className="block mt-1 font-light text-xs leading-relaxed">
                  {t.addressValue}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-cream/45">
          <p>&copy; {currentYear} KOFFIE RAKJAT. {t.footerRights}</p>
          <p className="mt-2 md:mt-0 font-light flex items-center gap-1">
            <span>Diseduh dengan ❤️ di Semarang</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
