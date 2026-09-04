"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Award, FileCheck, HardHat, ClipboardCheck, BarChart3 } from "lucide-react";

const safetyPillars = [
  { icon: ShieldCheck, title: "ISO 9001:2015", desc: "Our entire operation conforms to international quality management standards covering materials, processes, and delivery." },
  { icon: HardHat, title: "Zero Accident Policy", desc: "Site safety briefings, PPE compliance, and incident-free project execution through structured safety protocols." },
  { icon: FileCheck, title: "Quality Assurance", desc: "Material testing, third-party inspections, structural checks, and as-built verification at every stage." },
  { icon: ClipboardCheck, title: "Method Statements", desc: "Detailed work method statements and risk assessments submitted and approved before every major activity." },
  { icon: Award, title: "Engineering Standards", desc: "Full compliance with BIS, CPWD, and international electrical & civil engineering standards on every project." },
  { icon: BarChart3, title: "Progress Monitoring", desc: "Real-time site monitoring dashboards with weekly reporting to all major stakeholders and clients." },
];

const qualityPolicy = [
  "Deliver every project on schedule without compromising structural integrity",
  "Source only certified and tested construction materials",
  "Maintain open communication and documentation with all clients",
  "Conduct regular safety training and upskilling for all site personnel",
  "Implement lessons learned from each project to improve future execution",
];

export default function SafetyQuality() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="safety" ref={ref} className="relative py-6 bg-brand-charcoal overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Standards & Compliance</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-8 max-w-2xl leading-tight"
        >
          Safety, Quality & <span className="text-brand-orange">Compliance</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Pillars Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-navy-light">
              {safetyPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="group bg-brand-charcoal-light p-6 hover:bg-brand-navy-deep transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-brand-orange transition-all duration-400" />
                    <Icon className="w-7 h-7 text-brand-orange mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-display font-bold text-sm text-white mb-2 group-hover:text-brand-orange transition-colors">{pillar.title}</h3>
                    <p className="text-xs text-brand-steel leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Quality Policy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 flex flex-col"
          >
            <div className="bg-brand-charcoal-light border border-brand-gold/20 p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand-orange/30" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand-gold/20" />

              <div className="relative z-10">
                <h3 className="font-display font-black text-xl text-white mb-2">Quality Policy</h3>
                <div className="w-8 h-[2px] bg-brand-orange mb-6" />

                <ul className="flex flex-col gap-4">
                  {qualityPolicy.map((point, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-brand-steel-light leading-relaxed">
                      <div className="mt-1.5 w-2 h-2 bg-brand-orange shrink-0 rotate-45" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-brand-navy-light">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-brand-gold mb-2">Certification</div>
                  <div className="font-display font-black text-2xl text-white">ISO 9001:2015</div>
                  <div className="text-xs text-brand-steel mt-1">Quality Management System</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
