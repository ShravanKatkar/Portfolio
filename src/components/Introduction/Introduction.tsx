import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const clamp = (val: number, min: number, max: number) => (val < min ? min : val > max ? max : val);
const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min || 1e-6), 0, 1);
  return x * x * (3 - 2 * x);
};

export const Introduction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useReducedMotion();

  // Philosophy background image path safe for GitHub Pages (/Portfolio/) and local Vite dev
  const bgImageSrc = `${import.meta.env.BASE_URL}images/philosophy-bg.jpg`;

  const updateFrame = useCallback(
    (progress: number) => {
      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame || !media) return;

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      const startW = isMobile ? 86 : isTablet ? 70 : 48;
      const startH = isMobile ? 58 : isTablet ? 60 : 60;
      const startR = isMobile ? 18 : isTablet ? 22 : 26;
      const endR = 0;

      const p = clamp(progress / 0.85, 0, 1);
      const f = smoothstep(0, 1, p);

      const insetX = Math.max(0, (100 - (startW + (100 - startW) * f)) / 2);
      const insetY = Math.max(0, (100 - (startH + (100 - startH) * f)) / 2);
      const radius = startR + (endR - startR) * f;

      frame.style.clipPath = `inset(${insetY.toFixed(3)}% ${insetX.toFixed(3)}% ${insetY.toFixed(3)}% ${insetX.toFixed(3)}% round ${radius.toFixed(1)}px)`;

      const zoom = 1.35 + (1 - 1.35) * f;
      media.style.transform = `scale(${zoom.toFixed(4)})`;
      media.style.filter = `blur(${(8 * (1 - f)).toFixed(1)}px)`;

      if (titleRef.current) {
        const titleFade = smoothstep(0.08, 0.5, p);
        titleRef.current.style.opacity = `${(1 - titleFade).toFixed(3)}`;
        titleRef.current.style.transform = `translate3d(0, ${(-26 * titleFade).toFixed(1)}px, 0) scale(${(1 + 0.04 * titleFade).toFixed(3)})`;
      }

      if (hintRef.current) {
        const hintFade = smoothstep(0, 0.2, p);
        hintRef.current.style.opacity = `${(1 - hintFade).toFixed(3)}`;
        hintRef.current.style.transform = `translate3d(0, ${(10 * hintFade).toFixed(1)}px, 0)`;
      }

      if (scrimRef.current) {
        const scrimOp = 0.25 + (0.72 - 0.25) * f;
        scrimRef.current.style.opacity = `${scrimOp.toFixed(3)}`;
      }

      if (overlayRef.current) {
        const overlayFade = smoothstep(0.45, 0.85, progress);
        overlayRef.current.style.opacity = `${overlayFade.toFixed(3)}`;
        overlayRef.current.style.transform = `translate3d(0, ${(20 * (1 - overlayFade)).toFixed(1)}px, 0)`;
        overlayRef.current.style.pointerEvents = overlayFade > 0.8 ? 'auto' : 'none';
      }
    },
    []
  );

  useEffect(() => {
    if (reducedMotion) {
      updateFrame(1);
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!container || !track || !stage) return;

    let rafId = 0;
    let trackHeight = 0;
    let stageHeight = 0;
    let maxDistance = 0;

    const computeSizes = () => {
      stageHeight = window.innerHeight;
      if (stageHeight <= 0) return;
      trackHeight = stageHeight * 2; // 200vh track
      track.style.height = `${trackHeight}px`;
      stage.style.height = `${stageHeight}px`;
      maxDistance = trackHeight - stageHeight;
    };

    const handleScroll = () => {
      if (maxDistance <= 0) return;
      const top = track.getBoundingClientRect().top;
      const progress = clamp(-top / maxDistance, 0, 1);
      updateFrame(progress);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          handleScroll();
        });
      }
    };

    const onResize = () => {
      computeSizes();
      handleScroll();
    };

    computeSizes();
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [reducedMotion, updateFrame]);

  return (
    <section id="about" ref={containerRef} className="scroll-expand relative w-full text-white bg-[#09090b]">
      {/* Dynamic Ambient Background Wallpaper Behind The Entire Section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={bgImageSrc}
          alt="Philosophy Ambient Background"
          className="w-full h-full object-cover opacity-15 filter blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b]" />
      </div>

      <div ref={trackRef} className="scroll-expand__track relative w-full">
        <div ref={stageRef} className="scroll-expand__stage sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden z-[2]">
          {/* Outer Border & Expanding Card Frame */}
          <div
            ref={frameRef}
            className="scroll-expand__frame absolute inset-0 w-full h-full overflow-hidden bg-[#0d0d0f] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(252,107,47,0.15)] will-change-[clip-path]"
          >
            {/* The Main High-Resolution Philosophy Background Image */}
            <img
              ref={mediaRef}
              src={bgImageSrc}
              alt="Atmospheric dark cinematic philosophy artwork"
              className="scroll-expand__media absolute inset-0 w-full h-full object-cover select-none pointer-events-none will-change-transform"
              draggable={false}
            />

            {/* Dark Scrim Radial Gradient */}
            <div
              ref={scrimRef}
              className="scroll-expand__scrim absolute inset-0 pointer-events-none opacity-25 will-change-opacity"
              style={{
                background: 'radial-gradient(circle, rgba(9,9,11,0.45) 0%, rgba(9,9,11,0.85) 70%, rgba(9,9,11,0.98) 100%)',
              }}
            />

            {/* Content Overlay Revealed inside Expanded Card */}
            <div
              ref={overlayRef}
              className="scroll-expand__overlay absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0 px-4 sm:px-6"
            >
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-7 max-w-4xl mx-auto text-center select-none font-sans">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FC6B2F]/40 bg-[#FC6B2F]/15 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC6B2F] shadow-[0_0_8px_#FC6B2F]" />
                  <span className="text-[#FC6B2F] text-[10px] sm:text-xs font-mono font-semibold tracking-[0.3em] uppercase">
                    THE PHILOSOPHY
                  </span>
                </div>

                {/* Manifesto Quote */}
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[1.35] sm:leading-[1.4] tracking-tight max-w-3xl drop-shadow-2xl">
                  I believe great software is born at the intersection of{' '}
                  <span className="text-[#FC6B2F] italic font-serif">engineering precision</span> and algorithmic intelligence.
                </p>

                <p className="text-xs sm:text-sm md:text-base text-[#EAE6E1]/90 max-w-2xl leading-relaxed font-light">
                  Every prompt, every vector index, every line of backend code is an opportunity to create deterministic, reliable systems that truly empower people.
                </p>
              </div>
            </div>
          </div>

          {/* Initial Overlay Title Before Scroll */}
          <h2
            ref={titleRef}
            className="scroll-expand__title absolute inset-0 flex items-center justify-center text-center font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-white tracking-tightest pointer-events-none z-[5] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] px-4"
          >
            The Philosophy
          </h2>

          {/* Scroll Hint */}
          <div
            ref={hintRef}
            className="scroll-expand__hint absolute bottom-8 sm:bottom-12 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 pointer-events-none z-[5]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC6B2F] animate-ping" />
            <span>Scroll to expand</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
