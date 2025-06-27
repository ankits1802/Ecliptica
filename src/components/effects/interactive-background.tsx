
'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  initialSize: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const parentRef = useRef<HTMLElement | null>(null);

  const primaryColorRef = useRef('hsla(262, 52%, 51%, 0.5)'); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const computedStyle = getComputedStyle(document.documentElement);
        const primaryH = computedStyle.getPropertyValue('--primary-h') || '262';
        const primaryS = computedStyle.getPropertyValue('--primary-s') || '52%';
        const primaryL = computedStyle.getPropertyValue('--primary-l') || '51%';
        primaryColorRef.current = `hsla(${primaryH}, ${primaryS}, ${primaryL}, 0.3)`;
    }
  }, []);


  const createParticle = useCallback((x: number, y: number) => {
    const initialSize = Math.random() * 2.5 + 1; // Size between 1 and 3.5
    particlesRef.current.push({
      x,
      y,
      size: initialSize,
      initialSize,
      opacity: 1,
      color: primaryColorRef.current,
      vx: (Math.random() - 0.5) * (Math.random() * 1.5 + 0.5), // Initial burst velocity
      vy: (Math.random() - 0.5) * (Math.random() * 1.5 + 0.5),
      life: 40 + Math.random() * 60, // Lifetime between 40 and 100 frames
    });
    // Limit the number of particles to avoid performance issues
    if (particlesRef.current.length > 200) {
        particlesRef.current.splice(0, particlesRef.current.length - 200);
    }
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;

      // Apply drag/friction
      p.vx *= 0.96; 
      p.vy *= 0.96; 

      // Fade out based on life
      p.opacity = (p.life / (40 + Math.random() * 60)) * 0.7 + 0.3; // Ensure particles remain somewhat visible longer
      p.opacity = Math.max(0, p.opacity - 0.01); // Gradual fade

      // Shrink based on life, but not too quickly
      const lifeRatio = Math.max(0, p.life / (p.initialSize * 20)); // Adjust denominator for shrink speed
      p.size = p.initialSize * lifeRatio;
      
      p.life -=1;

      if (p.opacity <= 0.05 || p.life <= 0 || p.size <= 0.2) {
        particlesRef.current.splice(index, 1);
        return;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2, false);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1; // Reset globalAlpha

    animationFrameIdRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    parentRef.current = canvas.parentElement;

    const resizeCanvas = () => {
      if (parentRef.current) {
        canvas.width = parentRef.current.clientWidth;
        canvas.height = parentRef.current.clientHeight;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createParticle(x,y);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    if (parentRef.current) {
        parentRef.current.addEventListener('mousemove', handleMouseMove);
    }

    animationFrameIdRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (parentRef.current) {
        parentRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      particlesRef.current = []; 
    };
  }, [draw, createParticle]);


  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;
