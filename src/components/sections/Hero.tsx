"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      image: "/images/01_TG Deck.png",
      alt: "TG deck construction work"
    },
    {
      image: "/images/04_Power Plant Day.png",
      alt: "Power plant construction"
    },
    {
      image: "/images/02_Solar Panel Installation.png",
      alt: "Solar panel installation"
    },
    {
      image: "/images/06_220 KV Substation.png",
      alt: "Electrical substation construction"
    },
    {
      image: "/images/03_Industrial Construction.png",
      alt: "Industrial construction work"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          return 0;
        }
        return prev + 1.25; // 25ms * 1.25 = ~3.125% per tick, 100% in ~2 seconds
      });
    }, 25);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <section 
      ref={sliderRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 transition-transform duration-[8000ms] ease-out ${
              index === currentSlide ? 'scale-110' : 'scale-100'
            }`}>
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3" role="navigation" aria-label="Slide navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 text-center z-10">
        <h1 className="font-bold text-4xl md:text-6xl text-white mb-4 animate-fade-in-up">
          OM Construction
        </h1>
        <p className="text-lg md:text-2xl text-white mb-8 animate-fade-in-up delay-200">
          Mechanical & Civil Contractor - Established 2000
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-400">
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
