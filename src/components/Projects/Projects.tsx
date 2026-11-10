import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Github, Terminal, Sparkles, Layers, Cpu, Database, Wifi, Shield, Eye, Flame, Activity } from 'lucide-react';
import { FEATURED_PROJECTS, Project } from '../../data/projects';
import { ProjectModal } from '../ProjectModal/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  n: string;
  part: string;
  componentLabel: string;
  tag: string;
  d: string;
  s: string[];
  link?: string;
  cta?: string;
  dataId?: string;
}

// ─── Project Sequence: VaultAI → A.L.I.A.S. → CivicMind AI → AgriMind AI → CineSense → Others ───
const PROJECTS: ProjectItem[] = [
  {
    n: 'VaultAI',
    part: 'ssd',
    componentLabel: 'SSD [LOCAL VECTOR STORE]',
    tag: 'Offline RAG Private Knowledge Platform',
    d: 'Private document Q&A that runs fully on your local machine with zero cloud dependency. Benchmarked at 0.9538 Hit@1 and 0.9769 MRR retrieval accuracy across enterprise documentation.',
    s: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Ollama', 'Llama 3', 'Streamlit'],
    link: 'https://github.com/ShravanKatkar/VaultAI',
    cta: 'Source Code',
    dataId: 'vaultai',
  },
  {
    n: 'A.L.I.A.S.',
    part: 'wifi',
    componentLabel: 'WIFI [MULTI-LLM ROUTING BUS]',
    tag: 'Voice-Activated Multi-LLM Desktop Assistant',
    d: 'Intelligent desktop assistant connecting multiple LLM providers (Groq, Gemini, OpenAI) with streamed responses, persistent conversation memory, speech interaction, and native OS automation.',
    s: ['Python', 'FastAPI', 'Electron', 'LangChain', 'Groq', 'Gemini', 'SQLite', 'Socket.IO'],
    link: 'https://github.com/ShravanKatkar',
    cta: 'Source Code',
    dataId: 'alias',
  },
  {
    n: 'CivicMind AI',
    part: 'webcam',
    componentLabel: 'WEBCAM [VISION PERCEPTION NODE]',
    tag: 'Multi-Modal Sanitation Worker Safety Platform',
    d: 'Detectors vs. deciders: Computer vision detects hazardous conditions, while a deterministic rule engine makes safety-critical decisions. Finalist at Hack the Horizon Hackathon.',
    s: ['YOLOv8', 'BLIP', 'Whisper', 'ChromaDB RAG', 'FastAPI', 'React', 'Tailwind', 'Leaflet'],
    link: 'https://civic-mind-9uve.vercel.app/',
    cta: 'Live Demo',
    dataId: 'civicmind',
  },
  {
    n: 'AgriMind AI',
    part: 'battery',
    componentLabel: 'BATTERY [FIELD POWER CELL]',
    tag: 'Vision Pathogen Diagnosis & Micro-Climate Advisory',
    d: 'Dual-engine platform combining a lightweight CNN leaf pathogen classifier with an offline-capable RAG advisory database and micro-climate yield forecasting.',
    s: ['Python', 'FastAPI', 'PyTorch', 'CNN', 'React', 'ChromaDB', 'Tailwind CSS', 'Docker'],
    link: 'https://github.com/ShravanKatkar',
    cta: 'Source Code',
    dataId: 'agrimind',
  },
  {
    n: 'CineSense',
    part: 'gpu',
    componentLabel: 'GPU [TENSOR COMPUTE DIE]',
    tag: 'Hybrid AI Movie Discovery & Grounded RAG Assistant',
    d: '5-tier recommendation engine (ALS, item-item CF, TF-IDF, embedding kNN, popularity) fused with Reciprocal Rank Fusion + MMR. An autonomous ReAct agent on Llama-3.3-70B grounds answers with zero hallucinations.',
    s: ['FastAPI', 'React 19', 'Vite', 'PostgreSQL', 'pgvector', 'Redis', 'Docker', 'Groq'],
    link: 'https://cinesense-app.onrender.com/',
    cta: 'Live Demo',
    dataId: 'cinesense',
  },
  {
    n: 'CodeGuard',
    part: 'cpu',
    componentLabel: 'CPU [NEURAL REASONING CORE]',
    tag: 'Multi-Agent PR Review with Fine-Tuned Security Agent',
    d: 'LangGraph agents review code diffs in parallel; the security agent is a QLoRA fine-tuned Llama 3.1 8B served via Groq with codebase AST RAG and interactive review metrics.',
    s: ['LangGraph', 'QLoRA', 'Llama 3.1 8B', 'Groq', 'FastAPI', 'Docker', 'Streamlit'],
    link: 'https://github.com/ShravanKatkar',
    cta: 'Source Code',
    dataId: 'codeguard',
  },
  {
    n: 'EvalForge',
    part: 'ram',
    componentLabel: 'RAM [HIGH-BANDWIDTH EVAL MEMORY]',
    tag: 'LLM Benchmarking & DPO Preference Harness',
    d: 'Side-by-side model evaluation and comparison framework exporting preference pairs for Direct Preference Optimization (DPO) fine-tuning.',
    s: ['Groq', 'OpenAI API', 'DPO Export', 'Streamlit', 'Python', 'Evaluation'],
    link: 'https://github.com/ShravanKatkar',
    cta: 'Source Code',
    dataId: 'evalforge',
  },
  {
    n: 'TransitAI',
    part: 'fan',
    componentLabel: 'FAN [LOW-LATENCY DUAL TURBINE]',
    tag: 'Smart Bus Fleet Tracking & AI Pass Management',
    d: 'Production-style transit platform: real-time GPS tracking map, dynamic route planner, digital QR ticketing, role-based dashboards, and multilingual conversational AI assistant.',
    s: ['React', 'TypeScript', 'Vite', 'Tailwind', 'TanStack Query', 'Leaflet', 'Recharts'],
    link: 'https://github.com/ShravanKatkar',
    cta: 'Source Code',
    dataId: 'transitai',
  },
];

