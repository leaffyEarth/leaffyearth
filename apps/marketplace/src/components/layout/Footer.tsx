"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

const shopLinks: FooterLink[] = [
  { label: 'Plants', href: '/plants' },
  { label: 'Pots & Planters', href: '/planters' },
  { label: 'Plant Care', href: '/plant-care' },
  { label: 'Bulk Orders', href: '/bulk-orders' },
];

const helpLinks: FooterLink[] = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Return Policy', href: '/return-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
];

const aboutLinks: FooterLink[] = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Privacy Policy', href: 'pages/privacy-policy' },
  { label: 'Terms & Conditions', href: 'pages/terms-and-conditions' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/leaffyearth' },
  { icon: Linkedin, href: 'https://linkedin.com/company/leaffyearth' },
  { icon: Twitter, href: 'https://twitter.com/leaffyearth' },
  { icon: Youtube, href: 'https://youtube.com/@leaffyearth' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 pt-24 pb-12 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="block">
              <h3 className="font-heading text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                LeaffyEarth
              </h3>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bringing nature into your space with carefully curated plants 
              and designer pots. Transform your environment with our green companions.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center
                             text-gray-600 hover:text-primary hover:border-primary hover:bg-primary/5 
                             transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Shop Links */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg font-semibold text-gray-900">Shop</h4>
              <ul className="space-y-4">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg font-semibold text-gray-900">Help</h4>
              <ul className="space-y-4">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg font-semibold text-gray-900">About</h4>
              <ul className="space-y-4">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative pt-8 mt-8">
          {/* Decorative line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} LeaffyEarth Pvt Ltd. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link href="/sitemap" className="hover:text-primary transition-colors duration-200">
                Sitemap
              </Link>
              <span>•</span>
              <Link href="/accessibility" className="hover:text-primary transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 