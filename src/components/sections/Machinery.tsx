"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { equipmentData, EquipmentItem } from "@/data/equipment";
import { Search } from "lucide-react";

const categories = ["All", "Heavy Machinery", "Site Logistics", "Power & Electrical", "Metal & Fabrication"] as const;
type Category = typeof categories[number];

const categoryStyles: Record<string, string> = {
  "Heavy Machinery": "text-brand-orange border-brand-orange/40",
  "Site Logistics": "text-blue-400 border-blue-400/40",
  "Power & Electrical": "text-brand-gold border-brand-gold/40",
  "Metal & Fabrication": "text-green-400 border-green-400/40",
};

function EquipmentCard({ item, inView, idx }: { item: EquipmentItem; inView: boolean; idx: number }) {
  const colorStyle = categoryStyles[item.category] || "text-brand-steel border-brand-navy-light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.5) }}
      className="group relative bg-brand-charcoal-light border border-brand-navy-light hover:border-brand-orange/40 transition-all duration-300 overflow-hidden"
    >
      {/* Top hover bar */}
      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-brand-orange transition-all duration-400" />

      <div className="p-6">
        {/* Count Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`inline-flex items-center px-3 py-1 text-xs font-extrabold border ${colorStyle}`}>
            {item.category}
          </div>
          <div className="font-display font-black text-4xl text-white/10 group-hover:text-white/20 transition-colors select-none">
            {item.count}
          </div>
        </div>

        <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-brand-orange transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-xs text-brand-steel leading-relaxed mb-4">{item.description}</p>

        {/* Count display */}
        <div className="flex items-center gap-3 pt-4 border-t border-brand-navy-light">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold">Fleet Size</span>
          <span className="font-display font-black text-2xl text-white">{item.count}</span>
          <span className="text-xs text-brand-steel">units</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Machinery() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = useMemo(() => {
    return equipmentData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section id="machinery" ref={ref} className="relative py-8 bg-brand-charcoal overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-navy-light to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Our Arsenal</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-10 max-w-2xl leading-tight"
        >
          Machinery & <span className="text-brand-orange">Equipment</span>
        </motion.h2>

        {/* Search + Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-steel" />
            <input
              type="text"
              placeholder="Search machinery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-brand-charcoal-light border border-brand-navy-light text-white text-sm placeholder-brand-steel focus:outline-none focus:border-brand-orange transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-orange border-brand-orange text-white"
                    : "bg-transparent border-brand-navy-light text-brand-steel hover:border-brand-steel hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Equipment Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item, idx) => (
              <EquipmentCard key={item.id} item={item} inView={inView} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-brand-steel">
            <Search className="w-12 h-12 mb-4 opacity-30" />
            <p className="font-display font-bold text-lg">No equipment found</p>
            <p className="text-sm mt-2">Try a different search term or category</p>
          </div>
        )}

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-6 text-sm text-brand-steel border-t border-brand-navy-light pt-6"
        >
          <span>Showing <strong className="text-white">{filtered.length}</strong> of <strong className="text-white">{equipmentData.length}</strong> equipment categories</span>
          <span className="text-brand-gold font-bold">All equipment is company-owned and site-deployable within 48 hours.</span>
        </motion.div>
      </div>
    </section>
  );
}
