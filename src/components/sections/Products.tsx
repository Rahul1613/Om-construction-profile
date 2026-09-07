"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      title: "Power Infrastructure",
      desc: "Thermal Power Plants, NDCT Civil Works, TG Foundations, Boiler Bases, and Structural Steel Erection",
      image: "/images/04_Power Plant Day.png"
    },
    {
      title: "Electrical Substations",
      desc: "400/220 KV GIS Substations, Switchyards, Gantry Foundations, Control Rooms, and Cable Trenches",
      image: "/images/06_220 KV Substation.png"
    },
    {
      title: "Solar Projects",
      desc: "Utility-Scale Solar Parks, Pooling Substations, Inverter Foundations, MCR/ICR Buildings, and Module Support Structures",
      image: "/images/02_Solar Panel Installation.png"
    },
    {
      title: "Wind Energy",
      desc: "Wind Farm Pooling Substations, WTG Foundations, Transformer Pads, and Civil Infrastructure for Renewable Projects",
      image: "/images/06_220 KV Substation.png"
    },
    {
      title: "Industrial Civil Works",
      desc: "Heavy Industrial Foundations, RCC Structures, Plant Roads, Drainage Systems, and Utility Infrastructure",
      image: "/images/03_Industrial Construction.png"
    },
    {
      title: "RCC Structures",
      desc: "Reinforced Concrete Structures for Industrial Plants, Cooling Towers, and Commercial Construction Projects",
      image: "/images/04_Power Plant Day.png"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="products" ref={sectionRef} className="section-padding bg-white">
      <div className="container-width">
        <h2 className={`section-title scroll-animate ${isVisible ? 'visible' : ''}`}>Our Products & Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const delayClass = `delay-${Math.min((index + 1) * 100, 800)}`;
            return (
              <Link 
                key={index} 
                href="#contact"
                className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover-lift scroll-animate cursor-pointer ${isVisible ? 'visible' : ''} ${delayClass}`}
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
