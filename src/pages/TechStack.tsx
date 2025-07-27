// src/pages/TechStack.tsx

import { useRef } from "react";
import { techs } from "../data/data"; // Your data file
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TechCard from "../components/TechStackCard"; // The new card component

gsap.registerPlugin(ScrollTrigger);

// A helper function to split the array into chunks (rows)
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Group technologies into rows of 2 for this example. Change '2' to 3 or 4 as you like.
  const techRows = chunkArray(techs, 2);

  useGSAP(() => {
    // Animate Title
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Animate each row of tech cards
    const rows = gsap.utils.toArray('.tech-row') as HTMLElement[];
    rows.forEach((row, index) => {
      const cards = row.querySelectorAll('.tech-card-item');

      // Determine animation direction based on row index (even/odd)
      const direction = index % 2 === 0 ? -1 : 1; // -1 for left, 1 for right

      gsap.from(cards, {
        opacity: 0,
        x: 300 * direction, // Animate from left or right
        stagger: 0.15, // Stagger the animation of cards in the same row
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
        },
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden bg-slate-900 py-20 px-4 sm:px-8"
    >
      {/* Background Decoratives */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/2 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Tools of the Trade
            </span>
          </h2>
        </div>

        {/* Render the rows of tech cards */}
        <div className="flex flex-col gap-8">
          {techRows.map((row, rowIndex) => (
            <div key={rowIndex} className="tech-row grid grid-cols-1 md:grid-cols-2 gap-8">
              {row.map((tech, techIndex) => (
                <div key={techIndex} className="tech-card-item">
                  <TechCard 
                    name={tech.name} 
                    icon={tech.icon} 
                    description={tech.description}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}