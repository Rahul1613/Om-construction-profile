"use client";

import React from "react";

export default function Products() {
  const products = [
    {
      title: "Power Plants",
      desc: "Thermal Power & Natural Draft Cooling Towers (NDCT) RCC engineering",
      icon: "⚡"
    },
    {
      title: "Electrical Substations",
      desc: "400/220 KV pooling substations, switchyards, and gantry foundations",
      icon: "🔌"
    },
    {
      title: "Solar Parks",
      desc: "Solar park construction and civil infrastructure development",
      icon: "☀️"
    },
    {
      title: "Wind Energy",
      desc: "Wind farm infrastructure and pooling substation construction",
      icon: "💨"
    },
    {
      title: "Industrial Civil Works",
      desc: "Heavy industrial foundations, boiler bases, and structural works",
      icon: "🏭"
    },
    {
      title: "RCC Structures",
      desc: "Reinforced concrete structures for industrial and commercial projects",
      icon: "🏗️"
    }
  ];

  return (
    <section id="products" className="py-16 bg-brand-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-black text-3xl text-white mb-6 text-center">Our Products & Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="p-6 bg-brand-charcoal border border-brand-navy-light hover:border-brand-orange transition-colors">
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">{product.title}</h3>
              <p className="text-brand-steel-light text-sm">{product.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
