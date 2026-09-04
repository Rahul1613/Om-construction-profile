"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ClipboardList, Compass, HardHat, Search, CheckSquare, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Planning",
    desc: "Detailed project planning, feasibility studies, resource allocation, material procurement strategy, and timeline definition.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Engineering",
    desc: "Structural design review, method statement preparation, shop drawing preparation, and technical analysis of project scope.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Execution",
    desc: "Mobilization of workforce and machinery. Structured site execution following approved drawings and safety protocols.",
  },
  {
    number: "04",
    icon: Search,
    title: "Inspection",
    desc: "Third-party inspections, structural checks, material testing, and compliance verification at each phase milestone.",
  },
  {
    number: "05",
    icon: CheckSquare,
    title: "Quality Testing",
    desc: "Concrete cube tests, load testing, weld inspection, and final dimensional verification against approved engineering drawings.",
  },
  {
    number: "06",
    icon: Truck,
    title: "Delivery",
    desc: "Handover of as-built documentation, completion certificates, punch-list closure, and formal client acceptance.",
  },
];

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="process" ref={ref} className="relative py-8 bg-brand-navy-deep overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-8 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-navy-light to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">How We Work</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-12 max-w-2xl leading-tight"
        >
          Our Execution <span className="text-brand-orange">Process</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[1px] bg-brand-navy-light" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Icon Circle */}
                  <div className="relative mb-8">
                    <div className="w-[104px] h-[104px] bg-brand-charcoal border-2 border-brand-navy-light group-hover:border-brand-orange transition-colors duration-300 flex flex-col items-center justify-center relative z-10">
                      <Icon className="w-6 h-6 text-brand-orange mb-1" />
                      <span className="font-display font-black text-xs text-brand-gold">{step.number}</span>
                      {/* Corner decorations */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-brand-orange/30 group-hover:border-brand-orange/60 transition-colors" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-brand-gold/20 group-hover:border-brand-gold/40 transition-colors" />
                    </div>
                    {/* Connector arrow - hidden on last item */}
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[calc(100%+16px)] text-brand-navy-light text-xs">
                        ↓
                      </div>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-white text-sm mb-3 group-hover:text-brand-orange transition-colors">{step.title}</h3>
                  <p className="text-xs text-brand-steel leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
