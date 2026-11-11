import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/socials';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GhostCursor } from '../GhostCursor/GhostCursor';
import { TextPressure } from '../TextPressure/TextPressure';

gsap.registerPlugin(ScrollTrigger);

const DUST_PARTICLES = [
  { size: 2.1, isEmber: true, top: 12, left: 8, duration: 6.2, delay: 0 },
  { size: 1.5, isEmber: false, top: 25, left: 82, duration: 7.4, delay: 0.6 },
  { size: 2.8, isEmber: false, top: 40, left: 15, duration: 5.8, delay: 1.2 },
  { size: 1.2, isEmber: true, top: 58, left: 91, duration: 8.1, delay: 1.8 },
  { size: 2.4, isEmber: false, top: 72, left: 24, duration: 6.9, delay: 2.4 },
  { size: 1.8, isEmber: false, top: 18, left: 64, duration: 5.5, delay: 3 },
  { size: 2.6, isEmber: true, top: 84, left: 45, duration: 7.8, delay: 3.6 },
  { size: 1.4, isEmber: false, top: 33, left: 37, duration: 6.1, delay: 4.2 },
  { size: 2.2, isEmber: false, top: 67, left: 78, duration: 8.5, delay: 4.8 },
  { size: 1.6, isEmber: true, top: 50, left: 6, duration: 5.2, delay: 5.4 },
  { size: 2.5, isEmber: false, top: 28, left: 95, duration: 7.1, delay: 6 },
  { size: 1.3, isEmber: false, top: 88, left: 12, duration: 6.6, delay: 6.6 },
  { size: 2.0, isEmber: true, top: 15, left: 48, duration: 8.0, delay: 7.2 },
  { size: 1.7, isEmber: false, top: 44, left: 71, duration: 5.9, delay: 7.8 },
  { size: 2.3, isEmber: false, top: 79, left: 58, duration: 7.3, delay: 8.4 },
  { size: 1.1, isEmber: true, top: 62, left: 31, duration: 6.4, delay: 9 },
  { size: 2.7, isEmber: false, top: 92, left: 84, duration: 8.3, delay: 9.6 },
  { size: 1.9, isEmber: false, top: 38, left: 52, duration: 5.6, delay: 10.2 },
];

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const dustContainerRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const heroLineRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useReducedMotion();

  // Entrance timeline matching Jishnu Mondal
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Ambient center glow fade-in
      if (ambientGlowRef.current) {
        tl.to(ambientGlowRef.current, { opacity: 0.6, duration: 1.8, ease: 'power2.out' }, 0.2);
      }

      // Tagline
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.8 },
          0.6
        );
      }

      // Bottom-left bio narrative
      if (bioRef.current) {
        tl.fromTo(
          bioRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.9
        );
      }

      // Actions / CTAs
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.88, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.7)' },
          1.1
        );
      }

      // Dust particles
      if (dustContainerRef.current) {
        const dustEls = dustContainerRef.current.querySelectorAll('.dust');
        tl.fromTo(
          dustEls,
          { opacity: 0 },
          { opacity: 1, duration: 1.8, stagger: 0.05, ease: 'power2.out' },
          0.8
        );
      }

      // Scroll indicator
      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: 'power2.out' },
          1.6
        );
      }

      // Parallax scrub on scroll
      if (ambientGlowRef.current && heroRef.current) {
        gsap.to(ambientGlowRef.current, {
          opacity: 0.2,
          y: -60,
          scale: 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: '75% top',
            end: '100% top',
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Mouse & Touch Parallax for ambient glow and dust particles
  useEffect(() => {
    if (!heroRef.current || reducedMotion) return;

    const handleMove = (clientX: number, clientY: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const normX = (clientX / w - 0.5) * 2;
      const normY = (clientY / h - 0.5) * 2;

      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
          x: 40 * normX,
          y: 25 * normY,
          duration: 1.2,
          ease: 'power2.out',
        });
      }

      if (dustContainerRef.current) {
        const dustEls = dustContainerRef.current.querySelectorAll('.dust');
        dustEls.forEach((el, index) => {
          gsap.to(el, {
            x: normX * (2 + 0.8 * index),
            y: normY * (1.5 + 0.6 * index),
            duration: 1.8 + 0.08 * index,
            ease: 'power2.out',
          });
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onReset = () => {
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, { x: 0, y: 0, duration: 1.8, ease: 'power2.out' });
      }
      if (dustContainerRef.current) {
        const dustEls = dustContainerRef.current.querySelectorAll('.dust');
        dustEls.forEach((el) => {
          gsap.to(el, { x: 0, y: 0, duration: 2, ease: 'power2.out' });
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onReset, { passive: true });
    window.addEventListener('touchcancel', onReset, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onReset);
      window.removeEventListener('touchcancel', onReset);
    };
  }, [reducedMotion]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen h-[100svh] min-h-[100svh] overflow-hidden select-none touch-pan-y"
      style={{ background: '#111111' }}
    >
      {/* 01. WebGL Fluid Ember Ghost Cursor (z-[10] behind content) */}
      <GhostCursor
        color="#FC6B2F"
        brightness={0.75}
        edgeIntensity={0}
        trailLength={35}
        inertia={0.4}
        grainIntensity={0.025}
        bloomStrength={0.08}
        bloomRadius={0.8}
        bloomThreshold={0.04}
        fadeDelayMs={800}
        fadeDurationMs={1200}
        zIndex={10}
      />

      {/* 02. Fine Cinematic Noise Overlay (z-[5]) */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          opacity: 0.035,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '256px',
        }}
        aria-hidden="true"
      />

      {/* 03. Radial Vignette (z-[4]) */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, #111111 100%)',
        }}
        aria-hidden="true"
      />

      {/* 04. Smooth Center Glow with Parallax (z-[6]) */}
      <div
        ref={ambientGlowRef}
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] pointer-events-none opacity-0 z-[6]"
        style={{
          background:
            'radial-gradient(circle, rgba(252,107,47,0.18) 0%, rgba(252,107,47,0.05) 40%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        aria-hidden="true"
      />

      {/* 05. Ambient Dust Particles (z-[8]) */}
      <div ref={dustContainerRef} className="absolute inset-0 pointer-events-none z-[8]" aria-hidden="true">
        {DUST_PARTICLES.map((p, idx) => (
          <div
            key={idx}
            className="dust absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.isEmber ? 'rgba(252,107,47,0.5)' : 'rgba(255,255,255,0.2)',
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* 06. Top-Left Tagline (z-[40]) */}
      <div
        ref={taglineRef}
        className="absolute top-12 sm:top-20 md:top-24 left-4 sm:left-6 md:left-14 lg:left-20 z-[40] opacity-0 flex items-center gap-2 sm:gap-2.5 max-w-[calc(100vw-5rem)]"
      >
        <span className="w-[7px] h-[7px] shrink-0 rounded-full bg-[#FC6B2F] animate-pulse" />
        <span className="text-[10px] sm:text-[11px] text-[#B5B5B5] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium truncate font-sans">
          Engineering Intelligence · Shipping Impact
        </span>
      </div>

      {/* 07. Central Monolithic Identity with Interactive TextPressure (z-[15]) */}
      <div
        ref={centerRef}
        className="absolute top-[28%] sm:top-[30%] md:top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] pointer-events-none select-none w-full flex flex-col items-center justify-center px-4"
        aria-hidden="true"
      >
        <div className="w-full max-w-[700px] md:max-w-[850px] h-[52px] sm:h-[80px] md:h-[135px] relative flex items-center justify-center scale-y-[1.15] transform-gpu drop-shadow-[0_0_35px_rgba(252,107,47,0.3)]">
          <TextPressure
            text="SHRAVAN"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="rgba(255, 255, 255, 0.88)"
            minFontSize={16}
          />
        </div>

        <div ref={heroLineRef} className="mt-10 sm:mt-3 md:mt-4 text-center z-[20] px-2">
          <p className="hero-line text-[clamp(0.55rem,2.2vw,0.88rem)] md:text-[clamp(0.72rem,1.08vw,0.88rem)] font-extrabold tracking-[0.12em] sm:tracking-[0.25em] uppercase text-[#FC6B2F] drop-shadow-[0_0_20px_rgba(252,107,47,0.7)] font-sans">
            Crafting Intelligence That People Remember.
          </p>
        </div>
      </div>

      {/* 08. Bottom-Left Bio Narrative (z-[40]) */}
      <div
        ref={bioRef}
        className="absolute bottom-[20%] sm:bottom-[18%] md:top-[72%] md:bottom-auto left-4 sm:left-6 md:left-14 lg:left-20 z-[40] max-w-[calc(100vw-2rem)] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] opacity-0"
      >
        <p className="text-[11.5px] sm:text-[13px] md:text-[14px] text-[#B5B5B5] leading-[1.6] sm:leading-[1.8] font-normal tracking-wide font-sans">
          AI Engineer &amp; Creative Technologist engineering fast, scalable, and production-grade Generative AI systems. Based in Pune, India.
        </p>
      </div>

      {/* 09. Bottom-Right Magnetic CTAs (z-[40]) */}
      <div
        ref={ctaRef}
        className="absolute bottom-6 sm:bottom-[8%] md:bottom-[12%] left-4 right-4 sm:left-auto sm:right-6 md:right-14 lg:right-20 z-[40] opacity-0 flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-2.5 sm:gap-3.5"
      >
        <button
          onClick={() => scrollTo('projects')}
          className="relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-300 overflow-hidden cursor-pointer bg-[#FC6B2F] text-white hover:bg-[#e0581e] shadow-[0_0_25px_rgba(252,107,47,0.4)] px-4 sm:px-7 py-2.5 sm:py-3.5 text-[11px] sm:text-[13px] group touch-manipulation"
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-3 font-mono font-bold tracking-wider">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/30 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-3 h-3 text-white" />
            </span>
            Explore Work →
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo('contact')}
            className="relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-300 overflow-hidden cursor-pointer bg-transparent text-white border border-white/20 hover:border-[#FC6B2F]/60 hover:text-[#FC6B2F] px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-[12px] backdrop-blur-md touch-manipulation font-mono"
          >
            Let's Talk →
          </button>

          <a
            href={PERSONAL_INFO.resumePath}
            download="Shravan_Katkar_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[10px] sm:text-[11px] font-mono text-[#8E8C86] hover:text-white hover:border-white/30 transition-all backdrop-blur-md"
          >
            <FileDown className="w-3 h-3 text-[#FC6B2F]" />
            <span>CV</span>
          </a>
        </div>
      </div>

      {/* 10. Minimal Scroll Indicator (z-[45]) */}
      <div
        ref={scrollRef}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[45] hidden md:flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[9px] text-[#B5B5B5]/60 tracking-[0.35em] uppercase font-mono">
          Scroll
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div
            className="absolute w-full h-3 bg-[#FC6B2F]/70"
            style={{ animation: 'reveal-up 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* 11. Bottom Gradient Bleed into Next Section (z-[50]) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-[50]"
        style={{ background: 'linear-gradient(to top, #09090b 0%, transparent 100%)' }}
      />
    </section>
  );
};

export default Hero;
