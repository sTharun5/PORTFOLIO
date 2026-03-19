'use client';

import React, { useEffect, useRef, useState } from 'react';

const DOTS_COUNT = 12;

export const MagneticCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const dots = useRef(Array.from({ length: DOTS_COUNT }, () => ({ x: 0, y: 0 })));

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const update = () => {
      dots.current.forEach((dot, i) => {
        const targetX = i === 0 ? mouse.current.x : dots.current[i - 1].x;
        const targetY = i === 0 ? mouse.current.y : dots.current[i - 1].y;
        
        const factor = i === 0 ? 0.35 : 0.15 - (i * 0.005);
        
        dot.x = lerp(dot.x, targetX, factor);
        dot.y = lerp(dot.y, targetY, factor);

        if (dotsRef.current[i]) {
          dotsRef.current[i].style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
        }
      });
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {Array.from({ length: DOTS_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) dotsRef.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)] will-change-transform"
          style={{
            width: `${Math.max(2, 8 - i * 0.5)}px`,
            height: `${Math.max(2, 8 - i * 0.5)}px`,
            backgroundColor: i % 3 === 0 ? 'rgb(79, 70, 229)' : 'rgba(129, 140, 248, 0.6)',
            opacity: Math.max(0, (1 - i / DOTS_COUNT) * 0.8),
            zIndex: DOTS_COUNT - i,
            filter: i > 5 ? 'blur(1px)' : 'none',
          }}
        />
      ))}
    </div>
  );
};
