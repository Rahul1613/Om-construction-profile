"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate elements with .gsap-fade-up class
      gsap.utils.toArray(".gsap-fade-up").forEach((element) => {
        gsap.from(element as HTMLElement, {
          scrollTrigger: {
            trigger: element as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Animate elements with .gsap-fade-in class
      gsap.utils.toArray(".gsap-fade-in").forEach((element) => {
        gsap.from(element as HTMLElement, {
          scrollTrigger: {
            trigger: element as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      // Animate elements with .gsap-scale-up class
      gsap.utils.toArray(".gsap-scale-up").forEach((element) => {
        gsap.from(element as HTMLElement, {
          scrollTrigger: {
            trigger: element as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        });
      });

      // Animate elements with .gsap-slide-left class
      gsap.utils.toArray(".gsap-slide-left").forEach((element) => {
        gsap.from(element as HTMLElement, {
          scrollTrigger: {
            trigger: element as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Animate elements with .gsap-slide-right class
      gsap.utils.toArray(".gsap-slide-right").forEach((element) => {
        gsap.from(element as HTMLElement, {
          scrollTrigger: {
            trigger: element as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Animate elements with .gsap-stagger class (for grids)
      gsap.utils.toArray(".gsap-stagger").forEach((container) => {
        gsap.from((container as HTMLElement).children, {
          scrollTrigger: {
            trigger: container as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
