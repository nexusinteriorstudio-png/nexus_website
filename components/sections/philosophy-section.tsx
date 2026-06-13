"use client";

import { useEffect, useRef, useCallback } from "react";

const titles = [
  "Refined Interiors.",
  "Timeless Spaces.",
  "Curated Living.",
];

const descriptionText = "Every space tells a story. We craft timeless interiors that balance beauty, functionality, and individuality — creating environments that feel effortlessly sophisticated and deeply personal.";
const descriptionWords = descriptionText.split(" ");

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  // DOM Refs for animation
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;

    // Title scroll animation
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    titleRefs.current.forEach((titleEl, index) => {
      if (!titleEl) return;
      
      const isLastText = index === titles.length - 1;
      const segmentSize = 1 / titles.length;
      const startProgress = index * segmentSize;
      const endProgress = (index + 1) * segmentSize;

      let rotateX = 0;
      let opacity = 0;

      if (progress >= startProgress && progress < endProgress) {
        // Active text - rotating in
        const localProgress = (progress - startProgress) / segmentSize;
        rotateX = (1 - localProgress) * 90;
        opacity = localProgress;
      } else if (progress >= endProgress) {
        // Text that has passed
        if (isLastText) {
          rotateX = 0;
          opacity = 1;
        } else {
          rotateX = -90;
          opacity = 0;
        }
      } else {
        // Text that hasn't appeared yet
        rotateX = 90;
        opacity = 0;
      }

      titleEl.style.transform = `rotateX(${rotateX}deg) translateZ(0)`;
      titleEl.style.opacity = opacity.toString();
    });

    // Description word animation
    if (descriptionRef.current) {
      const descRect = descriptionRef.current.getBoundingClientRect();
      const descTop = descRect.top;
      const descHeight = descRect.height;

      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.2;

      let descProgress = 0;
      if (descTop < startTrigger && descTop > endTrigger - descHeight) {
        descProgress = Math.max(0, Math.min(1, (startTrigger - descTop) / (startTrigger - endTrigger)));
      } else if (descTop <= endTrigger - descHeight) {
        descProgress = 1;
      }

      descriptionSpanRefs.current.forEach((span, index) => {
        if (!span) return;
        const wordProgress = Math.max(0, Math.min(1, (descProgress * descriptionWords.length) - index));
        span.style.opacity = wordProgress.toString();
        span.style.filter = `blur(${(1 - wordProgress) * 40}px)`;
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTransforms, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTransforms);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="philosophy" className="bg-background">
      {/* Scroll-Animated Title Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-7xl px-4">
            {/* Title - centered with 3D rotation */}
            <div
              className="flex items-center justify-center pointer-events-none"
              style={{
                perspective: '1000px',
              }}
            >
              <div className="relative w-full" style={{ transformStyle: 'preserve-3d', minHeight: '150px' }}>
                {titles.map((title, index) => (
                  <h2
                    key={index}
                    ref={(el) => { titleRefs.current[index] = el; }}
                    className="absolute inset-0 flex items-center justify-center text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] font-medium leading-tight tracking-tighter text-foreground text-center px-4"
                    style={{
                      opacity: 0,
                      transform: `rotateX(90deg) translateZ(0)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                      WebkitFontSmoothing: 'antialiased',
                    }}
                  >
                    {title}
                  </h2>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div ref={descriptionRef} className="px-6 pt-8 pb-20 md:px-12 md:pt-12 md:pb-28 lg:px-20 lg:pt-16 lg:pb-36">
        <div className="text-center">
          <p className="mt-8 leading-relaxed text-muted-foreground text-xl md:text-3xl text-center">
            {descriptionWords.map((word, index) => (
              <span
                key={index}
                ref={(el) => { descriptionSpanRefs.current[index] = el; }}
                className="inline-block"
                style={{
                  opacity: 0,
                  filter: `blur(40px)`,
                  transition: 'opacity 0.3s ease, filter 0.3s ease',
                  marginRight: '0.3em',
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
