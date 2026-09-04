"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projectsData, ProjectItem } from "@/data/projects";
import { Search, X, MapPin, User, Calendar, Tag, CheckCircle, Clock } from "lucide-react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const categories = ["All", "Power Infrastructure", "Solar Projects", "Renewable Energy", "Industrial Civil Works", "Electrical Substations"] as const;
type Category = typeof categories[number];

const categoryColors: Record<string, string> = {
  "Power Infrastructure": "text-brand-orange bg-brand-orange/10 border-brand-orange/30",
  "Solar Projects": "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  "Renewable Energy": "text-green-400 bg-green-400/10 border-green-400/30",
  "Industrial Civil Works": "text-blue-400 bg-blue-400/10 border-blue-400/30",
  "Electrical Substations": "text-brand-gold bg-brand-gold/10 border-brand-gold/30",
};

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const catColor = categoryColors[project.category] || "text-white";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-brand-navy-deep border border-brand-navy-light overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-brand-steel hover:text-white hover:bg-brand-charcoal transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {/* Category Badge */}
            <span className={`inline-flex px-3 py-1 text-xs font-extrabold border ${catColor} mb-4`}>
              {project.category}
            </span>

            {/* Title */}
            <h3 className="font-display font-black text-2xl text-white mb-6 pr-8 leading-snug">{project.name}</h3>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex gap-3 items-start">
                <User className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-brand-steel uppercase font-bold tracking-wider">Client</div>
                  <div className="text-sm text-white font-semibold">{project.client}</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-brand-steel uppercase font-bold tracking-wider">Location</div>
                  <div className="text-sm text-white font-semibold">{project.location}</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Calendar className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-brand-steel uppercase font-bold tracking-wider">Duration</div>
                  <div className="text-sm text-white font-semibold">{project.duration}</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Tag className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-brand-steel uppercase font-bold tracking-wider">Status</div>
                  <div className={`text-sm font-bold flex items-center gap-1.5 ${project.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
                    {project.status === "Completed" ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {project.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Scope */}
            <div className="p-5 bg-brand-charcoal border border-brand-navy-light">
              <div className="text-xs text-brand-gold uppercase font-extrabold tracking-wider mb-3">Project Scope</div>
              <p className="text-sm text-brand-steel-light leading-relaxed">{project.scope}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const gsapRef = useGSAPAnimations();

  const filtered = useMemo(() => {
    return projectsData.filter((p) => {
      const matchSearch = search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <>
      <section id="projects" ref={gsapRef} className="relative py-6 bg-brand-navy-deep overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-8 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[2px] bg-brand-orange" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">Portfolio</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-5xl text-white leading-tight max-w-xl"
            >
              Featured <span className="text-brand-orange">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm text-brand-steel max-w-xs"
            >
              {projectsData.length} industrial projects across 5 states in India. Click any card to view full case study details.
            </motion.p>
          </div>

          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-steel" />
              <input
                type="text"
                placeholder="Search projects, clients, locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-charcoal/90 border border-brand-navy-light text-white text-sm placeholder-brand-steel/70 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/40 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider border transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-brand-orange border-brand-orange text-white"
                      : "bg-transparent border-brand-navy-light text-brand-steel hover:border-brand-steel hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Masonry Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gsap-stagger">
              {filtered.map((project, idx) => {
                const catColor = categoryColors[project.category] || "text-white border-brand-navy-light";
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.6) }}
                    onClick={() => setSelectedProject(project)}
                    className="break-inside-avoid group relative bg-brand-charcoal/95 border border-brand-navy-light hover:border-brand-orange/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer overflow-hidden mb-4"
                  >
                    {/* Top hover bar */}
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-brand-orange transition-all duration-400" />

                    <div className="p-6">
                      {/* Category */}
                      <span className={`inline-flex px-2.5 py-1 text-[10px] font-extrabold border ${catColor} mb-3`}>
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3 className="font-display font-bold text-base text-white mb-3 group-hover:text-brand-orange transition-colors duration-300 leading-snug">
                        {project.name}
                      </h3>

                      {/* Client & Location */}
                      <div className="flex flex-col gap-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-brand-steel">
                          <User className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          {project.client}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-steel">
                          <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          {project.location}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between pt-3 border-t border-brand-navy-light">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${project.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
                          {project.status === "Completed" ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          {project.status}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-steel group-hover:text-brand-orange transition-colors">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-brand-steel">
              <Search className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-display font-bold text-lg">No projects found</p>
              <p className="text-sm mt-2">Try a different search term or category</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
