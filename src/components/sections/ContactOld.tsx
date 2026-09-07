"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Registered Office",
    value: "Head Office: 3466/C, Sailakshmi, 15 Maad Kond, Veer Savarkar Marg, Mirya Road, Ratnagiri – 415612",
    sub: "Konkan Region",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 [Contact Number]",
    sub: "Mon–Sat, 9:00 AM – 6:00 PM IST",
    href: "tel:+91",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@omconstruction.in",
    sub: "We respond within 24 hours",
    href: "mailto:info@omconstruction.in",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday – Saturday",
    sub: "9:00 AM – 6:00 PM IST",
  },
];

type FormStatus = "idle" | "success" | "error";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", project: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("success");
    setLoading(false);
    setForm({ name: "", company: "", email: "", phone: "", project: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="relative py-8 bg-brand-navy-deep overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-8 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-[2px] bg-brand-orange" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Get In Touch</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-12 max-w-xl leading-tight"
        >
          Start Your Next <span className="text-brand-orange">Project</span> With Us
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            <p className="text-brand-steel-light text-base leading-relaxed">
              Ready to discuss your infrastructure project? Our team of expert engineers is available to review project requirements, provide technical consultation, and submit competitive proposals.
            </p>

            <div className="flex flex-col gap-5">
              {contactDetails.map((item, idx) => {
                const Icon = item.icon;
                const content = (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-11 h-11 shrink-0 border border-brand-navy-light group-hover:border-brand-orange bg-brand-charcoal flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-extrabold tracking-wider text-brand-gold mb-1">{item.label}</div>
                      <div className="font-bold text-white text-sm">{item.value}</div>
                      <div className="text-xs text-brand-steel">{item.sub}</div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a href={item.href} key={idx}>{content}</a>
                ) : content;
              })}
            </div>

            {/* CTA Banner */}
            <div className="p-6 bg-gradient-to-br from-brand-orange to-brand-gold relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(255,107,0,0.18)]">
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-orange-dark/30 rounded-bl-full" />
              <div className="relative z-10">
                <div className="text-xs uppercase font-extrabold tracking-widest text-white/70 mb-2">Tender Enquiries</div>
                <div className="font-display font-black text-xl text-white mb-2">Submit Your RFQ</div>
                <p className="text-sm text-white/80">We review all project tenders within 48 business hours and provide competitive estimates.</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8"
          >
            <div className="bg-brand-charcoal/95 border border-brand-navy-light/60 relative overflow-hidden shadow-[0_24px_72px_rgba(0,0,0,0.28)] rounded-[32px]">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-gold to-transparent" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-brand-orange/30" />

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 px-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mb-6" />
                  <h3 className="font-display font-black text-2xl text-white mb-3">Message Sent!</h3>
                  <p className="text-brand-steel-light max-w-sm">
                    Thank you for reaching out to OM Construction. Our team will review your enquiry and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-3 bg-brand-orange text-white text-xs font-extrabold uppercase tracking-widest hover:bg-brand-orange-dark transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-brand-gold" htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="px-4 py-3 bg-brand-charcoal-light/90 border border-brand-navy-light text-white text-sm placeholder-brand-steel/70 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all"
                      />
                    </div>
                    {/* Company */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-brand-gold" htmlFor="contact-company">Company / Organization *</label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        className="px-4 py-3 bg-brand-charcoal-light/90 border border-brand-navy-light text-white text-sm placeholder-brand-steel/70 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all"
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-brand-gold" htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="px-4 py-3 bg-brand-charcoal-light/90 border border-brand-navy-light text-white text-sm placeholder-brand-steel/70 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all"
                      />
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-brand-gold" htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="px-4 py-3 bg-brand-charcoal-light/90 border border-brand-navy-light text-white text-sm placeholder-brand-steel/70 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="flex flex-col gap-2 mb-5">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-brand-gold" htmlFor="contact-project">Project Type</label>
                    <select
                      id="contact-project"
                      name="project"
                      value={form.project}
                      onChange={handleChange}
                      className="px-4 py-3 bg-brand-charcoal-light/90 border border-brand-navy-light text-white text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all appearance-none"
                    >
                      <option value="">Select a project category</option>
                      <option>Power Plant / Thermal Infrastructure</option>
                      <option>Electrical Substation / Grid Civil Works</option>
                      <option>Solar Park Development</option>
                      <option>Wind Energy Infrastructure</option>
                      <option>Industrial Civil Construction</option>
                      <option>Heavy Civil / RCC Structures</option>
                      <option>Other / General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2 mb-8">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-brand-gold" htmlFor="contact-message">Project Details / Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your project scope, location, timeline, and any specific requirements..."
                      className="px-4 py-3 bg-brand-charcoal-light/90 border border-brand-navy-light text-white text-sm placeholder-brand-steel/70 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-brand-steel">
                      * Required fields. We respond to all inquiries within 24 business hours.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-3 px-8 py-4 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-extrabold uppercase tracking-widest transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shrink-0 group"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          Submit Enquiry
                        </>
                      )}
                    </button>
                  </div>

                  {status === "error" && (
                    <div className="mt-4 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      An error occurred. Please try again or contact us directly.
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
