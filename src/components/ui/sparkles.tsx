"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Sparkle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
};

export const Sparkles = ({
  id,
  className,
  particleColor = "#FFFFFF",
  particleDensity = 700,
  speed = 1,
  minSize = 0.5,
  maxSize = 1.5,
}: {
  id?: string;
  className?: string;
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      setCanvasDimensions();
      particlesRef.current = [];
      const numParticles = Math.floor(
        (canvas.width * canvas.height) / particleDensity
      );
      for (let i = 0; i < numParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          alpha: Math.random() * 0.5 + 0.1,
          speed: (Math.random() + 0.1) * speed,
        });
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.y += particle.speed;
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }

        // Calculate distance to mouse
        const distance = Math.hypot(
          particle.x - mouseRef.current.x,
          particle.y - mouseRef.current.y
        );
        
        // Increase opacity if mouse is near
        let opacity = particle.alpha;
        if (distance < 150) {
            opacity = Math.min(particle.alpha + 0.5, 1);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${parseInt(
          particleColor.slice(1, 3),
          16
        )}, ${parseInt(particleColor.slice(3, 5), 16)}, ${parseInt(
          particleColor.slice(5, 7),
          16
        )}, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleResize = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      init();
      animate();
    };

    init();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleColor, particleDensity, speed, minSize, maxSize]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
};
