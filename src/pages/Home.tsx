 // src/pages/Home.tsx

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const headElm = useRef<HTMLDivElement | null>(null);
  const descElm = useRef<HTMLDivElement | null>(null);
  const buttonElm = useRef<HTMLButtonElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const decorativeElm1 = useRef<HTMLDivElement>(null);
  const decorativeElm2 = useRef<HTMLDivElement>(null);
  const textHighlightRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const masterTl = gsap.timeline({
      delay: 0.2
    });

    // --- ENTRANCE ANIMATION SEQUENCE ---
    masterTl.from(backgroundRef.current, {
      scale: 1.2,
      filter: "blur(5px)",
      duration: 3,
      ease: "power2.out",
    });

    masterTl.from([decorativeElm1.current, decorativeElm2.current], {
      scale: 0,
      rotation: 180,
      autoAlpha: 0,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.3,
    }, "-=1.5");

    masterTl.from(headElm.current, {
      y: 100,
      autoAlpha: 0,
      scale: 0.8,
      duration: 1.5,
      ease: "power4.out",
    }, "-=1.2");

    masterTl.to(textHighlightRef.current, {
      textShadow: "0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.6)",
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.5");

    masterTl.from(descElm.current, {
      y: 50,
      autoAlpha: 0,
      filter: "blur(5px)",
      duration: 1.2,
      ease: "power3.out",
    }, "-=1");

    masterTl.from(buttonElm.current, {
      y: 60,
      autoAlpha: 0,
      scale: 0.7,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    }, "-=0.8");


    // --- CONTINUOUS & INTERACTIVE ANIMATIONS ---
    gsap.to([decorativeElm1.current, decorativeElm2.current], {
      rotation: "+=360",
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    // Subtle parallax effect on mouse move for a smoother experience
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to([headElm.current, descElm.current, buttonElm.current], {
        x: xPercent * -15,
        y: yPercent * -10,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to([decorativeElm1.current, decorativeElm2.current], {
        x: xPercent * 30,
        y: yPercent * 30,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, { scope: container });

  const handleScrollClick = (targetButton: HTMLButtonElement | null) => {
    gsap.to(targetButton, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#certificates`, offsetY: 0 },
      ease: "power3.inOut",
    });
  };

  return (
    <div ref={container} id="home" className="relative w-full h-screen pt-40 overflow-hidden text-white" style={{ willChange: 'transform, opacity' }}>
      {/* Background Video */}
      <div ref={backgroundRef} className="absolute top-0 left-0 w-full h-full z-[-3]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/12686138_3840_2160_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[-2] bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95"></div>

      {/* Decorative Elements */}
      <div
        ref={decorativeElm1}
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl z-[-1]"
        style={{ willChange: 'transform' }}
      ></div>
      <div
        ref={decorativeElm2}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-teal-500/15 to-cyan-500/15 rounded-full blur-3xl z-[-1]"
        style={{ willChange: 'transform' }}
      ></div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full w-full px-8 md:px-16 relative z-10">
        <div className="text-center max-w-4xl">
          {/* Heading */}
          <div ref={headElm} className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 tracking-tight">
            <div className="overflow-hidden">
              <span className="inline-block text-white drop-shadow-2xl">
                Hello,
              </span>
            </div>
            <div className="overflow-hidden mt-2">
              <span className="inline-block text-white">
                I'm{" "}
                <span
                  ref={textHighlightRef}
                  className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent font-black"
                >
                  Arpit
                </span>
                !
              </span>
            </div>
          </div>

          {/* Description */}
          <div ref={descElm} className="text-lg md:text-xl lg:text-2xl mt-8 font-light text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Creative full-stack developer passionate about building{" "}
            <span className="text-emerald-400 font-medium">innovative digital solutions</span>{" "}
            that push the boundaries of modern web development.
          </div>

          {/* CTA Button */}
          <button
            ref={buttonElm}
            onClick={() => handleScrollClick(buttonElm.current)}
            className="group relative mt-10 px-10 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white font-semibold text-lg rounded-2xl transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-emerald-500/25 border border-emerald-400/20 hover:border-emerald-400/40"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              View My Work
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
