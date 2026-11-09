import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, FileDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/socials';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GhostCursor } from '../GhostCursor/GhostCursor';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const titleWrapperRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const dustRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.dust',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, stagger: 0.05, delay: 0.1 }
      )
      .fromTo(
        '.hero-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.8'
      )
      .fromTo(
        titleWrapperRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'expo.out' },
        '-=0.6'
      )
      .fromTo(
        headlineRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.8'
      )
      .fromTo(
        bioRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] h-screen w-full overflow-hidden select-none touch-pan-y flex flex-col justify-between items-center px-4 sm:px-8 md:px-12 pt-24 pb-8"
      style={{ background: '#09090b' }}
    >
      {/* 01. WebGL Fluid Ember Ghost Cursor ONLY on Hero & BEHIND content (z-[2]) */}
      <GhostCursor
        color="#FC6B2F"
        brightness={0.8}
        edgeIntensity={0}
        trailLength={35}
        inertia={0.4}
        grainIntensity={0.025}
        bloomStrength={0.08}
        bloomRadius={0.8}
        bloomThreshold={0.04}
        fadeDelayMs={800}
        fadeDurationMs={1200}
        zIndex={2}
      />

      {/* 02. Background Subtle Radial Glow & Vignette (z-[4]) */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 25%, #09090b 100%)' }}
        aria-hidden="true"
      />

      <div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] pointer-events-none z-[6] opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(252,107,47,0.18) 0%, rgba(252,107,47,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* 03. Floating Ambient Dust Particles (z-[8]) */}
      <div ref={dustRef} className="absolute inset-0 pointer-events-none z-[8]" aria-hidden="true">
        <div className="dust absolute rounded-full" style={{ width: '2.4px', height: '2.4px', background: 'rgba(252,107,47,0.6)', top: '14%', left: '10%', animation: 'float 6.2s ease-in-out infinite' }} />
        <div className="dust absolute rounded-full" style={{ width: '1.8px', height: '1.8px', background: 'rgba(255,255,255,0.25)', top: '22%', left: '80%', animation: 'float-reverse 7.4s ease-in-out infinite' }} />
        <div className="dust absolute rounded-full" style={{ width: '2.8px', height: '2.8px', background: 'rgba(255,255,255,0.2)', top: '38%', left: '18%', animation: 'float 5.8s ease-in-out infinite' }} />
        <div className="dust absolute rounded-full" style={{ width: '1.4px', height: '1.4px', background: 'rgba(252,107,47,0.6)', top: '55%', left: '88%', animation: 'float-reverse 8.1s ease-in-out infinite' }} />
        <div className="dust absolute rounded-full" style={{ width: '2.2px', height: '2.2px', background: 'rgba(255,255,255,0.25)', top: '70%', left: '26%', animation: 'float 6.9s ease-in-out infinite' }} />
        <div className="dust absolute rounded-full" style={{ width: '1.6px', height: '1.6px', background: 'rgba(255,255,255,0.2)', top: '18%', left: '62%', animation: 'float-reverse 5.5s ease-in-out infinite' }} />
        <div className="dust absolute rounded-full" style={{ width: '2.6px', height: '2.6px', background: 'rgba(252,107,47,0.5)', top: '82%', left: '48%', animation: 'float 7.8s ease-in-out infinite' }} />
        <div className="dust absolute rounded-full" style={{ width: '1.5px', height: '1.5px', background: 'rgba(255,255,255,0.2)', top: '35%', left: '42%', animation: 'float-reverse 6.1s ease-in-out infinite' }} />
      </div>

      {/* 04. Top Status & Availability Badge (z-[20]) */}
      <div className="hero-badge relative z-[20] flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#FC6B2F] shadow-[0_0_10px_#FC6B2F] animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-mono text-[#B5B5B5] tracking-[0.2em] uppercase">
          AVAILABLE FOR OPPORTUNITIES · PUNE, IN
        </span>
      </div>

      {/* 05. Central Identity & Monolithic Typography (z-[20] above cursor) */}
      <div className="relative z-[20] my-auto flex flex-col items-center text-center w-full max-w-5xl px-2">
        {/* Monolithic SHRAVAN Title - Perfectly Aligned, Always Visible, Zero Overlap */}
        <div
          ref={titleWrapperRef}
          className="relative my-2 sm:my-3 flex items-center justify-center w-full"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-sans tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F4F1EA] to-[#A1A1AA] drop-shadow-[0_0_35px_rgba(252,107,47,0.25)] select-none">
            SHRAVAN
          </h1>
        </div>

        {/* Editorial Subtitle with glowing accent */}
        <div ref={headlineRef} className="mt-1 sm:mt-2">
          <p className="font-display text-lg sm:text-2xl md:text-3xl font-medium tracking-tight text-[#EAE6E1]">
            Engineering Intelligence.{' '}
            <span className="font-serif italic font-normal text-[#FC6B2F] lowercase text-[1.15em] drop-shadow-[0_0_15px_rgba(252,107,47,0.4)]">
              creating impact.
            </span>
          </p>
        </div>

        {/* Bio Narrative - Exact Requested Info */}
        <p
          ref={bioRef}
          className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base text-[#D4D4D8] max-w-2xl mx-auto leading-relaxed font-normal font-sans"
        >
          <span className="text-[#FC6B2F] font-semibold font-mono">AI Engineer, </span>
          Building intelligent systems at the frontier of Generative AI, computer vision, and human interaction. Based in Pune, India.
        </p>

        {/* Action Controls & Magnetic CTAs */}
        <div ref={ctaRef} className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={() => scrollTo('projects')}
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-7 py-3 text-xs font-mono font-bold tracking-wider text-black transition-all hover:bg-[#FC6B2F] hover:text-white hover:border-[#FC6B2F] shadow-xl shadow-black/50"
          >
            <span>EXPLORE WORK</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-xs font-mono tracking-wider text-[#EAE6E1] backdrop-blur-md transition-all hover:border-[#FC6B2F] hover:bg-[#FC6B2F]/10 hover:text-white"
          >
            <span>LET'S TALK</span>
            <Sparkles className="h-3.5 w-3.5 text-[#FC6B2F]" />
          </button>

          <a
            href={PERSONAL_INFO.resumePath}
            download="Shravan_Katkar_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-3 text-xs font-mono text-[#8E8C86] transition-all hover:border-white/30 hover:text-white"
          >
            <FileDown className="h-3.5 w-3.5 text-[#FC6B2F]" />
            <span>RESUME (PDF)</span>
          </a>
        </div>
      </div>

      {/* 06. Bottom Minimal Scroll Indicator (z-[20]) */}
      <div ref={scrollIndicatorRef} className="relative z-[20] flex flex-col items-center gap-2">
        <span className="text-[9px] font-mono text-[#8E8C86]/70 tracking-[0.35em] uppercase">
          SCROLL
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#FC6B2F] via-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
