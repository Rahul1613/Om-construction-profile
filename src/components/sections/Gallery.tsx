"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projectImages = [
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-width">
        <h2 className={`section-title ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>Project Gallery</h2>
        <p className={`text-center text-gray-600 mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          {projectsData.length}+ Completed Projects Across India
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.slice(0, 12).map((project, index) => (
            <div 
              key={project.id} 
              className={`relative aspect-video rounded-lg overflow-hidden hover:shadow-lg transition-shadow group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <Image
                src={projectImages[index % projectImages.length]}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading={index > 5 ? "lazy" : "eager"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-base mb-1 line-clamp-2">{project.name}</h3>
                  <p className="text-xs text-gray-200 mb-1">{project.client}</p>
                  <p className="text-xs text-gray-300">{project.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`text-center mt-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-600 text-sm mb-4">Showing 12 of {projectsData.length} projects</p>
          <Link
            href="/profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors rounded"
          >
            Download Full Project List
          </Link>
        </div>
      </div>
    </section>
  );
}
