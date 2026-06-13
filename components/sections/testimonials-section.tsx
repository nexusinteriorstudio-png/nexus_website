"use client";

import { useEffect, useRef } from "react";

function VelocityRow({
  content,
  text,
  baseVelocity = 2,
  direction = 1,
  className
}: {
  content?: React.ReactNode;
  text?: string;
  baseVelocity?: number;
  direction?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(direction === 1 ? -50 : 0);
  const lastScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const animate = () => {
      if (!containerRef.current) return;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Base speed + scroll boost
      const scrollBoost = Math.abs(scrollDelta) * 0.05;
      const step = (baseVelocity + scrollBoost) * 0.02;

      xRef.current += step * direction;

      // Wrap logic: when scrolling right (direction 1), we start at -50% and go towards 0%.
      if (direction === 1) {
        if (xRef.current >= 0) xRef.current = -50;
      } else {
        // When scrolling left (direction -1), we start at 0% and go towards -50%.
        if (xRef.current <= -50) xRef.current = 0;
      }

      containerRef.current.style.transform = `translate3d(${xRef.current}%, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [baseVelocity, direction]);

  // Repeat content enough times to fill the screen
  const duplicatedContent = Array(4).fill(content || text);

  return (
    <div className="flex w-full overflow-hidden whitespace-nowrap">
      <div
        ref={containerRef}
        className="flex w-max shrink-0 items-center"
      >
        <div className="flex shrink-0">
          {duplicatedContent.map((t, i) => (
            <div key={i} className={`flex items-center px-12 md:px-24 ${className || ""}`}>{t}</div>
          ))}
        </div>
        <div className="flex shrink-0">
          {duplicatedContent.map((t, i) => (
            <div key={i} className={`flex items-center px-12 md:px-24 ${className || ""}`}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  { quote: "Love the final result", author: "IDREES" },
  { quote: "Couldn't be happier with the final result", author: "SHABBIR" },
  { quote: "So easy to work with", author: "ALI ASGHAR" },
  { quote: "The whole process was surprisingly smooth", author: "HUSSAIN" },
];

export function TestimonialsSection() {
  const testimonialsContent = (
    <div className="flex items-center gap-16 md:gap-24">
      {testimonials.map((t, i) => (
        <div key={i} className="flex items-center gap-6">
          <span
            className="italic font-light tracking-wide text-5xl md:text-6xl text-muted-foreground"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            “{t.quote}”
          </span>
          <span className="font-sans text-base md:text-lg font-bold uppercase tracking-[0.2em] text-foreground">
            — {t.author}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="bg-background py-24 md:py-36 border-t border-border/40">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="text-4xl font-light tracking-tight md:text-7xl md:leading-[1.1] text-foreground w-full">
          {/* Top Line: Testimonials */}
          <VelocityRow
            content={testimonialsContent}
            baseVelocity={0.2}
            direction={-1}
          />

          <div className="h-6 md:h-12" />

          {/* Bottom Line: Brand Name */}
          <VelocityRow
            text={`NEXUS INTERIOR STUDIOS`}
            baseVelocity={0.9}
            direction={1}
            className="font-bold"
          />
        </div>

        {/* Gradient fades for the edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>
    </section>
  );
}
