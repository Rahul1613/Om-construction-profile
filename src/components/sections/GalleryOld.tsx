"use client";

import React from "react";

export default function Gallery() {
  const projects = [
    { name: "Parli Thermal Power Station", client: "Gammon India" },
    { name: "Dhule Solar Power Project", client: "ABB India" },
    { name: "Chandrapur TPS Civil Works", client: "Metcon India" },
    { name: "Wind Pooling Substation", client: "KSA Powerinfra" },
    { name: "Byagwat Solar Project", client: "ABB India" },
    { name: "Acme Bidar Solar Project", client: "ABB India" }
  ];

  return (
    <section id="gallery" className="py-16 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-black text-3xl text-white mb-6 text-center">Project Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="aspect-video bg-brand-navy-deep border border-brand-navy-light flex items-center justify-center">
              <div className="text-center p-4">
                <h3 className="font-display font-bold text-lg text-white mb-2">{project.name}</h3>
                <p className="text-brand-steel-light text-sm">{project.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
