// src/pages/ContactPage.tsx

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the left column content
    gsap.from(".contact-details > *", {
      opacity: 0,
      x: -100,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-details",
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // Animate the right column form
    gsap.from(".contact-form > *", {
      opacity: 0,
      x: 100,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-900 py-20 px-4 sm:px-8"
    >
      {/* Background Glows */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
          
          {/* Left Column: Contact Details */}
          <div className="contact-details flex flex-col justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-slate-300">
              Have a project in mind or just want to say hello? I'd love to hear from you. Fill out the form or reach out via my social channels.
            </p>
            <div className="mt-8 space-y-4">
              <a href="mailto:your-email@example.com" className="flex items-center gap-4 text-slate-300 transition-colors hover:text-cyan-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>er.arpitraj06@gmail.com</span>
              </a>
            </div>
            <div className="mt-10 flex space-x-6">
              <a href="https://github.com/arpi-raj" target="_blank"  className="text-slate-400 transition-all hover:text-white hover:scale-110"><svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
              <a href="#" className="text-slate-400 transition-all hover:text-white hover:scale-110"><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
              <a href="#" className="text-slate-400 transition-all hover:text-white hover:scale-110"><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.297 1.634 4.208 3.791 4.649-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
            </div>
          </div>
          
          {/* Right Column: Contact Form */}
          <form className="contact-form space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input type="text" id="name" name="name" className="block w-full rounded-md border-slate-700 bg-slate-800/80 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 transition" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input type="email" id="email" name="email" className="block w-full rounded-md border-slate-700 bg-slate-800/80 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 transition" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea id="message" name="message" rows={5} className="block w-full rounded-md border-slate-700 bg-slate-800/80 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 transition" placeholder="Your message..."></textarea>
            </div>
            <div>
              <button type="submit" className="
                w-full rounded-lg px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300
                bg-gradient-to-r from-cyan-500 to-emerald-500
                hover:scale-105 hover:shadow-cyan-500/30
              ">
                Send Message
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}