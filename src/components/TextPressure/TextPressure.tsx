import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}

const distCalc = (d: number, maxD: number, minVal: number, maxVal: number) =>
  Math.max(minVal, maxVal - Math.abs((maxVal * d) / maxD) + minVal);

export const TextPressure: React.FC<TextPressureProps> = ({
  text = 'SHRAVAN',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = 'rgba(255, 255, 255, 0.88)',
  strokeColor = '#FC6B2F',
  className = '',
  minFontSize = 24,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState<number>(minFontSize);
  const [scaleY, setScaleY] = useState<number>(1);
  const [lineHeight, setLineHeight] = useState<number>(1);

  const chars = useMemo(() => text.split(''), [text]);

  // Center coordinates fallback
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX;
      targetMouseRef.current.y = e.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetMouseRef.current.x = e.touches[0].clientX;
        targetMouseRef.current.y = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        targetMouseRef.current.x = rect.left + rect.width / 2;
        targetMouseRef.current.y = rect.top + rect.height / 2;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.x = cx;
      mouseRef.current.y = cy;
      targetMouseRef.current.x = cx;
      targetMouseRef.current.y = cy;
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  const handleResize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: cW, height: cH } = containerRef.current.getBoundingClientRect();
    let fs = cW < 640 ? cW / (0.72 * chars.length) : cW / (chars.length / 2);
    fs = Math.max(fs, minFontSize);
    setFontSize(fs);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const tRect = titleRef.current.getBoundingClientRect();
      if (scale && tRect.height > 0) {
        const s = cH / tRect.height;
        setScaleY(s);
        setLineHeight(s);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    let timer: any;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(handleResize, 100);
    };
    handleResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [handleResize]);

  // Animation frame loop for smooth proximity interpolation
  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const tRect = titleRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        const maxDist = isMobile
          ? Math.max(0.85 * tRect.width, 0.45 * window.innerHeight)
          : Math.max(tRect.width / 2, 350);

        spansRef.current.forEach((span) => {
          if (!span) return;
          const sRect = span.getBoundingClientRect();
          const charCenter = {
            x: (sRect.left ?? 0) + sRect.width / 2,
            y: (sRect.top ?? 0) + sRect.height / 2,
          };
          const dx = charCenter.x - mouseRef.current.x;
          const dy = charCenter.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const wdth = width ? Math.floor(distCalc(dist, maxDist, isMobile ? 25 : 5, isMobile ? 165 : 200)) : 100;
          const wght = weight ? Math.floor(distCalc(dist, maxDist, 100, 900)) : 400;
          const ital = italic ? distCalc(dist, maxDist, 0, 1).toFixed(2) : '0';
          const op = alpha ? distCalc(dist, maxDist, 0, 1).toFixed(2) : '1';

          const fvs = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
          if (span.style.fontVariationSettings !== fvs) {
            span.style.fontVariationSettings = fvs;
          }
          if (alpha && span.style.opacity !== op) {
            span.style.opacity = op;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleTag = useMemo(
    () => (
      <style>{`
        @import url('${fontUrl}');

        .tp-flex {
          display: flex;
          justify-content: space-between;
        }

        .tp-stroke span {
          position: relative;
          color: ${textColor};
        }
        .tp-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>
    ),
    [fontUrl, textColor, strokeColor]
  );

  const classes = [className, flex ? 'tp-flex' : '', stroke ? 'tp-stroke' : ''].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      {styleTag}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${classes}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: `${fontSize}px`,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%',
        }}
      >
        {chars.map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              spansRef.current[index] = el;
            }}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
