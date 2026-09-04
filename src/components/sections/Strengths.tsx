"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { strengthData, consultantData } from "@/data/strength";

const categoryColors: Record<string, string> = {
  "Management & Supervision": "text-brand-orange border-brand-orange/30 bg-brand-orange/5",
  "Engineering & Finance": "text-brand-gold border-brand-gold/30 bg-brand-gold/5",
  "Skilled Craft": "text-blue-400 border-blue-400/30 bg-blue-400/5",
  "Labor Force": "text-green-400 border-green-400/30 bg-green-400/5",
};

const totalWorkforce = strengthData.reduce((sum, item) => sum + item.count, 0);

export default function Strengths() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="strength" ref={ref} className="relative py-8 bg-brand-navy-deep overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-8 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Our People</span>
        </motion.div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl text-white max-w-xl leading-tight"
          >
            Company <span className="text-brand-orange">Strength</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start md:items-end"
          >
            <div className="font-display font-black text-5xl text-white flex items-baseline gap-1">
              {inView ? <CountUp end={totalWorkforce} duration={3} /> : "0"}
              <span className="text-brand-orange text-3xl">+</span>
            </div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Total Workforce</div>
          </motion.div>
        </div>

        {/* Strength Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
          {strengthData.map((item, idx) => {
            const colorClass = categoryColors[item.category];
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`relative p-5 bg-brand-charcoal border ${colorClass} hover:scale-105 transition-transform duration-300 group cursor-default`}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1px] bg-current transition-all duration-400" />

                <div className="font-display font-black text-4xl text-white mb-1">
                  {inView ? <CountUp end={item.count} duration={2.5} delay={idx * 0.05} /> : "0"}
                </div>
                <div className="text-xs font-bold text-brand-steel leading-tight">{item.role}</div>
                <div className={`text-[10px] font-extrabold uppercase tracking-wider mt-2 opacity-70`}>
                  {item.category}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Architectural Consultant Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-brand-charcoal border border-brand-gold/20 hover:border-brand-gold/40 transition-colors duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-brand-gold shrink-0" />
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-brand-gold mb-1">{consultantData.role}</div>
              <div className="font-display font-bold text-xl text-white">{consultantData.name}</div>
              <div className="text-sm text-brand-steel">{consultantData.location}</div>
            </div>
          </div>
          <div className="text-xs text-brand-steel border border-brand-navy-light px-4 py-2">
            Strategic Design Partner
          </div>
        </motion.div>
      </div>
    </section>
  );
}
