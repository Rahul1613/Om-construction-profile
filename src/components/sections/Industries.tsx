"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Sun, Wind, Factory, Landmark, ArrowRight } from "lucide-react";

const industries = [
  {
    id: "power",
    icon: Zap,
    title: "Power Plants",
    subtitle: "Thermal & NDCT Engineering",
    desc: "Specialized RCC construction for Natural Draft Cooling Towers (NDCT), TG foundations, boiler bases, ESP foundations, and pump house civil works at large-scale thermal power stations.",
    clients: ["Gammon India", "Metcon India", "Tata Projects"],
    color: "from-orange-900/30 to-transparent",
    accent: "text-brand-orange",
    border: "border-brand-orange/40",
  },
  {
    id: "substation",
    icon: Zap,
    title: "Electrical Substations",
    subtitle: "400KV–765KV Switchyards",
    desc: "End-to-end civil and structural foundations for extra-high voltage substations, gantry structures, cable trenching, and 132/33 KV–400/220 KV pooling substation infrastructure.",
    clients: ["Emco Ltd.", "L&T India", "Alstom T&D"],
    color: "from-yellow-900/30 to-transparent",
    accent: "text-brand-gold",
    border: "border-brand-gold/40",
  },
  {
    id: "solar",
    icon: Sun,
    title: "Solar Parks",
    subtitle: "1 MW – 400 MW Projects",
    desc: "Complete civil works for utility-scale solar power parks including switchyard foundations, MCR & ICR control buildings, inverter room structures, and HT cable trench routing.",
    clients: ["ABB India", "L&T Power", "TATA Int."],
    color: "from-yellow-700/20 to-transparent",
    accent: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  {
    id: "wind",
    icon: Wind,
    title: "Wind Energy",
    subtitle: "Pooling Substation Civil Works",
    desc: "Civil engineering and structural foundations for wind farm pooling substations, control room buildings, and 33/220 KV interconnection infrastructure.",
    clients: ["ABB India", "KSA Powerinfra", "Inox Wind"],
    color: "from-green-900/30 to-transparent",
    accent: "text-green-400",
    border: "border-green-500/30",
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial Plants",
    subtitle: "Heavy Civil & Mechanical",
    desc: "Large-scale industrial foundation engineering for manufacturing facilities, O&M buildings, storm water drainage systems, and structural steel erection works.",
    clients: ["Gamesa Renewable", "Sterling & Wilson", "Various"],
    color: "from-blue-900/30 to-transparent",
    accent: "text-blue-400",
    border: "border-blue-500/30",
  },
  {
    id: "infrastructure",
    icon: Landmark,
    title: "Government & Infrastructure",
    subtitle: "Public Civil Projects",
    desc: "Government infrastructure projects including large drainage systems, structural civil works for state utilities, and foundation engineering for public utility buildings.",
    clients: ["MSEB", "State Utilities", "Government Bodies"],
    color: "from-purple-900/30 to-transparent",
    accent: "text-purple-400",
    border: "border-purple-500/30",
  },
];

export default function Industries() {
  const [active, setActive] = useState("power");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const activeIndustry = industries.find((i) => i.id === active)!;
  const Icon = activeIndustry.icon;

  return (
    <section id="industries" ref={ref} className="relative py-6 bg-brand-charcoal overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-navy-light to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Sectors We Operate In</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-8 max-w-3xl leading-tight"
        >
          Industries We <span className="text-brand-orange">Serve</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Tab List */}
          <div className="lg:col-span-4 flex flex-col">
            {industries.map((ind) => {
              const IndIcon = ind.icon;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind.id)}
                  className={`group flex items-center gap-4 p-5 text-left border-l-2 transition-all duration-300 ${
                    active === ind.id
                      ? `border-brand-orange bg-brand-charcoal-light`
                      : "border-brand-navy-light hover:border-brand-steel hover:bg-brand-charcoal-light/50"
                  }`}
                >
                  <div className={`p-2 border ${active === ind.id ? `${ind.border} ${ind.accent} bg-brand-charcoal` : "border-brand-navy-light text-brand-steel"} transition-all duration-300`}>
                    <IndIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-display font-bold text-sm ${active === ind.id ? "text-white" : "text-brand-steel-light"} transition-colors`}>{ind.title}</div>
                    <div className="text-xs text-brand-steel">{ind.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 relative bg-brand-charcoal-light border border-brand-navy-light p-10 overflow-hidden"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${activeIndustry.color} pointer-events-none`} />
            <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-orange/30" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-brand-gold/20" />

            <div className="relative z-10">
              <div className={`inline-flex p-3 mb-6 border ${activeIndustry.border} bg-brand-charcoal ${activeIndustry.accent}`}>
                <Icon className="w-8 h-8" />
              </div>

              <h3 className="font-display font-black text-3xl text-white mb-2">{activeIndustry.title}</h3>
              <p className={`text-sm font-bold uppercase tracking-wider mb-6 ${activeIndustry.accent}`}>{activeIndustry.subtitle}</p>

              <p className="text-brand-steel-light leading-relaxed text-base mb-8">{activeIndustry.desc}</p>

              <div>
                <div className="text-xs uppercase font-extrabold tracking-widest text-brand-gold mb-3">Key Clients</div>
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.clients.map((c) => (
                    <span key={c} className="px-4 py-1.5 bg-brand-charcoal border border-brand-navy-light text-xs font-bold text-brand-steel-light">{c}</span>
                  ))}
                </div>
              </div>

              <a href="#projects" className="mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-orange hover:text-white transition-colors group">
                View Related Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
