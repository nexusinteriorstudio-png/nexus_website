"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const words = text.split(" ");

  const updateTransforms = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const startOffset = windowHeight * 0.9;
    const endOffset = windowHeight * 0.1;
    const totalDistance = startOffset - endOffset;
    const currentPosition = startOffset - rect.top;
    const progress = Math.max(0, Math.min(1, currentPosition / totalDistance));

    const appearProgress = progress * (words.length + 1);

    for (let i = 0; i < spanRefs.current.length; i++) {
      const span = spanRefs.current[i];
      if (!span) continue;
      const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - i));
      span.style.opacity = wordAppearProgress.toString();
      span.style.filter = `blur(${(1 - wordAppearProgress) * 40}px)`;
    }
  }, [words.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms]);

  return (
    <p
      ref={containerRef}
      className="text-3xl font-semibold leading-snug text-[#002b32] md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => {
            spanRefs.current[index] = el;
          }}
          className="inline-block"
          style={{
            opacity: 0,
            filter: 'blur(40px)',
            transition: 'opacity 0.1s linear, filter 0.1s linear',
            marginRight: '0.3em',
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

const sideImages = [
  {
    src: "/images/6 (1).png",
    alt: "Luxury residential interior with natural materials",
    position: "left",
  },
  {
    src: "/images/6 (2).png",
    alt: "Bronze and travertine material detail",
    position: "right",
  },
];

const textCycles = [
  "Discovery & Vision.",
  "Concept Development.",
  "Realization & Craft.",
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);

  // DOM Refs for scroll animation
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const centerContainerRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  const image2WrapperRef = useRef<HTMLDivElement>(null);
  const image3WrapperRef = useRef<HTMLDivElement>(null);
  const image4WrapperRef = useRef<HTMLDivElement>(null);

  // Nested refs for title spans: [cycleIndex][wordIndex]
  const titleSpanRefs = useRef<(HTMLSpanElement | null)[][]>([[], [], []]);

  const rafRef = useRef<number | null>(null);

  const descriptionText = "Our design process is a journey of collaborative discovery. From the first conversation to the final reveal, every decision is guided by intention. We believe exceptional interiors are shaped by thoughtful design, meticulous craftsmanship, and a deep understanding of how people live and interact with space. The result is a seamless blend of beauty, comfort, and functionality that stands the test of time.";

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    // Mobile check - disable complex animations
    const isMobile = window.innerWidth < 768;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = window.innerHeight * 4;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    const imageProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));

    // For mobile, skip the side columns completely
    if (!isMobile) {
      const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
      const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
      const sideWidth = imageProgress * 22; // 0% to 22%
      const sideOpacity = imageProgress;
      const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
      const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
      const gap = imageProgress * 16; // 0px to 16px

      if (bentoGridRef.current) {
        bentoGridRef.current.style.gap = `${gap}px`;
        bentoGridRef.current.style.padding = `${imageProgress * 16}px`;
      }

      if (centerContainerRef.current) {
        centerContainerRef.current.style.width = `${centerWidth}%`;
        centerContainerRef.current.style.height = `${centerHeight}%`;
      }

      if (leftColumnRef.current) {
        leftColumnRef.current.style.width = `${sideWidth}%`;
        leftColumnRef.current.style.transform = `translate3d(${sideTranslateLeft}%, 0, 0)`;
        leftColumnRef.current.style.opacity = sideOpacity.toString();
      }

      if (rightColumnRef.current) {
        rightColumnRef.current.style.width = `${sideWidth}%`;
        rightColumnRef.current.style.transform = `translate3d(${sideTranslateRight}%, 0, 0)`;
        rightColumnRef.current.style.opacity = sideOpacity.toString();
      }
    } else {
      if (centerContainerRef.current) {
        centerContainerRef.current.style.width = '100%';
        centerContainerRef.current.style.height = '100%';
      }
    }

    // Image fading
    if (image2WrapperRef.current) {
      image2WrapperRef.current.style.opacity = Math.max(0, Math.min(1, (progress - 0.1) / 0.2)).toString();
    }
    if (image3WrapperRef.current) {
      image3WrapperRef.current.style.opacity = Math.max(0, Math.min(1, (progress - 0.4) / 0.2)).toString();
    }
    if (image4WrapperRef.current) {
      image4WrapperRef.current.style.opacity = Math.max(0, Math.min(1, (progress - 0.7) / 0.2)).toString();
    }

    // Text Cycles
    textCycles.forEach((text, cycleIndex) => {
      const cycleStart = cycleIndex / textCycles.length;
      const cycleEnd = (cycleIndex + 1) / textCycles.length;
      const words = text.split(" ");

      words.forEach((word, wordIndex) => {
        let wordOpacity = 0;
        let wordBlur = 40;

        if (progress >= cycleStart && progress < cycleEnd) {
          const localProgress = (progress - cycleStart) / (cycleEnd - cycleStart);
          if (localProgress < 0.5) {
            const appearProgress = (localProgress / 0.5) * (words.length + 1);
            const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - wordIndex));
            wordOpacity = wordAppearProgress;
            wordBlur = (1 - wordAppearProgress) * 40;
          } else {
            const disappearProgress = ((localProgress - 0.5) / 0.5) * (words.length + 1);
            const wordDisappearProgress = Math.max(0, Math.min(1, disappearProgress - wordIndex));
            wordOpacity = 1 - wordDisappearProgress;
            wordBlur = wordDisappearProgress * 40;
          }
        }

        const span = titleSpanRefs.current[cycleIndex]?.[wordIndex];
        if (span) {
          span.style.opacity = wordOpacity.toString();
          span.style.filter = `blur(${wordBlur}px)`;
        }
      });
    });

  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTransforms, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTransforms);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms]);

  return (
    <section ref={sectionRef} className="relative bg-[#00171a]">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            ref={bentoGridRef}
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: "0px", padding: "0px" }}
          >
            {/* Left Column - Hidden on Mobile */}
            <div
              ref={leftColumnRef}
              className="hidden md:block relative overflow-hidden will-change-transform"
              style={{
                width: "0%",
                height: "100%",
                transform: "translate3d(-100%, 0, 0)",
                opacity: 0,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => {
                const isVideo = img.src?.match(/\.(mp4|webm|ogg)$/i);
                return isVideo ? (
                  <video
                    key={idx}
                    src={img.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    key={idx}
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 0vw, 25vw"
                    className="object-cover"
                  />
                );
              })}
            </div>

            {/* Main Center Image */}
            <div
              ref={centerContainerRef}
              className="relative overflow-hidden will-change-transform w-full md:w-auto"
              style={{
                height: "100%",
                flex: "0 0 auto",
              }}
            >
              {/* Layered Images - Progressive Fade In */}
              {/* Image 1 - Base layer */}
              <Image
                src="/images/Enscape_2024-10-04-16-53-35.jpg"
                alt="Luxury interior at dawn — soft natural light"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Image 2 - Fades in during first text cycle */}
              <div ref={image2WrapperRef} className="absolute inset-0 z-10" style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
                <Image
                  src="/images/4.png"
                  alt="Interior design — midday ambiance"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Image 3 - Fades in during second text cycle */}
              <div ref={image3WrapperRef} className="absolute inset-0 z-20" style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
                <Image
                  src="/images/4.jpg"
                  alt="Interior design — evening warmth"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Image 4 - Fades in during third text cycle */}
              <div ref={image4WrapperRef} className="absolute inset-0 z-30" style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
                <Image
                  src="/images/5.png"
                  alt="Interior design — intimate night setting"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/20 z-40 pointer-events-none" />

              {/* Title Text - Cycles through 3 texts with blur effect */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-50 pointer-events-none">
                {textCycles.map((text, cycleIndex) => {
                  const words = text.split(" ");
                  return (
                    <h2
                      key={cycleIndex}
                      className="absolute max-w-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-7xl text-5xl"
                    >
                      {words.map((word, wordIndex) => (
                        <span
                          key={wordIndex}
                          ref={(el) => {
                            if (!titleSpanRefs.current[cycleIndex]) {
                              titleSpanRefs.current[cycleIndex] = [];
                            }
                            titleSpanRefs.current[cycleIndex][wordIndex] = el;
                          }}
                          className="inline-block"
                          style={{
                            opacity: 0,
                            filter: 'blur(40px)',
                            transition: 'opacity 0.1s linear, filter 0.1s linear',
                            marginRight: '0.3em',
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </h2>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Hidden on Mobile */}
            <div
              ref={rightColumnRef}
              className="hidden md:block relative overflow-hidden will-change-transform"
              style={{
                width: "0%",
                height: "100%",
                transform: "translate3d(100%, 0, 0)",
                opacity: 0,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => {
                const isVideo = img.src?.match(/\.(mp4|webm|ogg)$/i);
                return isVideo ? (
                  <video
                    key={idx}
                    src={img.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    key={idx}
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 0vw, 25vw"
                    className="object-cover"
                  />
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation - increased for 3 text cycles */}
      <div className="h-[400vh]" />

      {/* Description Section with Background Image and Scroll Reveal */}
      <div
        ref={textSectionRef}
        className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-white"
      >

        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
