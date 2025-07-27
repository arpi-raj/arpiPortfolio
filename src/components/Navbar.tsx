// src/components/Navbar.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// Define the sections for your portfolio
const sections = [
  { id: 'home', title: 'Home' },
  { id: 'certificates', title: 'Certificates' },
  { id: 'projects', title: 'Projects' },
  { id: 'techstack', title: 'Tech Stack' },
  { id: 'contact', title: 'Contact' },
];

export default function Navbar() {
  const container = useRef<HTMLDivElement>(null);
  const magicLineRef = useRef<HTMLSpanElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animate navbar on load
  useGSAP(() => {
    gsap.from(container.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });
  }, { scope: container });

  // Handle smooth scrolling and magic line animation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu on click

    // Smooth scroll to the section
    gsap.to(window, {
      duration: 1.2,
      // REMOVED THE OFFSETY TO PREVENT PUSHING CONTENT DOWN
      scrollTo: { y: `#${targetId}`, offsetY: 0 },
      ease: 'power2.inOut',
    });
  };

  // Logic for the magic line and active state
  useEffect(() => {
    const links = gsap.utils.toArray('.nav-link') as HTMLElement[];
    const magicLine = magicLineRef.current;

    if (!magicLine) return;

    // Function to move the magic line
    const moveMagicLine = (target: HTMLElement) => {
      gsap.to(magicLine, {
        duration: 0.3,
        left: target.offsetLeft,
        width: target.offsetWidth,
        ease: 'power2.out',
      });
    };

    // Set up hover and active states for desktop links
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => moveMagicLine(link));
      link.addEventListener('mouseleave', () => {
        const activeLink = document.querySelector('.nav-link.active') as HTMLElement;
        if (activeLink) {
          moveMagicLine(activeLink);
        } else {
          // Hide it if no link is active
          gsap.to(magicLine, { width: 0, duration: 0.2 });
        }
      });
    });

    // Use ScrollTrigger to update active link on scroll
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: self => {
          const link = document.querySelector(`a[href="#${section.id}"]`) as HTMLElement;
          if (self.isActive) {
            links.forEach(l => l.classList.remove('active'));
            if(link) link.classList.add('active');
            if(link) moveMagicLine(link);
          } else {
            if(link) link.classList.remove('active');
          }
        },
      });
    });

    // Set initial position for magic line on load
    setTimeout(() => {
      const activeLink = document.querySelector('.nav-link.active') as HTMLElement;
      if (activeLink) moveMagicLine(activeLink);
    }, 500);

  }, []);

  return (
    <header ref={container} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-white shadow-2xl shadow-black/20 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Arpit Raj
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 relative">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className="nav-link px-4 py-2 text-slate-300 transition-colors hover:text-white"
              >
                {section.title}
              </a>
            ))}
            <span ref={magicLineRef} className="absolute bottom-0 h-0.5 bg-cyan-400 rounded-full" />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 relative w-8 h-8 text-white">
              <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
              <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden display-block mt-4">
            <nav className="flex flex-col items-center gap-4">
              {sections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className="w-full text-center py-3 text-lg text-slate-300 transition-colors hover:bg-slate-800/50 rounded-lg"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
