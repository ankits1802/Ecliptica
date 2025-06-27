'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState, useEffect } from 'react';
import { Sparkles } from '@/components/ui/sparkles';

gsap.registerPlugin(useGSAP);

const PRELOADER_NAME_LETTERS = "ANKIT KUMAR".split('');
const PRELOADER_SUBTEXT = "Full-time Thinker. Part-time Tinkerer.";

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useGSAP(
        () => {
            if (!hasMounted || !preloaderRef.current) return; 

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power1.inOut',
                },
                onComplete: () => {
                    setIsAnimationComplete(true);
                }
            });

            tl.to('.name-text span', {
                y: 0,
                stagger: 0.05,
                duration: 0.8,
            });

            tl.to('.sub-text', {
                autoAlpha: 1, 
                duration: 0.8,
                ease: 'power1.in'
            }, "-=0.5"); 

            tl.to('.preloader-item', {
                delay: 1.5, 
                y: '100%',
                duration: 0.6,
                stagger: {
                    each: 0.08,
                    from: "start"
                },
            }); 

            tl.to(['.name-text span', '.sub-text'], {
                autoAlpha: 0,
                duration: 0.3,
            }, '<0.2'); 

            tl.to(
                preloaderRef.current,
                {
                    autoAlpha: 0,
                    duration: 0.5,
                },
                '-=0.3' 
            );
        },
        { scope: preloaderRef, dependencies: [hasMounted] } 
    );

    useEffect(() => {
        if (!hasMounted) return; 

        if (!isAnimationComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            if (hasMounted) { 
                document.body.style.overflow = ''; 
            }
        };
    }, [isAnimationComplete, hasMounted]); 

    if (!hasMounted) {
        return null;
    }

    if (isAnimationComplete) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex pointer-events-none" ref={preloaderRef}>
            {[...Array(10)].map((_, i) => (
                <div key={i} className="preloader-item h-full w-[10%] bg-black pointer-events-auto"></div>
            ))}
            
            <Sparkles
              id="tsparticles"
              className="absolute inset-0 h-full w-full"
              particleColor="#FFFFFF"
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={1000}
              speed={0.5}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center text-center pointer-events-none">
                <h1
                  className="name-text flex text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[9rem] xl:text-[12rem] font-anton text-white leading-none overflow-hidden"
                  aria-label="ANKIT KUMAR"
                >
                    {PRELOADER_NAME_LETTERS.map((letter, index) => (
                        <span key={index} className="inline-block translate-y-full">
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    ))}
                </h1>
                <p className="sub-text mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-serif opacity-0 px-4">
                    {PRELOADER_SUBTEXT}
                </p>
            </div>
        </div>
    );
};

export default Preloader;
