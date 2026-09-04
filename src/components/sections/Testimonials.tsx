"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "OM Construction delivered the NDCT cooling tower civil works at Parli Thermal Power Station exactly on schedule. Their structural precision and site management was commendable. A reliable partner for complex projects.",
    name: "Project Manager",
    company: "Gammon India Ltd.",
    project: "Parli TPS – NDCT Civil Works",
  },
  {
    id: 2,
    quote: "We engaged OM Construction for multiple 400/220 KV gantry foundation projects across Maharashtra. Their technical understanding of high-voltage substation civil requirements and execution quality has been exceptional.",
    name: "Senior Engineer",
    company: "Emco Ltd.",
    project: "EHV Switchyard Foundations",
  },
  {
    id: 3,
    quote: "For our 2×25 MW Solar Power Project at Dhule, OM Construction completed all civil works including switchyard, MCR, and cable trenching in record time. Professional team with strong project controls.",
    name: "Project Director",
    company: "ABB India Ltd.",
    project: "Dhule Solar Power – 50 MW",
  },
  {
    id: 4,
    quote: "OM Construction's ability to execute in parallel streams across TG foundation, boiler base, and ESP foundation works made them stand out as a preferred subcontractor for thermal power construction.",
    name: "Contract Manager",
    company: "Metcon India Pvt. Ltd.",
    project: "Chandrapur TPS – Civil Works",
  },
  {
    id: 5,
    quote: "Their workforce discipline, safety compliance, and quality control systems are among the best we have experienced with mid-size civil contractors in the renewable energy space.",
    name: "Procurement Head",
    company: "KSA Powerinfra",
    project: "Wind Pooling Substation",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);

  return (
    <section id="testimonials" ref={ref} className="relative py-8 bg-brand-charcoal overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-navy-light to-transparent" />

      {/* Large background quote mark */}
      <div className="absolute top-10 right-10 text-brand-navy-light opacity-20 select-none pointer-events-none">
        <Quote className="w-48 h-48" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Client Voices</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-12 max-w-2xl leading-tight"
        >
          What Our Clients <span className="text-brand-orange">Say</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="relative bg-brand-charcoal-light border border-brand-navy-light p-10 overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-gold to-transparent" />

              {/* Quote Mark */}
              <Quote className="w-10 h-10 text-brand-orange/30 mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-xl text-brand-steel-light leading-relaxed italic mb-8">
                    “{testimonials[current].quote}”
                  </p>

                  {/* Attribution */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="font-display font-bold text-white text-base">{testimonials[current].name}</div>
                      <div className="text-brand-gold text-sm font-semibold">{testimonials[current].company}</div>
                      <div className="text-xs text-brand-steel mt-1">{testimonials[current].project}</div>
                    </div>

                    {/* Company Badge */}
                    <div className="px-4 py-2 border border-brand-gold/30 text-xs font-extrabold uppercase tracking-wider text-brand-gold shrink-0">
                      Verified Client
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-brand-navy-light">
                <button
                  onClick={prev}
                  className="p-3 border border-brand-navy-light text-brand-steel hover:border-brand-orange hover:text-white transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-3 border border-brand-navy-light text-brand-steel hover:border-brand-orange hover:text-white transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 transition-all duration-300 ${i === current ? "bg-brand-orange w-6" : "bg-brand-navy-light hover:bg-brand-steel"}`}
                    />
                  ))}
                </div>
                <div className="ml-auto text-xs text-brand-steel">
                  {current + 1} / {testimonials.length}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar: All Testimonials List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrent(idx)}
                className={`text-left p-4 border transition-all duration-300 ${idx === current ? "border-brand-orange bg-brand-charcoal-light shadow-[0_8px_22px_rgba(0,0,0,0.16)]" : "border-brand-navy-light hover:border-brand-steel hover:bg-brand-charcoal/70"}`}
              >
                <div className={`font-display font-bold text-sm mb-1 transition-colors ${idx === current ? "text-brand-orange" : "text-brand-steel-light"}`}>{t.company}</div>
                <div className="text-xs text-brand-steel line-clamp-2">{t.project}</div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
