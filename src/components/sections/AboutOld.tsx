"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Eye, TrendingUp } from "lucide-react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const timelineEvents = [
  { year: "2000", title: "Foundation", desc: "OM Construction incorporated in Ratnagiri, Maharashtra, starting with civil and mechanical contracting." },
  { year: "2005", title: "Industrial Expansion", desc: "Secured first major power plant project with Gammon India Ltd. for NDCT cooling tower civil works at Parli." },
  { year: "2008", title: "Mechanical Contracting", desc: "Expanded into TG Foundation, Boiler Base, and ESP Foundation works for thermal power stations." },
  { year: "2012", title: "Grid Infrastructure", desc: "Delivered multiple 400/220 KV gantry and substation foundations for Emco Ltd. and L&T across Maharashtra." },
  { year: "2015", title: "Renewable Energy Pivot", desc: "Entered the solar sector with ABB India for 2×25 MW Solar Power Projects at Dhule, Maharashtra." },
  { year: "2017", title: "Pan-India Footprint", desc: "Executed major solar and wind pooling substation projects across Maharashtra, Karnataka, and Madhya Pradesh." },
  { year: "2019", title: "Scaling 400+ MW", desc: "Delivered civil works for 400 MW Byagwat (Raichur) and Acme Bidar solar projects for ABB India." },
  { year: "2026", title: "Today", desc: "26 years of engineering excellence, 600+ workforce, and a growing portfolio across power, solar, and heavy civil sectors." },
];

export default function About() {
  const [, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const gsapRef = useGSAPAnimations();

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  };

  return (
    <section id="about" ref={gsapRef} className="relative py-6 bg-brand-charcoal overflow-hidden">
      {/* Top Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-navy-light to-transparent" />
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          custom={0} variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Our Story</span>
        </motion.div>

        {/* Section Header */}
        <motion.h2
          custom={1} variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="font-display font-black text-4xl md:text-5xl text-white mb-8 max-w-2xl leading-tight gsap-fade-up"
        >
          Built on a Foundation of <span className="text-brand-orange">26 Years</span> of Trust
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Image + Core Values */}
          <motion.div
            custom={2} variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="relative h-[420px] overflow-hidden">
              <Image
                src="/images/about_construction.jpg"
                alt="OM Construction site leadership"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              {/* Overlay accents */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs uppercase font-extrabold tracking-widest text-brand-gold mb-1">Established</div>
                <div className="font-display font-black text-5xl text-white">2000</div>
                <div className="text-sm text-brand-steel-light mt-1">Ratnagiri, Maharashtra</div>
              </div>
              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-brand-orange/60" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-brand-gold/40" />
            </div>

            {/* Three Values */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Target, label: "Mission", text: "Deliver world-class civil and mechanical solutions with precision engineering." },
                { icon: Eye, label: "Vision", text: "Become India's most trusted mid-size EPC contractor by 2030." },
                { icon: TrendingUp, label: "Growth", text: "Expanding across renewable energy, grid infrastructure, and industrial construction." },
              ].map(({ icon: Icon, label, text }) => (
                <div key={label} className="p-4 bg-brand-charcoal-light border border-brand-navy-light hover:border-brand-orange/40 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-brand-orange mb-2" />
                  <div className="text-xs uppercase font-extrabold tracking-wider text-brand-gold mb-1">{label}</div>
                  <p className="text-xs text-brand-steel leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Company Story + Timeline */}
          <motion.div
            custom={3} variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            {/* Story Text */}
            <div className="space-y-5 text-brand-steel-light leading-relaxed text-base">
              <p>
                <span className="text-white font-bold">OM Construction</span> was established in the year 2000 by a team of dedicated civil and mechanical engineers committed to delivering precision-built infrastructure across India. From our headquarters in Ratnagiri, Maharashtra, we have grown to become a trusted EPC partner for India&apos;s leading engineering conglomerates.
              </p>
              <p>
                Over 26 years, we have successfully delivered large-scale projects spanning natural draft cooling towers at thermal power plants, extra-high voltage 400/765 KV switchyard civil foundations, solar park installations across Karnataka and Maharashtra, wind energy pooling substations in Madhya Pradesh, and complex industrial infrastructure.
              </p>
              <p>
                Our clients include globally recognized names such as <span className="text-brand-gold font-semibold">L&T, ABB India, TATA Projects, Gammon India, Alstom, Emco, Sterling & Wilson</span>, and many more—all trusting OM Construction to deliver on time, within budget, and to the highest safety standards.
              </p>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-brand-orange" />
                Corporate Journey
              </h3>
              <div className="relative flex flex-col gap-0">
                {/* Vertical Line */}
                <div className="absolute left-[70px] top-0 bottom-0 w-[1px] bg-brand-navy-light" />

                {timelineEvents.map((event, idx) => (
                  <motion.div
                    key={event.year}
                    custom={idx * 0.5}
                    variants={fadeIn}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="flex gap-6 items-start pb-6 last:pb-0 group"
                  >
                    {/* Year Label */}
                    <div className="w-[60px] shrink-0 text-right">
                      <span className={`font-display font-bold text-sm ${event.year === "2026" ? "text-brand-orange" : "text-brand-steel"} group-hover:text-brand-gold transition-colors`}>
                        {event.year}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="relative mt-1 shrink-0">
                      <div className={`w-3 h-3 rounded-full border-2 ${event.year === "2026" ? "bg-brand-orange border-brand-orange" : "bg-brand-charcoal border-brand-navy-light group-hover:border-brand-orange"} transition-colors z-10 relative`} />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col pb-2">
                      <h4 className="font-display font-bold text-sm text-white mb-1 group-hover:text-brand-orange transition-colors">{event.title}</h4>
                      <p className="text-xs text-brand-steel leading-relaxed">{event.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
