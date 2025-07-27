import React from 'react';
import { useRef } from 'react';
import { ProjectCardProps } from '../types/types';


export default function ProjectCard(props : ProjectCardProps) {
  const projectTitleRef = useRef<HTMLDivElement | null>(null);
  const projectImageRef = useRef<HTMLImageElement | null>(null);
  const projectCardRef = useRef<HTMLDivElement | null>(null);
  const projectDescRef = useRef<HTMLDivElement | null>(null);
  
  return (
      <div
        ref={projectCardRef}
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-xl hover:bg-gray-200 hover:scale-105 hover:shadow-2xl transition-colors transition-transform duration-300 w-full text-center border-2 border-indigo-500">
        <img
          ref={projectImageRef}
          src={props.image || '/default-project-image.jpg'}
          alt="Project"
          className="w-full h-auto rounded-lg mb-4"
        />
        <div ref={projectTitleRef} className="text-lg font-semibold">
          {props.title || 'Project Title'}
        </div>
        <p ref={projectDescRef} className="text-gray-600 mt-2">
          {props.description || 'This is a brief description of the project.'}
        </p>
      </div>
  )}