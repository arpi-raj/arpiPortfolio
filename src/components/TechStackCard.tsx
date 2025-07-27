// src/components/TechCard.tsx

import {TechCardProps} from "../types/types"; // Import the TechCardProps interface

export default function TechCard({ name, icon, description }: TechCardProps) {
  return (
    <div className="
      group relative flex h-full w-full items-center gap-6 overflow-hidden 
      rounded-2xl border border-slate-700 bg-slate-800/80 p-6 
      backdrop-blur-sm transition-all duration-300
      hover:scale-105 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20
    ">
      {/* --- Shine Effect --- 
        This is a pseudo-element that sweeps across the card on hover.
      */}
      <div className="
        absolute top-0 left-[-150%] h-full w-[50%] 
        bg-gradient-to-r from-transparent via-white/20 to-transparent 
        transition-all duration-700 group-hover:left-[150%]
        transform -skew-x-12
      "></div>

      {/* Icon */}
      <div className="
        flex-shrink-0 transition-transform duration-300
        group-hover:scale-110
      ">
        <span className="text-5xl">{icon}</span>
      </div>
      
      {/* Content */}
      <div className="text-left">
        <h3 className="text-xl font-bold text-cyan-300">
          {name}
        </h3>
        <p className="mt-1 text-sm text-slate-300 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}