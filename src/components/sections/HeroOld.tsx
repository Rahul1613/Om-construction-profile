"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Phone, Play, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculate years of experience: Founded in 2000, current year is 2026
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - 2000;

  const stats = [
    { value: yearsExperience, suffix: "+", label: "Years of Excellence" },
    { value: 32, suffix: "", label: "Major Projects" },
    { value: 600, suffix: "+", label: "Workforce Strength" },
    { value: 15, suffix: "+", label: "Enterprise Clients" },
  ];

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[55vh] flex items-start justify-center pt-10 pb-4 overflow-hidden bg-brand-navy-deep"
    >
      {/* Background Video/Image Layer */}
      <div className="absolute inset-0 z-0">
        {/* Video Background (Optional - can be enabled by adding video file) */}
        {isPlaying && (
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            {/* Add your video source here */}
            {/* <source src="/videos/hero-video.mp4" type="video/mp4" /> */}
          </video>
        )}

        {/* Fallback Image */}
        {!isPlaying && (
          <Image
            src="/images/hero_construction.jpg"
            alt="OM Construction Industrial Site"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45 transform scale-105"
          />
        )}

        {/* Navy Overlay & Blueprint mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-navy-deep/80 to-brand-navy-deep/50" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-charcoal/90" />
        <div className="absolute inset-0 blueprint-grid opacity-15 animate-blueprint-pulse pointer-events-none" />
      </div>

      {/* Video Controls */}
      <div className="absolute top-24 right-6 z-40 flex gap-2">
        <button
          onClick={toggleVideo}
          className="p-3 bg-brand-charcoal/80 backdrop-blur border border-brand-navy-light text-white hover:border-brand-orange transition-all duration-300"
        >
          <Play className="w-4 h-4" />
        </button>
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-3 bg-brand-charcoal/80 backdrop-blur border border-brand-navy-light text-white hover:border-brand-orange transition-all duration-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Technical Engineering Graphics (Lines) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            x1="5%" y1="15%" x2="95%" y2="15%"
            stroke="#C5A85A" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.line
            x1="10%" y1="15%" x2="10%" y2="85%"
            stroke="#FF6B00" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.line
            x1="5%" y1="85%" x2="95%" y2="85%"
            stroke="#C5A85A" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-brand-navy-deep/80 border border-white/10 rounded-[40px] backdrop-blur-3xl shadow-[0_40px_120px_rgba(0,0,0,0.32)] p-8">
        {/* Left Column: Headline and subtexts */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[2px] bg-brand-orange" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">
              ISO 9001:2015 CERTIFIED EPC CONTRACTOR
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.05] drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          >
            Engineering <br />
            <span className="text-stroke">Tomorrow&apos;s</span> <br />
            <span className="text-brand-orange">Infrastructure</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-steel-light/95 mt-6 leading-relaxed max-w-2xl"
          >
            Over 26 years of engineered execution in power generation systems, extra-high voltage substations, solar parks, wind energy pooling grids, and heavy civil construction.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-brand-orange hover:bg-brand-orange-light text-white text-xs uppercase font-extrabold tracking-widest flex items-center gap-2 transition-all duration-300 group shadow-[0_10px_25px_rgba(255,107,0,0.25)]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-brand-charcoal/40 backdrop-blur-sm border border-brand-steel hover:border-brand-orange hover:bg-brand-orange/10 text-white text-xs uppercase font-extrabold tracking-widest flex items-center gap-2 transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Contact Us</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Mini blueprint decoration panel */}
        <div className="hidden xl:flex xl:col-span-4 justify-end relative h-[460px]">
          <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.24)] overflow-hidden premium-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-transparent to-brand-navy-deep opacity-70" />
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
            <div className="relative z-10 p-8">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-10 h-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">OM</span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Signature</div>
                  <div className="text-sm text-white font-semibold">Premium Project Delivery</div>
                </div>
              </div>
              <div className="space-y-5 mb-8">
                {[
                  "Executive-level coordination",
                  "Elite civil engineering teams",
                  "24/7 safety and quality oversight",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-brand-orange" />
                    <p className="text-sm text-brand-steel-light leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-brand-navy-deep/80 p-5 shadow-[inset_0_0_40px_rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-brand-gold">Quality Standard</div>
                    <div className="text-white font-bold text-lg">ISO 9001:2015</div>
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-brand-orange font-bold">Trusted</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-white/90">
                  <div className="rounded-3xl bg-brand-charcoal/60 p-4">
                    <div className="text-3xl font-black">26</div>
                    <div className="text-[10px] uppercase text-brand-steel-light">Years</div>
                  </div>
                  <div className="rounded-3xl bg-brand-charcoal/60 p-4">
                    <div className="text-3xl font-black">600+</div>
                    <div className="text-[10px] uppercase text-brand-steel-light">Workforce</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Counter Grid */}
    <div className="absolute bottom-0 left-0 w-full bg-brand-charcoal-light/95 border-t border-brand-navy-light py-6 z-30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
            className="flex flex-col items-center md:items-start text-center md:text-left md:border-l border-brand-navy-light md:pl-6 first:border-l-0"
          >
            <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline">
              {inView ? (
                <CountUp end={stat.value} duration={3} delay={0.5} />
              ) : (
                <span>0</span>
              )}
              <span className="text-brand-orange ml-0.5">{stat.suffix}</span>
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold mt-2">
              {stat.label}
            </span>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}
