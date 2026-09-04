"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="about" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-width">
        <h2 className={`section-title ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className={`relative h-64 mb-6 rounded-lg overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                alt="Construction Team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className={`text-gray-600 mb-4 leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              OM Construction is a premier Mechanical & Civil Contractor established in 2000. With over 26 years of experience, we specialize in power plants, electrical substations, renewable energy projects, and heavy civil construction across India.
            </p>
            <p className={`text-gray-600 mb-4 leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.35s' }}>
              Our expertise spans thermal power plants, natural draft cooling towers (NDCT), 400/220 KV GIS substations, utility-scale solar parks, wind energy infrastructure, and industrial civil works. We have successfully delivered 29+ projects for major clients including ABB India, L&T, Alstom, TATA Projects, and Gamesa Renewable.
            </p>
            <p className={`text-gray-600 mb-6 leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              Our team of 600+ skilled professionals delivers exceptional quality and on-time project execution across Maharashtra, Karnataka, Madhya Pradesh, Gujarat, and Rajasthan, with a strong commitment to safety, innovation, and sustainable construction practices.
            </p>
            <div className={`grid grid-cols-2 gap-4 mt-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="font-bold text-2xl text-blue-600">26+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="font-bold text-2xl text-blue-600">600+</div>
                <div className="text-sm text-gray-600">Skilled Workforce</div>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="font-bold text-2xl text-blue-600">29+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="font-bold text-2xl text-blue-600">20+</div>
                <div className="text-sm text-gray-600">Major Clients</div>
              </div>
            </div>
          </div>
          <div className={`p-6 bg-white border border-gray-200 rounded-lg shadow-sm ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <h3 className="font-bold text-xl text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To deliver world-class engineering and construction services that exceed client expectations through innovation, quality, and timely execution.
            </p>
            <h3 className="font-bold text-xl text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be India's most trusted EPC contractor, known for excellence in power infrastructure and renewable energy projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