const STACK: Record<string, string[]> = {
  'PROGRAMMING': ['Python', 'C', 'HTML', 'CSS'],
  'ARTIFICIAL INTELLIGENCE': [
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Large Language Models (LLMs)',
    'RAG',
    'NLP',
    'Computer Vision',
  ],
  'FRAMEWORKS AND LIBRARIES': ['FastAPI', 'LangChain', 'YOLOv8', 'BLIP', 'Ollama'],
  'BACKEND AND DATABASES': ['REST APIs', 'WebSockets', 'JSON', 'ChromaDB', 'SQLite', 'MySQL'],
  'DEVELOPMENT AND TESTING': ['Git', 'GitHub', 'Pytest', 'Postman', 'Regression Testing'],
};

const ME = {
  name: 'Shravan Katkar',
  role: 'AI Engineer',
  gh: 'https://github.com/shravankatkar',
};

interface PartObj {
  id: string;
  g: THREE.Group;
  base: THREE.Vector3;
  d: THREE.Vector3;
  cur: THREE.Vector3;
  fm?: THREE.MeshBasicMaterial;
  lm?: THREE.LineBasicMaterial;
}

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bigTextRef = useRef<HTMLDivElement | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeState, setActiveState] = useState<number>(-1);

  // Helper to open case study modal
  const handleOpenModal = (dataId?: string) => {
    if (!dataId) return;
    const match = FEATURED_PROJECTS.find((p) => p.id === dataId);
    if (match) {
      setSelectedProject(match);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const big = bigTextRef.current;
    if (!canvas || !container || !big) return;

    let isMounted = true;
    let animId: number = 0;

    // ─── Three.js Scene Setup with Mobile-Aware FOV ───
    const isMobileInitial = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobileInitial ? 52 : 38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    // ─── Laptop Group & Hinge (Elevated and Scaled on Mobile) ───
    const laptop = new THREE.Group();
    if (isMobileInitial) {
      laptop.scale.set(0.78, 0.78, 0.78);
      laptop.position.y = 0.85;
    }
    scene.add(laptop);

    const hinge = new THREE.Group();
    hinge.position.set(0, 0.27, -1);
    laptop.add(hinge);

    const parts: Record<string, PartObj> = {};

    // Colors matching our dark ember portfolio theme
    const GREY = new THREE.Color(0x71717a);
    const DIM = new THREE.Color(0x3f3f46);
    const EMBER = new THREE.Color(0xfc6b2f);
    const BG = new THREE.Color(0x09090b);
    const LIGHT = new THREE.Color(0x1c1917);

    function mk(
      id: string,
      geo: THREE.BufferGeometry,
      p: [number, number, number],
      d: [number, number, number],
      parent: THREE.Group,
      tex?: THREE.Texture
    ): PartObj {
      const g = new THREE.Group();
      const o: PartObj = {
        id,
        g,
        base: new THREE.Vector3(...p),
        d: new THREE.Vector3(...d),
        cur: new THREE.Vector3(),
      };

      if (tex) {
        g.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex })));
      } else {
        o.fm = new THREE.MeshBasicMaterial({
          color: BG,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        o.lm = new THREE.LineBasicMaterial({ color: GREY });
        g.add(
          new THREE.Mesh(geo, o.fm),
          new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), o.lm)
        );
      }

      g.position.copy(o.base);
      parent.add(g);
      parts[id] = o;
      return o;
    }

    const B = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);

    // Hardware Components (Dismantled Structure)
    mk('bottom', B(3, 0.1, 2), [0, 0, 0], [0, -0.9, 0], laptop);
    mk('board', B(2.7, 0.04, 1.8), [0, 0.09, 0], [0, -0.35, 0], laptop);
    mk('battery', B(1.1, 0.08, 0.7), [-0.85, 0.13, 0.55], [-1, 0.5, 0.9], laptop);
    mk('ssd', B(0.6, 0.04, 0.2), [0.95, 0.12, 0.75], [1.3, 0.6, 1], laptop);
    mk('ram', B(0.6, 0.04, 0.2), [0.95, 0.12, 0.4], [1.5, 0.9, 0.4], laptop);
    mk('wifi', B(0.35, 0.03, 0.15), [0, 0.12, 0.5], [0, 1.4, 0.9], laptop);
    mk('gpu', B(0.9, 0.06, 0.6), [0.9, 0.13, -0.45], [1.2, 1, -0.9], laptop);
    mk('cpu', B(0.5, 0.05, 0.5), [0, 0.12, -0.4], [0, 1.1, -0.8], laptop);

    // Cooling Fan with Spoke Blades
    const fan = mk(
      'fan',
      new THREE.CylinderGeometry(0.38, 0.38, 0.08, 28),
      [-0.85, 0.13, -0.4],
      [-1.1, 1, -0.9],
      laptop
    );
    {
      const v: number[] = [];
      for (let k = 0; k < 8; k++) {
        const a = (k * Math.PI) / 4;
        const c = Math.cos(a);
        const s = Math.sin(a);
        v.push(0.1 * c, 0.041, 0.1 * s, 0.34 * c, 0.041, 0.34 * s);
      }
      const gm = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
      if (fan.lm) {
        fan.g.add(new THREE.LineSegments(gm, fan.lm));
      }
    }

    // Keyboard Deck with Keycap Grid Wireframe
    const deck = mk('deck', B(3, 0.08, 2), [0, 0.2, 0], [3.6, 0.9, 0.2], laptop);
    {
      const v: number[] = [];
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 13; c++) {
          const x = -1.28 + c * 0.2;
          const z = -0.7 + r * 0.2;
          const k = 0.16;
          v.push(
            x, 0.041, z, x + k, 0.041, z,
            x + k, 0.041, z, x + k, 0.041, z + k,
            x + k, 0.041, z + k, x, 0.041, z + k,
            x, 0.041, z + k, x, 0.041, z
          );
        }
      }
      v.push(
        -0.45, 0.041, 0.45, 0.45, 0.041, 0.45,
        0.45, 0.041, 0.45, 0.45, 0.041, 0.8,
        0.45, 0.041, 0.8, -0.45, 0.041, 0.8,
        -0.45, 0.041, 0.8, -0.45, 0.041, 0.45
      );
      if (deck.lm) {
        deck.g.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(v, 3)), deck.lm));
      }
    }

    // Display Lid Assembly
    mk('shell', B(3, 2, 0.06), [0, 1, 0], [0, 0, -0.9], hinge);
    mk('panel', B(2.9, 1.9, 0.03), [0, 1, 0.05], [0, 0, 0.45], hinge);

    const wc = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16);
    wc.rotateX(Math.PI / 2);
    mk('webcam', wc, [0, 1.9, 0.08], [0, 0.35, 0.9], hinge);

    // ─── Dynamic Screen Canvas Texture ───
    const sc = document.createElement('canvas');
    sc.width = 1024;
    sc.height = 683;
    const ctx = sc.getContext('2d');
    const tex = new THREE.CanvasTexture(sc);
    tex.colorSpace = THREE.SRGBColorSpace;
    mk('screen', new THREE.PlaneGeometry(2.8, 1.8), [0, 1, 0.075], [0, 0, 0.45], hinge, tex);

    let state: number = -1;
    let fade = 1;
    let focus: string | null = null;

    function chipRow(list: string[], x0: number, y0: number) {
      if (!ctx) return y0;
      let x = x0;
      let y = y0;
      ctx.font = '26px monospace';
      list.forEach((t) => {
        const w = ctx.measureText(t).width + 28;
        if (x + w > 980) {
          x = x0;
          y += 54;
        }
        ctx.strokeStyle = '#FC6B2F';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, w, 42);
        ctx.fillStyle = '#f4f1ea';
        ctx.fillText(t, x + 14, y + 30);
        x += w + 12;
      });
      return y + 54;
    }

    function drawScreen(t: number) {
      if (!ctx) return;
      fade = Math.min(1, fade + 0.05);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, 1024, 683);

      ctx.globalAlpha = fade;
      const off = (1 - fade) * 40;
      ctx.font = '24px monospace';
      ctx.fillStyle = '#FC6B2F';

      if (state >= 0 && state < 99) {
        const p = PROJECTS[state];
        ctx.fillText(`$ open ${p.n.toLowerCase().replace(/[^a-z0-9]/g, '-')}`, 50, 70 + off);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 68px monospace';
        ctx.fillText(p.n.toUpperCase(), 50, 165 + off);
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '24px monospace';
        ctx.fillText(p.tag.slice(0, 56), 50, 218 + off);
        chipRow(p.s, 50, 275 + off);
      } else if (state === 99) {
        ctx.fillText('$ cat stack.json', 50, 70 + off);
        let y = 125 + off;
        Object.entries(STACK).forEach(([k, v]) => {
          if (!ctx) return;
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 24px monospace';
          ctx.fillText(k, 50, y);
          y = chipRow(v, 50, y + 14);
        });
      } else {
        ctx.fillText('$ whoami', 50, 70);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 70px monospace';
        ctx.fillText(ME.name.toUpperCase(), 50, 190);
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '34px monospace';
        ctx.fillText(ME.role, 50, 250);
        if (Math.floor(t * 2) % 2) {
          ctx.fillStyle = '#FC6B2F';
          ctx.fillRect(50, 290, 16, 34);
        }
      }
      tex.needsUpdate = true;
    }

    function setState(s: number) {
      if (s === state) return;
      state = s;
      setActiveState(s);
      fade = 0;
      focus = s >= 0 && s < 99 ? PROJECTS[s].part : s === 99 ? 'all' : null;

      const txt =
        s >= 0 && s < 99
          ? PROJECTS[s].n
          : s === 99
          ? 'Stack'
          : s === -2
          ? ME.role
          : s === -3
          ? "Let's build"
          : ME.name;

      if (big) {
        const isMob = window.innerWidth < 768;
        big.textContent = txt;
        big.style.fontSize = Math.min(isMob ? 10 : 14, 90 / (txt.length * 0.62)) + 'vw';
        gsap.fromTo(big, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 0.08, duration: 0.5, ease: 'power2.out' });
      }
    }

    // ScrollTrigger triggers per section
    const sectionEls = container.querySelectorAll<HTMLElement>('section[data-s]');
    const stInstances: ScrollTrigger[] = [];

    sectionEls.forEach((el) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => {
          if (self.isActive && el.dataset.s !== undefined) {
            setState(+el.dataset.s);
          }
        },
      });
      stInstances.push(st);
    });

    // Ensure 3D canvas and big text are ONLY visible when inside #projects
    const projectSectionVisibilityST = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        const isInside = self.isActive;
        if (canvas) {
          canvas.style.opacity = isInside ? '1' : '0';
          canvas.style.visibility = isInside ? 'visible' : 'hidden';
        }
        if (big) {
          big.style.opacity = isInside ? '0.08' : '0';
          big.style.visibility = isInside ? 'visible' : 'hidden';
        }
      },
    });
    stInstances.push(projectSectionVisibilityST);

    // Initial check on load
    const rect = container.getBoundingClientRect();
    const isInitiallyInView = rect.top < window.innerHeight && rect.bottom > 0;
    canvas.style.opacity = isInitiallyInView ? '1' : '0';
    canvas.style.visibility = isInitiallyInView ? 'visible' : 'hidden';
    big.style.opacity = isInitiallyInView ? '0.08' : '0';
    big.style.visibility = isInitiallyInView ? 'visible' : 'hidden';

    // ─── Scroll Keyframes & Camera Choreography ───
    const K = [
      { p: [0, 3.2, 8.5], r: -0.6, lid: 1.55, ex: 0 },
      { p: [0, 2.6, 6.2], r: -0.5, lid: -0.25, ex: 0 },
    ];
    PROJECTS.forEach((_, i) => {
      const s = i % 2 ? -1 : 1;
      K.push({ p: [s * 0.8, 4, 9.2], r: -s * 0.55, lid: -0.25, ex: 1 });
    });
    K.push({ p: [0, 4.4, 10], r: Math.PI * 2 - 0.4, lid: -0.25, ex: 1 });
    K.push({ p: [0, 3.4, 7], r: Math.PI * 2 - 0.6, lid: -0.2, ex: 0 });

    const look = new THREE.Vector3(0, -0.2, 0);
    const E = { e: 0 };

    camera.position.set(K[0].p[0], K[0].p[1], K[0].p[2]);
    hinge.rotation.x = K[0].lid;
    laptop.rotation.y = K[0].r;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.3,
      },
    });

    for (let k = 1; k < K.length; k++) {
      const a = K[k];
      tl.to(camera.position, { x: a.p[0], y: a.p[1], z: a.p[2], duration: 1 }, k - 1)
        .to(laptop.rotation, { y: a.r, duration: 1 }, k - 1)
        .to(hinge.rotation, { x: a.lid, duration: 1 }, k - 1)
        .to(E, { e: a.ex, duration: 1 }, k - 1);
    }

    // ─── Resize Handler (Responsive FOV & Placement) ───
    const handleResize = () => {
      const isMob = window.innerWidth < 768;
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = isMob ? 52 : 38;
      camera.updateProjectionMatrix();
      laptop.scale.set(isMob ? 0.78 : 1, isMob ? 0.78 : 1, isMob ? 0.78 : 1);
      laptop.position.y = isMob ? 0.85 : 0;
    };
    window.addEventListener('resize', handleResize);

    const PULL = new THREE.Vector3(0, 0.55, 0.9);
    const tmp = new THREE.Vector3();
    const clock = new THREE.Clock();

    setState(-1);

    // ─── Render Loop ───
    const animate = () => {
      if (!isMounted) return;
      animId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      drawScreen(t);

      Object.values(parts).forEach((o) => {
        const f = focus === 'all' || focus === o.id;
        tmp.copy(o.d).multiplyScalar(E.e);
        if (f && focus !== 'all') {
          tmp.addScaledVector(PULL, E.e);
        }
        o.cur.lerp(tmp, 0.12);
        o.g.position.copy(o.base).add(o.cur);

        if (o.lm && o.fm) {
          const on = f && E.e > 0.4;
          o.lm.color.lerp(on ? EMBER : E.e > 0.4 ? DIM : GREY, 0.15);
          o.fm.color.lerp(on ? LIGHT : BG, 0.15);
        }
      });

      if (fan) {
        fan.g.rotation.y = t * (0.5 + E.e * 3);
      }

      camera.lookAt(look);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      stInstances.forEach((st) => st.kill());
      tl.kill();
      renderer.dispose();
      tex.dispose();
    };
  }, []);

  return (
    <div id="projects" ref={containerRef} className="relative w-full bg-[#09090b] text-[#f4f1ea] select-none">
      {/* ─── STICKY 3D MACHINE CONTAINER (PINNED STRICTLY INSIDE #PROJECTS) ─── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-[1]">
        {/* ─── BIG BACKGROUND GHOST TEXT ─── */}
        <div
          ref={bigTextRef}
          className="absolute top-[4vh] left-[3vw] z-0 font-extrabold whitespace-nowrap leading-none tracking-tighter uppercase pointer-events-none text-white/5 select-none font-mono transition-opacity duration-300"
        />

        {/* ─── THREE.JS 3D CANVAS (SCOPED ONLY TO #PROJECTS) ─── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1] transition-opacity duration-300"
        />

        {/* ─── FLOATING SCROLL HINT (SCOPED ONLY TO #PROJECTS) ─── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono text-[#FC6B2F] tracking-widest uppercase pointer-events-none animate-bounce shadow-lg">
          <span>SCROLL TO DISMANTLE MACHINE</span>
          <span>↓</span>
        </div>
      </div>

      {/* ─── SCROLLABLE EDITORIAL SECTIONS IN LIQUID GLASS LAYOUT ─── */}
      <div className="relative z-[2] -mt-[100vh] flex flex-col w-full">

        {/* 00 / INTRO */}
        <section className="relative min-h-screen flex items-end justify-center md:justify-start px-3 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16" data-s="-1">
          <div className="relative w-full max-w-[460px] p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-white/[0.09] via-[#14141a]/85 to-[#09090d]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)] hover:border-[#FC6B2F]/60 hover:shadow-[0_0_35px_rgba(252,107,47,0.2),0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 flex flex-col gap-3 group">
            {/* Liquid Specular Glare */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

            {/* Corner reticles */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#FC6B2F] pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FC6B2F] animate-pulse" />
              <div className="text-[11px] font-mono tracking-widest text-[#FC6B2F] uppercase">00 // HARDWARE ARCHITECTURE</div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-mono uppercase text-white tracking-tight">{ME.role}</h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
              GenAI · RAG systems · Multi-agent swarms · Fullstack. Scroll down and the machine comes apart, pulling out one hardware component per project.
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section className="relative min-h-screen flex items-end justify-center md:justify-end px-3 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16" data-s="-2">
          <div className="relative w-full max-w-[460px] p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-white/[0.09] via-[#14141a]/85 to-[#09090d]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)] hover:border-[#FC6B2F]/60 hover:shadow-[0_0_35px_rgba(252,107,47,0.2),0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 flex flex-col gap-3 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#FC6B2F] pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FC6B2F] animate-pulse" />
              <div className="text-[11px] font-mono tracking-widest text-[#FC6B2F] uppercase">ABOUT // PHILOSOPHY</div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-mono uppercase text-white tracking-tight">Built to run hot.</h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
              Final-year CS student in Pune building production-minded AI systems. Open to GenAI / LLM / RAG engineering internships and research.
            </p>
          </div>
        </section>

        {/* ─── THE 8 FEATURED PROJECTS IN STRICT SEQUENCE (LIQUID GLASS LAYOUT) ─── */}
        {PROJECTS.map((p, i) => {
          const isRight = i % 2 === 1;
          return (
            <section
              key={p.n}
              className={`relative min-h-screen flex items-end ${isRight ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} px-3 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16`}
              data-s={i}
            >
              {/* LIQUID GLASS CARD CONTAINER */}
              <div className="relative w-full max-w-[480px] p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-white/[0.09] via-[#14141a]/85 to-[#09090d]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)] hover:border-[#FC6B2F]/60 hover:shadow-[0_0_35px_rgba(252,107,47,0.2),0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 flex flex-col gap-3 group">
                {/* Liquid Glass Highlight Sheen */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

                {/* Tactile Corner Reticles */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#FC6B2F] pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#FC6B2F] pointer-events-none" />

                {/* Header Metadata */}
                <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FC6B2F]" />
                    <span className="text-[11px] font-mono tracking-widest text-[#FC6B2F] uppercase font-bold">
                      PROJECT {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    STAGE ACTIVE
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-mono uppercase text-white tracking-tight group-hover:text-[#FC6B2F] transition-colors">
                    {p.n}
                  </h2>
                  <div className="text-xs font-mono font-bold text-amber-400/90 mt-1 leading-snug">
                    {p.tag}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-neutral-300 font-mono leading-relaxed">
                  {p.d}
                </p>

                {/* Frosted Liquid Glass Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.s.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[10px] font-mono text-neutral-200 backdrop-blur-md hover:bg-white/[0.12] hover:border-[#FC6B2F]/40 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Liquid Glass Component Callout Badge */}
                <div className="mt-2 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">DISMANTLED COMPONENT:</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FC6B2F]/15 text-[#FC6B2F] border border-[#FC6B2F]/40 font-bold font-mono text-[10px] tracking-wider uppercase shadow-[0_0_12px_rgba(252,107,47,0.2)]">
                    → {p.componentLabel}
                  </span>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2">
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-white to-[#F4F1EA] hover:from-[#FC6B2F] hover:to-[#ff8544] text-[#09090b] hover:text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                    >
                      <span>{p.cta || 'VIEW DEMO'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {p.dataId && (
                    <button
                      onClick={() => handleOpenModal(p.dataId)}
                      className="px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 text-xs font-mono text-white backdrop-blur-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FC6B2F]" />
                    </button>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* STACK */}
        <section className="relative min-h-screen flex items-end justify-center md:justify-start px-3 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16" data-s="99">
          <div className="relative w-full max-w-[480px] p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-white/[0.09] via-[#14141a]/85 to-[#09090d]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)] hover:border-[#FC6B2F]/60 hover:shadow-[0_0_35px_rgba(252,107,47,0.2),0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 flex flex-col gap-4 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#FC6B2F] pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FC6B2F] animate-pulse" />
              <div className="text-[11px] font-mono tracking-widest text-[#FC6B2F] uppercase">TECHNICAL SKILLS // UNDER THE HOOD</div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-mono uppercase text-white tracking-tight">Under the hood.</h2>

            <div className="space-y-3">
              {Object.entries(STACK).map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold">{k}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {v.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[10px] font-mono text-neutral-200 backdrop-blur-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="relative min-h-screen flex items-end justify-center md:justify-end px-3 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16" data-s="-3">
          <div className="relative w-full max-w-[460px] p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-white/[0.09] via-[#14141a]/85 to-[#09090d]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)] hover:border-[#FC6B2F]/60 hover:shadow-[0_0_35px_rgba(252,107,47,0.2),0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 flex flex-col gap-3 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#FC6B2F] pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FC6B2F] animate-pulse" />
              <div className="text-[11px] font-mono tracking-widest text-[#FC6B2F] uppercase">CONTACT // COLLABORATION</div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-mono uppercase text-white tracking-tight">Let&apos;s build.</h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
              Open to AI/ML engineering internships, research collaborations, and production web systems.
            </p>
            <a
              href={ME.gh}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FC6B2F] hover:bg-[#ff8544] text-[#09090b] font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(252,107,47,0.4)]"
            >
              <Github className="w-4 h-4" /> GITHUB REPOSITORY ↗
            </a>
          </div>
        </section>
      </div>

      {/* ─── CASE STUDY MODAL ─── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
