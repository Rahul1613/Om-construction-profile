"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const clients = [
  { name: "L&T India", full: "Larsen & Toubro Ltd." },
  { name: "ABB India", full: "ABB India Ltd." },
  { name: "TATA Projects", full: "TATA Projects Ltd." },
  { name: "Gammon India", full: "Gammon India Ltd." },
  { name: "Alstom T&D", full: "Alstom T&D India Ltd." },
  { name: "Emco Ltd.", full: "Emco Ltd." },
  { name: "Sterling & Wilson", full: "Sterling & Wilson Pvt. Ltd." },
  { name: "KSA Powerinfra", full: "KSA Powerinfra Pvt. Ltd." },
  { name: "Gamesa", full: "Gamesa Renewable Energy" },
  { name: "INOX Wind", full: "INOX Wind Ltd." },
  { name: "Metcon India", full: "Metcon India Pvt. Ltd." },
  { name: "MSEB", full: "Maharashtra State Electricity Board" },
];

export default function Clients() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-6 bg-brand-navy-deep border-b border-brand-navy-light overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Trusted By India&apos;s Finest</span>
          <p className="text-brand-steel text-sm mt-2">Corporate Partners & Major Clients</p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-brand-navy-deep to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-brand-navy-deep to-transparent pointer-events-none" />

          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="group inline-flex items-center px-8 py-5 bg-brand-charcoal/90 border border-brand-navy-light hover:border-brand-orange/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 shrink-0 cursor-default"
              >
                <div className="flex flex-col">
                  <span className="font-display font-black text-sm text-white group-hover:text-brand-orange transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-brand-steel mt-0.5 whitespace-nowrap">{client.full}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:grid grid-cols-6 gap-px bg-brand-navy-light mt-12"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="group bg-brand-charcoal/90 hover:bg-brand-charcoal-light p-5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-default shadow-[0_6px_18px_rgba(0,0,0,0.14)]"
            >
              <div className="w-8 h-8 bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-3 group-hover:bg-brand-orange/20 transition-colors">
                <span className="font-display font-black text-[10px] text-brand-orange">{client.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="font-display font-bold text-xs text-white group-hover:text-brand-orange transition-colors">{client.name}</div>
              <div className="text-[9px] text-brand-steel mt-1 leading-tight">{client.full}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
