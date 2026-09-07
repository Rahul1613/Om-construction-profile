"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const stats = [
  { value: 26, suffix: "+", label: "Years of Excellence", sub: "Established 2000" },
  { value: 32, suffix: "+", label: "Major Projects", sub: "Across 5 States" },
  { value: 600, suffix: "+", label: "Skilled Workforce", sub: "Engineers to Laborers" },
  { value: 4000, suffix: " MW+", label: "Power Capacity Served", sub: "Thermal & Renewable" },
  { value: 20, suffix: "+", label: "Equipment Categories", sub: "Company-Owned Fleet" },
  { value: 100, suffix: "%", label: "ISO 9001:2015", sub: "Quality Certified" },
];

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-10 bg-brand-orange overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white/10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-white/10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col items-center text-center px-6 py-4 group"
            >
              <div className="font-display font-black text-3xl xl:text-4xl text-white flex items-baseline gap-0.5">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} delay={idx * 0.1} separator="," />
                ) : "0"}
                <span className="text-white/80 text-xl">{stat.suffix}</span>
              </div>
              <div className="font-bold text-white text-xs mt-1 leading-tight">{stat.label}</div>
              <div className="text-white/60 text-[10px] mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
