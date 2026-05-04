import React from 'react';
import Image from 'next/image';
import type { PortfolioProject } from '@/types';

interface ProjectCardProps {
  project: PortfolioProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Image & Badge */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/95 text-blue-900 backdrop-blur-sm shadow-sm">
            {project.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
          {project.description}
        </p>
        
        {/* Result Highlight */}
        <div className="pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-blue-50 p-2 rounded-lg text-blue-700">
              <project.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Key Result</div>
              <div className="text-sm font-bold text-gray-900">{project.result}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
