"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      title: "Power Infrastructure",
      desc: "Thermal Power Plants, NDCT Civil Works, TG Foundations, Boiler Bases, and Structural Steel Erection",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80"
    },
    {
      title: "Electrical Substations",
      desc: "400/220 KV GIS Substations, Switchyards, Gantry Foundations, Control Rooms, and Cable Trenches",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80"
    },
    {
      title: "Solar Projects",
      desc: "Utility-Scale Solar Parks, Pooling Substations, Inverter Foundations, MCR/ICR Buildings, and Module Support Structures",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
    },
    {
      title: "Wind Energy",
      desc: "Wind Farm Pooling Substations, WTG Foundations, Transformer Pads, and Civil Infrastructure for Renewable Projects",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80"
    },
    {
      title: "Industrial Civil Works",
      desc: "Heavy Industrial Foundations, RCC Structures, Plant Roads, Drainage Systems, and Utility Infrastructure",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
    },
    {
      title: "RCC Structures",
      desc: "Reinforced Concrete Structures for Industrial Plants, Cooling Towers, and Commercial Construction Projects",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80"
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
        <h2 className={`section-title ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>Our Products & Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div 
              key={index} 
              className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
