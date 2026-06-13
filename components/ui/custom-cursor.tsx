"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  // Mouse position state
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });

  // Hover state
  const isHoveringCTA = useRef(false);
  const magneticTarget = useRef<HTMLElement | null>(null);

  // Use a ref to store the animation frame ID
  const requestRef = useRef<number | null>(null);

  // Linear interpolation function for smooth easing
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    // Check if device supports hover and prefers motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Global cursor, always visible once moved
      if (!isVisible) setIsVisible(true);

      // Update target mouse position
      mouse.current = { x: e.clientX, y: e.clientY };

      // Magnetic logic for CTA
      if (isHoveringCTA.current && magneticTarget.current) {
        const targetRect = magneticTarget.current.getBoundingClientRect();
        
        // Calculate center of the button
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        const distanceX = e.clientX - targetCenterX;
        const distanceY = e.clientY - targetCenterY;

        magneticTarget.current.style.transform = `translate3d(${distanceX * 0.15}px, ${distanceY * 0.15}px, 0)`;
        
        mouse.current = {
          x: targetCenterX + distanceX * 0.1,
          y: targetCenterY + distanceY * 0.1,
        };
      }
    };

    const animate = () => {
      // Easing factors
      const dotSpeed = 1; // Instant
      const ringSpeed = 0.15; // Smooth lag

      // Dot animation (instant or very fast)
      dot.current.x = lerp(dot.current.x, mouse.current.x, dotSpeed);
      dot.current.y = lerp(dot.current.y, mouse.current.y, dotSpeed);

      // Ring animation (smooth delay)
      ring.current.x = lerp(ring.current.x, mouse.current.x, ringSpeed);
      ring.current.y = lerp(ring.current.y, mouse.current.y, ringSpeed);

      // Apply transforms to main cursor elements
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      if (cursorRingRef.current) {
        // Keeps the circle cursor constant without any distortion
        cursorRingRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible]);

  // Handle CTA hover listeners globally
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic="true"]') as HTMLElement;
      if (target) {
        isHoveringCTA.current = true;
        magneticTarget.current = target;
        
        // Expand ring and fade in text
        if (cursorRingRef.current) {
          cursorRingRef.current.classList.add("scale-[2.5]", "bg-[#002b32]/10", "backdrop-blur-sm", "border-transparent");
        }
        if (cursorDotRef.current) {
          cursorDotRef.current.classList.add("scale-50");
        }
        if (cursorTextRef.current) {
          cursorTextRef.current.style.opacity = "1";
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic="true"]') as HTMLElement;
      if (target) {
        isHoveringCTA.current = false;
        
        // Reset button transform
        if (magneticTarget.current) {
          magneticTarget.current.style.transform = "translate3d(0, 0, 0)";
        }
        
        magneticTarget.current = null;

        // Shrink ring and fade out text
        if (cursorRingRef.current) {
          cursorRingRef.current.classList.remove("scale-[2.5]", "bg-[#002b32]/10", "backdrop-blur-sm", "border-transparent");
        }
        if (cursorDotRef.current) {
          cursorDotRef.current.classList.remove("scale-50");
        }
        if (cursorTextRef.current) {
          cursorTextRef.current.style.opacity = "0";
        }
      }
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden md:block mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      {/* Outer trailing ring */}
      <div
        ref={cursorRingRef}
        className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full border border-white/50 transition-[background-color,border-color,transform] duration-300 ease-out will-change-transform"
      >
        <span 
          ref={cursorTextRef}
          className="text-[10px] font-medium tracking-widest text-white opacity-0 transition-opacity duration-300"
        >
          EXPLORE
        </span>
      </div>

      {/* Inner instant dot */}
      <div
        ref={cursorDotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white will-change-transform transition-transform duration-300 ease-out"
      />
    </div>
  );
}
