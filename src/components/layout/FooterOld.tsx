"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-brand-navy-light py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-display font-black text-white text-lg mb-2">OM CONSTRUCTION</div>
            <div className="text-brand-steel-light text-sm mb-4">
              Mechanical & Civil Contractor
            </div>
            <div className="text-brand-steel-light text-xs">
              © {new Date().getFullYear()} OM Construction. All rights reserved.
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-white mb-4">Quick Links</div>
            <div className="space-y-2">
              <Link href="/" className="block text-brand-steel-light text-sm hover:text-brand-orange">Home</Link>
              <Link href="#about" className="block text-brand-steel-light text-sm hover:text-brand-orange">About Us</Link>
              <Link href="#products" className="block text-brand-steel-light text-sm hover:text-brand-orange">Products</Link>
              <Link href="#gallery" className="block text-brand-steel-light text-sm hover:text-brand-orange">Gallery</Link>
              <Link href="#contact" className="block text-brand-steel-light text-sm hover:text-brand-orange">Contact</Link>
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-white mb-4">Contact Info</div>
            <div className="space-y-2 text-brand-steel-light text-sm">
              <div>Ratnagiri, Maharashtra, India</div>
              <div>+91 [Contact Number]</div>
              <div>info@omconstruction.in</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
