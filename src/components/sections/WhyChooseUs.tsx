"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Clock, Award, Users, Wrench, CheckCircle2, Star, HeartHandshake } from "lucide-react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const reasons = [
  { icon: ShieldCheck, title: "ISO 9001:2015 Certified", desc: "Our quality management systems comply with the highest international engineering standards.", color: "text-brand-orange" },
  { icon: Clock, title: "On-Time Delivery", desc: "Rigorous project scheduling and milestone tracking ensures we never miss a deadline.", color: "text-brand-gold" },
  { icon: Award, title: "26+ Years of Excellence", desc: "A proven track record built across power plants, substations, solar parks, and civil infrastructure.", color: "text-blue-400" },
  { icon: Users, title: "600+ Skilled Workforce", desc: "A disciplined, trained, and safety-compliant workforce from engineers to skilled laborers.", color: "text-green-400" },
  { icon: Wrench, title: "Advanced Equipment Fleet", desc: "20 categories of heavy machinery and fabrication tools ensuring self-sufficient site execution.", color: "text-brand-orange" },
  { icon: CheckCircle2, title: "Zero Compromise Quality", desc: "Strict material standards, structural inspections, and quality assurance at every construction stage.", color: "text-brand-gold" },
  { icon: Star, title: "Trusted by Industry Giants", desc: "Preferred EPC partner for L&T, ABB India, TATA Projects, Gammon, Alstom, and more.", color: "text-yellow-400" },
  { icon: HeartHandshake, title: "Client-First Philosophy", desc: "We treat every project as a long-term relationship, not just a contract.", color: "text-pink-400" },
];

export default function WhyChooseUs() {
  const [, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const gsapRef = useGSAPAnimations();

  return (
    <section id="why-us" ref={gsapRef} className="relative py-6 bg-brand-navy-deep overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-8 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Our Advantage</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-8 max-w-2xl leading-tight"
        >
          Why India&apos;s Top Firms <span className="text-brand-orange">Choose Us</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-navy-light">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group relative bg-brand-navy-deep p-8 hover:bg-brand-charcoal-light transition-all duration-400 overflow-hidden cursor-default"
              >
                {/* Hover top accent line */}
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-brand-orange transition-all duration-400" />

                {/* Corner decoration */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-brand-navy-light group-hover:border-brand-orange/40 transition-colors duration-300" />

                <div className={`mb-5 ${r.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-3 group-hover:text-brand-orange transition-colors duration-300">{r.title}</h3>
                <p className="text-xs text-brand-steel leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
