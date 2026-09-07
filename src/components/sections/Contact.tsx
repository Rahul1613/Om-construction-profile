"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitError, setIsSubmitError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setIsSubmitError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setIsSubmitError(true);
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setIsSubmitError(true);
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" ref={sectionRef} className="section-padding bg-white">
      <div className="container-width">
        <h2 className={`section-title scroll-animate ${isVisible ? 'visible' : ''}`}>Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`scroll-animate ${isVisible ? 'visible' : ''} delay-200`}>
            <h3 className="font-bold text-xl text-gray-800 mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-800 mb-1">Address</div>
                <div className="text-gray-600">Head Office: 3466/C, Sailakshmi, 15 Maad Kond, Veer Savarkar Marg, Mirya Road, Ratnagiri – 415612.</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Phone</div>
                <div className="text-gray-600">+91 9158636465</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Email</div>
                <div className="text-gray-600">omconstruction1716@gmail.com</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Business Hours</div>
                <div className="text-gray-600">Monday - Saturday, 9:00 AM - 6:00 PM IST</div>
              </div>
              <div className="pt-4">
                <Link
                  href="/profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors rounded"
                >
                  Download Company Profile
                </Link>
              </div>
            </div>
          </div>
          <div className={`scroll-animate ${isVisible ? 'visible' : ''} delay-400`}>
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 rounded"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 rounded"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 rounded"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 rounded resize-none"
                  aria-required="true"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
              {submitMessage && (
                <div className={`text-center text-sm ${isSubmitError ? 'text-red-600' : 'text-green-600'}`} role="status">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
