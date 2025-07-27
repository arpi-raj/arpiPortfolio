import { useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/data";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax background animation
    gsap.to(decorativeRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Main heading animation with sophisticated 3D effect
    gsap.fromTo(
      headingRef.current,
      { 
        opacity: 0, 
        y: 100,
        rotationX: 90,
        transformPerspective: 1000,
        transformOrigin: "50% 50% -50px"
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    // Subtitle with typewriter effect simulation
    gsap.fromTo(
      subHeadingRef.current,
      { opacity: 0, width: 0 },
      {
        opacity: 1,
        width: "auto",
        duration: 1.2,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subHeadingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    // Cards with magnetic hover effect and advanced entrance
    cardsRef.current.forEach((card, index) => {
      // Entrance animation
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 120,
          rotationY: 25,
          scale: 0.7,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Magnetic hover effect
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(card, {
          x: x * 0.1,
          y: y * 0.1,
          rotationX: y * 0.05,
          rotationY: x * 0.05,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div 
        ref={decorativeRef}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1
            ref={headingRef}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              My Work
            </span>
          </h1>
          <div className="overflow-hidden">
            <p
              ref={subHeadingRef}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light whitespace-nowrap"
            >
              Crafting digital experiences that blend creativity with cutting-edge technology
            </p>
          </div>
          
          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el!)}
              className="group perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative p-1 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-cyan-500/30 backdrop-blur-sm border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 h-full">
                  <ProjectCard
                    title={project.title}
                    image={project.image}
                    description={project.description}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
    </div>
  );
}