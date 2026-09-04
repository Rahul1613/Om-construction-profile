"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md" : "bg-white"
    }`}>
      {/* Top Bar */}
      <div className="hidden md:block bg-gray-900 py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center text-xs">
          <div className="flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>+91 9158636465</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span>omconstruction1716@gmail.com</span>
            </div>
          </div>
          <div className="text-gray-300">
            Established 2000 | Ratnagiri, Maharashtra
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-12 md:w-56 md:h-16 shrink-0">
              <Image
                src="/logo.png"
                alt="OM Construction Logo"
                fill
                sizes="(max-width: 768px) 160px, 224px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="px-5 py-2.5 bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
            >
              Enquiry Now
            </Link>
            <Link
              href="/profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border-2 border-orange-600 text-orange-600 text-sm font-semibold hover:bg-orange-50 transition-colors"
            >
              Download Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors border-b border-gray-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center py-3 bg-orange-600 text-white text-sm font-semibold"
            >
              Enquiry Now
            </Link>
            <Link
              href="/profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block mt-2 text-center py-3 border-2 border-orange-600 text-orange-600 text-sm font-semibold"
            >
              Download Profile
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 9158636465</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>omconstruction1716@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
