"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { projectsData, type ProjectItem } from "@/data/projects";

type GalleryGroup = {
  id: string;
  title: string;
  image: string;
  projectIds: string[];
};

const galleryGroups: GalleryGroup[] = [
  { id: "ndct", title: "NDCT Cooling Tower RCC Work", image: "/images/ndct.png", projectIds: ["p1", "p2", "p3"] },
  { id: "tg-deck", title: "TG Foundation, TG Deck & Boiler Base", image: "/images/01_TG Deck.png", projectIds: ["p4"] },
  { id: "gantry", title: "400/220 KV Gantry & Equipment Foundations", image: "/images/400-220-kv-gantry-equipment-foundations.png", projectIds: ["p5", "p8"] },
  { id: "drainage", title: "Boiler Foundation Civil Work", image: "/images/03_Industrial Construction.png", projectIds: ["p6", "p30"] },
  { id: "132-substation", title: "132/33 KV Substation Establishment", image: "/images/06_220 KV Substation.png", projectIds: ["p7"] },
  { id: "765-switchyard", title: "765/400 KV Switchyard", image: "/images/06_220 KV Substation.png", projectIds: ["p9"] },
  { id: "solar", title: "Solar Power Projects", image: "/images/02_Solar Panel Installation.png", projectIds: ["p10", "p11", "p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "p29", "p31"] },
  { id: "pooling-substations", title: "Wind & Pooling Substations", image: "/images/06_220 KV Substation.png", projectIds: ["p12", "p13", "p14", "p15", "p16", "p17", "p18", "p20", "p32"] },
  { id: "office", title: "O&M Office Building", image: "/images/05_Site Office.png", projectIds: ["p19"] },
];

type ResolvedGalleryGroup = GalleryGroup & { projects: ProjectItem[] };

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ResolvedGalleryGroup | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const resolvedGroups = useMemo(
    () => galleryGroups.map((group) => ({
      ...group,
      projects: group.projectIds
        .map((id) => projectsData.find((project) => project.id === id))
        .filter((project): project is ProjectItem => Boolean(project)),
    })),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);

  const changeGroup = (direction: number) => {
    if (!selectedGroup) return;

    const currentIndex = resolvedGroups.findIndex((group) => group.id === selectedGroup.id);
    const nextIndex = (currentIndex + direction + resolvedGroups.length) % resolvedGroups.length;
    setSelectedGroup(resolvedGroups[nextIndex]);
  };

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-width">
        <h2 className={`section-title scroll-animate ${isVisible ? "visible" : ""}`}>Project Gallery</h2>
        <p className={`text-center text-gray-600 mb-8 scroll-animate ${isVisible ? "visible" : ""} delay-100`}>
          {projectsData.length} projects presented across {resolvedGroups.length} work categories
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedGroups.map((group, index) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setSelectedGroup(group)}
              className={`relative aspect-video rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer scroll-animate text-left ${isVisible ? "visible" : ""}`}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              aria-label={`View ${group.projects.length} ${group.title} projects`}
            >
              <Image
                src={group.image}
                alt={group.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading={index > 2 ? "lazy" : "eager"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <span className="inline-flex mb-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
                    {group.projects.length} {group.projects.length === 1 ? "project" : "projects"}
                  </span>
                  <h3 className="font-bold text-base line-clamp-2">{group.title}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className={`text-center mt-8 text-gray-600 text-sm scroll-animate ${isVisible ? "visible" : ""} delay-300`}>
          Select a work category to see every related client and project detail.
        </p>
      </div>

      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedGroup(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedGroup.title} project details`}
        >
          <div
            className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/7]">
              <Image src={selectedGroup.image} alt={selectedGroup.title} fill sizes="100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                type="button"
                onClick={() => changeGroup(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full transition-colors shadow"
                aria-label="Previous work category"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => changeGroup(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full transition-colors shadow"
                aria-label="Next work category"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute left-6 bottom-5 text-white pr-16">
                <p className="text-sm font-semibold uppercase tracking-wide opacity-90">Work category</p>
                <h3 className="font-bold text-2xl md:text-3xl">{selectedGroup.title}</h3>
                <p className="mt-1 text-sm opacity-90">
                  {resolvedGroups.findIndex((group) => group.id === selectedGroup.id) + 1} of {resolvedGroups.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGroup(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                aria-label="Close project details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 md:p-6">
              <p className="text-gray-600 mb-5">
                {selectedGroup.projects.length} {selectedGroup.projects.length === 1 ? "project" : "projects"} in this work category.
              </p>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">#</th>
                      <th className="px-4 py-3 font-semibold">Client</th>
                      <th className="px-4 py-3 font-semibold">Project / Work</th>
                      <th className="px-4 py-3 font-semibold">Location</th>
                      <th className="px-4 py-3 font-semibold">Period</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedGroup.projects.map((project) => (
                      <tr key={project.id} className="align-top text-gray-700">
                        <td className="px-4 py-4 font-semibold text-gray-900">{project.id.replace("p", "")}</td>
                        <td className="px-4 py-4 font-medium text-gray-900">{project.client}</td>
                        <td className="px-4 py-4"><p className="font-medium text-gray-900">{project.name}</p><p className="mt-1 text-xs text-gray-500">{project.category}</p></td>
                        <td className="px-4 py-4">{project.location}</td>
                        <td className="px-4 py-4">{project.duration}</td>
                        <td className={`px-4 py-4 font-medium ${project.status === "Completed" ? "text-green-700" : "text-blue-700"}`}>{project.status}</td>
                        <td className="px-4 py-4 min-w-64">{project.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
