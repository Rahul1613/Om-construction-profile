"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
      alt: "Construction Site"
    },
    {
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=80",
      alt: "Power Plant"
    },
    {
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
      alt: "Solar Energy"
    },
    {
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&q=80",
      alt: "Wind Energy"
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
      alt: "Industrial Construction"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2" role="navigation" aria-label="Slide navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 text-center z-10">
        <h1 className="font-bold text-4xl md:text-6xl text-white mb-4 animate-fade-in-up">
          OM Construction
        </h1>
        <p className="text-lg md:text-2xl text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Mechanical & Civil Contractor - Established 2000
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="#products"
            className="px-8 py-4 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors text-lg shadow-lg"
          >
            Our Services
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg"
          >
            Contact Us
          </Link>
          <Link
            href="/profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors text-lg shadow-lg"
          >
            Download Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
