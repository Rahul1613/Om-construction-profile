"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-800 border-t border-gray-700 py-8">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.1s' }}>
            <div className="font-bold text-white text-lg mb-2">OM CONSTRUCTION</div>
            <div className="text-gray-400 text-sm mb-4">
              Mechanical & Civil Contractor
            </div>
            <div className="text-gray-400 text-xs">
              © {new Date().getFullYear()} OM Construction. All rights reserved.
            </div>
          </div>
          <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
            <div className="font-bold text-white mb-4">Quick Links</div>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 text-sm hover:text-white">Home</Link>
              <Link href="#about" className="block text-gray-400 text-sm hover:text-white">About Us</Link>
              <Link href="#products" className="block text-gray-400 text-sm hover:text-white">Products</Link>
              <Link href="#gallery" className="block text-gray-400 text-sm hover:text-white">Gallery</Link>
              <Link href="#contact" className="block text-gray-400 text-sm hover:text-white">Contact</Link>
            </div>
          </div>
          <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.3s' }}>
            <div className="font-bold text-white mb-4">Contact Info</div>
            <div className="space-y-2 text-gray-400 text-sm">
              <div>Ratnagiri, Maharashtra, India</div>
              <div>+91 9158636465</div>
              <div>omconstruction1716@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
