"use client";

import { FadeImage } from "@/components/fade-image";

const services = [
  {
    id: 1,
    name: "Residential Design",
    description: "Complete home interiors from concept to completion — kitchens, living spaces, bedrooms, and more",
    image: "/images/8.jpg",
  },
  {
    id: 2,
    name: "Commercial Design",
    description: "Hospitality, retail, and workspace environments that embody your brand identity",
    image: "/images/enhanced-Enscape_2025-07-31-10-02-07.png",
  },
  {
    id: 3,
    name: "Landscape Design",
    description: "Creating beautiful, functional outdoor spaces with expert landscape design, planting, and site enhancement solutions.",
    image: "/images/redesign (2).png",
  },
  {
    id: 4,
    name: "Construction",
    description: "Delivering high-quality construction services with precision craftsmanship, innovative solutions, and attention to every detail.",
    image: "/images/imgi_137_Site-Execution.jpg",
  },
];

export function CollectionSection() {
  return (
    <section id="services" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">What We Do</p>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Our Services
        </h2>
      </div>

      {/* Services Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {services.map((service) => (
            <div key={service.id} className="group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 75vw, 25vw"
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium leading-snug text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 md:px-12 lg:px-20">
          {services.map((service) => (
            <div key={service.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 75vw, 25vw"
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium leading-snug text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
