import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export interface GhostCursorProps {
  className?: string;
  style?: React.CSSProperties;
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  brightness?: number;
  color?: string;
  mixBlendMode?: string;
  edgeIntensity?: number;
  maxDevicePixelRatio?: number;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
  zIndex?: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = `
  uniform float iTime;
  uniform vec3  iResolution;
  uniform vec2  iMouse;
  uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
  uniform float iOpacity;
  uniform float iScale;
  uniform vec3  iBaseColor;
  uniform float iBrightness;
  uniform float iEdgeIntensity;
  varying vec2  vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for(int i = 0; i < 5; i++){ v += a * noise(p); p = m * p * 2.0; a *= 0.5; }
    return v;
  }
  vec3 tint1(vec3 b){ return mix(b, vec3(1.0), 0.15); }
  vec3 tint2(vec3 b){ return mix(b, vec3(0.8, 0.9, 1.0), 0.25); }

  vec4 blob(vec2 p, vec2 mp, float intensity, float activity){
    vec2 q = vec2(fbm(p*iScale + iTime*0.1), fbm(p*iScale + vec2(5.2,1.3) + iTime*0.1));
    vec2 r = vec2(fbm(p*iScale + q*1.5 + iTime*0.15), fbm(p*iScale + q*1.5 + vec2(8.3,2.8) + iTime*0.15));
    float smoke  = fbm(p*iScale + r*0.8);
    float radius = 0.5 + 0.3 / iScale;
    float dist   = 1.0 - smoothstep(0.0, radius * activity, length(p - mp));
    float alpha  = pow(smoke, 2.5) * dist;
    vec3 c1 = tint1(iBaseColor), c2 = tint2(iBaseColor);
    vec3 col = mix(c1, c2, sin(iTime*0.5)*0.5+0.5);
    return vec4(col * alpha * intensity, alpha * intensity);
  }

  void main(){
    vec2 uv    = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x/iResolution.y, 1.0);
    vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x/iResolution.y, 1.0);
    vec3  cAcc = vec3(0.0);
    float aAcc = 0.0;
    vec4 b0 = blob(uv, mouse, 1.0, iOpacity);
    cAcc += b0.rgb; aAcc += b0.a;
    for(int i = 0; i < MAX_TRAIL_LENGTH; i++){
      vec2 pm = (iPrevMouse[i]*2.0-1.0) * vec2(iResolution.x/iResolution.y, 1.0);
      float t = pow(1.0 - float(i)/float(MAX_TRAIL_LENGTH), 2.0);
      if(t > 0.01){ vec4 bt = blob(uv, pm, t*0.8, iOpacity); cAcc += bt.rgb; aAcc += bt.a; }
    }
    cAcc *= iBrightness;
    vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
    float edge = min(min(uv01.x, 1.0-uv01.x), min(uv01.y, 1.0-uv01.y));
    float mask = mix(1.0 - clamp(iEdgeIntensity,0.0,1.0), 1.0, clamp(edge*2.0,0.0,1.0));
    gl_FragColor = vec4(cAcc, clamp(aAcc * iOpacity * mask, 0.0, 1.0));
  }
`;

const GRAIN_SHADER = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    iTime: { value: 0 },
    intensity: { value: 0.025 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float iTime; uniform float intensity; varying vec2 vUv;
    float h1(float n){ return fract(sin(n)*43758.5453); }
    void main(){ vec4 c=texture2D(tDiffuse,vUv); float n=h1(vUv.x*1000.0+vUv.y*2000.0+iTime)*2.0-1.0; c.rgb+=n*intensity*c.rgb; gl_FragColor=c; }
  `,
};

const STRAIGHT_ALPHA_SHADER = {
  uniforms: { tDiffuse: { value: null as THREE.Texture | null } },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; varying vec2 vUv;
    void main(){ vec4 c=texture2D(tDiffuse,vUv); float a=max(c.a,1e-5); gl_FragColor=vec4(clamp(c.rgb/a,0.0,1.0),c.a); }
  `,
};

export const GhostCursor: React.FC<GhostCursorProps> = ({
  className = '',
  style = {},
  trailLength = 35,
  inertia = 0.4,
  grainIntensity = 0.025,
  bloomStrength = 0.08,
  bloomRadius = 0.8,
  bloomThreshold = 0.04,
  brightness = 0.75,
  color = '#FC6B2F',
  mixBlendMode = 'screen',
  edgeIntensity = 0,
  maxDevicePixelRatio = 0.5,
  fadeDelayMs = 800,
  fadeDurationMs = 1200,
  zIndex = 5,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const check = () => {
      setCanRender(
        window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!canRender) return;
    const container = containerRef.current;
    if (!container) return;

    const parent = container.parentElement || container;
    let alive = true;
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isTouchDevice,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    if (mixBlendMode) renderer.domElement.style.mixBlendMode = mixBlendMode;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo = new THREE.PlaneGeometry(2, 2);
    const trailLen = Math.max(1, Math.floor(trailLength));

    const history: THREE.Vector2[] = Array.from(
      { length: trailLen },
      () => new THREE.Vector2(0.5, 0.5)
    );
    let historyHead = 0;

    const baseCol = new THREE.Color(color);
    const mat = new THREE.ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: trailLen },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: history.map((v) => v.clone()) },
        iOpacity: { value: 1 },
        iScale: { value: 1 },
        iBaseColor: {
          value: new THREE.Vector3(baseCol.r, baseCol.g, baseCol.b),
        },
        iBrightness: { value: brightness },
        iEdgeIntensity: { value: edgeIntensity },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(geo, mat);
    scene.add(quad);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );
    composer.addPass(bloom);

    const grainPass = new ShaderPass({
      ...GRAIN_SHADER,
      uniforms: {
        tDiffuse: { value: null },
        iTime: { value: 0 },
        intensity: { value: grainIntensity },
      },
    });
    composer.addPass(grainPass);
    composer.addPass(new ShaderPass(STRAIGHT_ALPHA_SHADER));

    let ready = false;
    const resize = () => {
      if (!alive) return;
      const rect = parent.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) { ready = false; return; }

      const rawDPR = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);
      const totalPx = w * h * rawDPR * rawDPR;
      const maxPx = isTouchDevice ? 900000 : 1300000;
      const dpr =
        rawDPR *
        (totalPx <= maxPx
          ? 1
          : Math.max(0.5, Math.min(1, Math.sqrt(maxPx / totalPx))));

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      (composer as any).setPixelRatio?.(dpr);
      composer.setSize(w, h);

      const rW = Math.max(1, Math.floor(w * dpr));
      const rH = Math.max(1, Math.floor(h * dpr));
      mat.uniforms.iResolution.value.set(rW, rH, 1);
      mat.uniforms.iScale.value = Math.max(
        0.5,
        Math.min(2, Math.min(w, h) / 600)
      );
      bloom.setSize(rW, rH);
      ready = true;
    };
    resize();
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let isIntersecting = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          start();
        } else if (raf != null) {
          cancelAnimationFrame(raf);
          raf = null;
          loopRunning = false;
        }
      },
      { threshold: 0 }
    );
    io.observe(parent);

    const target = new THREE.Vector2(0.5, 0.5);
    const velocity = new THREE.Vector2(0, 0);
    let opacity = 1;
    let lastActive = performance.now();
    let interacting = false;
    let loopRunning = false;
    let raf: number | null = null;

    const delayMs = fadeDelayMs ?? (isTouchDevice ? 500 : 1000);
    const durMs = fadeDurationMs ?? (isTouchDevice ? 1000 : 1500);
    const t0 = performance.now();

    const loop = () => {
      if (!alive || !isIntersecting) {
        loopRunning = false;
        raf = null;
        return;
      }
      if (!ready) { raf = requestAnimationFrame(loop); return; }

      const now = performance.now();
      const sec = (now - t0) / 1000;

      if (interacting) {
        velocity.set(
          target.x - mat.uniforms.iMouse.value.x,
          target.y - mat.uniforms.iMouse.value.y
        );
        mat.uniforms.iMouse.value.copy(target);
        opacity = 1;
      } else {
        velocity.multiplyScalar(inertia);
        if (velocity.lengthSq() > 1e-6) {
          mat.uniforms.iMouse.value.add(velocity);
        }
        const idle = now - lastActive;
        if (idle > delayMs) {
          opacity = Math.max(0, 1 - Math.min(1, (idle - delayMs) / durMs));
        }
      }

      historyHead = (historyHead + 1) % trailLen;
      history[historyHead].copy(mat.uniforms.iMouse.value);
      const prevArr = mat.uniforms.iPrevMouse.value as THREE.Vector2[];
      for (let i = 0; i < trailLen; i++) {
        prevArr[i].copy(history[(historyHead - i + trailLen) % trailLen]);
      }

      mat.uniforms.iOpacity.value = opacity;
      mat.uniforms.iTime.value = sec;
      if (grainPass.uniforms.iTime) grainPass.uniforms.iTime.value = sec;

      composer.render();

      if (!interacting && opacity <= 0.001) {
        loopRunning = false;
        raf = null;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!loopRunning) {
        loopRunning = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const updateCoords = (cx: number, cy: number) => {
      const rect = parent.getBoundingClientRect();
      const nx = clamp((cx - rect.left) / Math.max(1, rect.width), 0, 1);
      const ny = clamp(1 - (cy - rect.top) / Math.max(1, rect.height), 0, 1);
      target.set(nx, ny);
      interacting = true;
      lastActive = performance.now();
      start();
    };

    const onPointerMove = (e: PointerEvent) => updateCoords(e.clientX, e.clientY);
    const onPointerEnter = (e: PointerEvent) => updateCoords(e.clientX, e.clientY);
    const onPointerLeave = () => {
      interacting = false;
      lastActive = performance.now();
      start();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      interacting = false;
      lastActive = performance.now();
      start();
    };

    parent.addEventListener('pointermove', onPointerMove as EventListener, { passive: true });
    parent.addEventListener('pointerenter', onPointerEnter as EventListener, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave as EventListener, { passive: true });

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    start();

    return () => {
      alive = false;
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener('pointermove', onPointerMove as EventListener);
      parent.removeEventListener('pointerenter', onPointerEnter as EventListener);
      parent.removeEventListener('pointerleave', onPointerLeave as EventListener);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);

      scene.clear();
      geo.dispose();
      mat.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [
    canRender,
    trailLength,
    inertia,
    grainIntensity,
    bloomStrength,
    bloomRadius,
    bloomThreshold,
    brightness,
    color,
    mixBlendMode,
    edgeIntensity,
    maxDevicePixelRatio,
    fadeDelayMs,
    fadeDurationMs,
  ]);

  if (!canRender) return null;

  return (
    <div
      ref={containerRef}
      className={`ghost-cursor ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default GhostCursor;
