'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  isOverflowHidden?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  padding = 'p-6 md:p-8',
  isOverflowHidden = true,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={targetRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative w-full h-full rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out z-10',
        isOverflowHidden ? 'overflow-hidden' : '',
        className
      )}
    >
      <div
        style={{
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
        className={cn('relative z-10 h-full flex flex-col items-start w-full', padding)}
      >
        {children}
      </div>

      {/* Glare Effect */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none mix-blend-soft-light rounded-[2.5rem] opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.8) 0%, transparent 80%)',
          opacity: isHovering ? 1 : 0,
          // Support for CSS variables in inline style can be finicky in React with motion
          // but we can use Framer Motion's state-driven variables if needed.
          // For simplicity, we'll use a CSS-in-JS style with dynamic coords.
        }}
      />
    </motion.div>
  );
};
