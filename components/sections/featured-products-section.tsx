"use client";

import { FadeImage } from "@/components/fade-image";

const projects = [
  {
    image: "/images/1 (4).png",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-2", // Large
  },
  {
    image: "/images/Enscape_2025-06-02-12-36-07.png",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Small
  },
  {
    image: "/images/1 (0).png",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Small
  },
  {
    image: "/images/1 (2).png",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-2", // Tall
  },
  {
    image: "/images/Enscape_2026-05-08-23-38-25.png",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Small
  },
  {
    image: "/images/1 (3).png",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-1", // Wide
  },
  {
    image: "/images/2 (2).png",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Small
  },
  {
    image: "/images/2 (2).jpg",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-2", // Tall
  },
  {
    image: "/images/2 (1).png",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-1", // Wide
  },
  {
    image: "/images/2 (1).jpg",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Small
  },
  {
    image: "/images/3 (1).png",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Small
  },
  {
    image: "/images/3 (2).png",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-1", // Wide
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="projects" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Selected Projects</p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            A Curated Portfolio
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto auto-rows-[250px] md:auto-rows-[220px]">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg border border-border ${project.span}`}
            >
              <FadeImage
                src={project.image || "/placeholder.svg"}
                alt={`Interior design project ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
