"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

const word = "NEXUS";

const sideImages = [
  {
    src: "/images/revised.png",
    alt: "Luxury residential living room with travertine and walnut accents",
    position: "left",
    span: 1,
  },
  {
    src: "/images/revised2.png",
    alt: "Bespoke dining space with bronze lighting fixtures",
    position: "left",
    span: 1,
  },
  {
    src: "/images/shakirs (2).png",
    alt: "Minimalist bedroom suite with warm material palette",
    position: "right",
    span: 1,
  },
  {
    src: "/images/Enscape_2024-09-30-14-46-51.png",
    alt: "Contemporary kitchen with natural stone surfaces",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);

  // DOM Refs for scroll animation
  const textBehindRef = useRef<HTMLDivElement>(null);
  const taglineSectionRef = useRef<HTMLDivElement>(null);
  const centerContainerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);

  // Parallax effect
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      if (headingRef.current) {
        headingRef.current.style.transform = `translate3d(${x * -25}px, ${y * -25}px, 0)`;
      }
      if (taglineRef.current) {
        taglineRef.current.style.transform = `translate3d(${x * -15}px, ${y * -15}px, 0)`;
      }
      if (ctaWrapperRef.current) {
        ctaWrapperRef.current.style.transform = `translate3d(${x * -10}px, ${y * -10}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    // Disable complex scroll animations on mobile for performance and better layout
    if (window.innerWidth < 768) {
      if (textBehindRef.current) textBehindRef.current.style.opacity = '1';
      if (taglineSectionRef.current) taglineSectionRef.current.style.opacity = '1';
      if (centerContainerRef.current) {
        centerContainerRef.current.style.width = '100%';
        centerContainerRef.current.style.opacity = '1';
      }
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = window.innerHeight * 2;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    // Calculate variables based on progress
    const textOpacity = Math.max(0, 1 - (progress / 0.2));
    const imageProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));

    const centerWidth = 100 - (imageProgress * 100);
    const centerOpacity = 1 - imageProgress;
    const sideWidth = imageProgress * 50;
    const sideOpacity = imageProgress;
    const sideTranslateLeft = -100 + (imageProgress * 100);
    const sideTranslateRight = 100 - (imageProgress * 100);
    const gap = imageProgress * 8;
    const sideTranslateY = -(imageProgress * 15);

    // Apply to DOM nodes (Direct DOM manipulation for 60fps performance)
    if (textBehindRef.current) textBehindRef.current.style.opacity = textOpacity.toString();
    if (taglineSectionRef.current) taglineSectionRef.current.style.opacity = textOpacity.toString();

    if (bentoGridRef.current) bentoGridRef.current.style.gap = `${gap}px`;

    if (centerContainerRef.current) {
      centerContainerRef.current.style.width = `${centerWidth}%`;
      centerContainerRef.current.style.opacity = centerOpacity.toString();
    }

    if (leftColumnRef.current) {
      leftColumnRef.current.style.width = `${sideWidth}%`;
      leftColumnRef.current.style.gap = `${gap}px`;
      leftColumnRef.current.style.transform = `translate3d(${sideTranslateLeft}%, ${sideTranslateY}%, 0)`;
      leftColumnRef.current.style.opacity = sideOpacity.toString();
    }

    if (rightColumnRef.current) {
      rightColumnRef.current.style.width = `${sideWidth}%`;
      rightColumnRef.current.style.gap = `${gap}px`;
      rightColumnRef.current.style.transform = `translate3d(${sideTranslateRight}%, ${sideTranslateY}%, 0)`;
      rightColumnRef.current.style.opacity = sideOpacity.toString();
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

    // Initial call
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTransforms);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms]);

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            ref={bentoGridRef}
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: "0px" }}
          >
            {/* Left Column - Hidden on Mobile */}
            <div
              ref={leftColumnRef}
              className="hidden md:flex h-full flex-row will-change-transform"
              style={{
                width: "0%",
                gap: "0px",
                transform: "translate3d(-100%, 0%, 0)",
                opacity: 0,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="group relative h-full overflow-hidden will-change-transform"
                  style={{ flex: img.span }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 0vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div
              ref={centerContainerRef}
              className="relative overflow-hidden will-change-transform w-full md:w-[100%]"
              style={{
                height: "100%",
                flex: "0 0 auto",
                opacity: 1,
              }}
            >
              {/* Text Behind - Fades out first */}
              <div
                ref={textBehindRef}
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ opacity: 1, transform: 'translateY(-200px)' }}
              >
                <h1 ref={headingRef} className="whitespace-nowrap text-[28vw] font-bold leading-[0.8] tracking-tighter text-[#002b32] transition-transform duration-500 ease-out will-change-transform">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>

              <Image
                src="/images/ChatGPT Image Jun 10, 2026, 04_29_46 PM.png"
                alt="Luxury interior with warm minimalism — travertine, walnut, and bronze"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="absolute inset-0 z-10 object-contain scale-[1.00]"
                priority
              />
            </div>

            {/* Right Column - Hidden on Mobile */}
            <div
              ref={rightColumnRef}
              className="hidden md:flex h-full flex-row will-change-transform"
              style={{
                width: "0%",
                gap: "0px",
                transform: "translate3d(100%, 0%, 0)",
                opacity: 0,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="group relative h-full overflow-hidden will-change-transform"
                  style={{ flex: img.span }}
                >
                  <Image
                    src={img.src || "/images/house-hero-modern.png"}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 0vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Tagline Section - Fixed at bottom */}
      <div
        ref={taglineSectionRef}
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-end px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: 1 }}
      >

        <div ref={ctaWrapperRef} className="mt-8 transition-transform duration-500 ease-out will-change-transform">
          <a
            href="#philosophy"
            data-magnetic="true"
            className="pointer-events-auto inline-flex h-12 items-center justify-center rounded-full border border-[#002b32]/20 bg-white/50 backdrop-blur-sm px-8 text-sm font-medium tracking-widest text-[#002b32] uppercase transition-all duration-300 ease-out hover:bg-[#002b32]/10 will-change-transform"
          >
            Explore Projects
          </a>
        </div>
      </div>

      {/* Scroll space to enable animation - Hidden on Mobile so hero doesn't scroll */}
      <div className="hidden md:block h-[200vh]" />
    </section>
  );
}
