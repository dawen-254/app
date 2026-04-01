import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nailServicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const NailServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cards = grid.querySelectorAll('.nail-card');

    // Grid line draw animation
    const lineTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    lineTl.fromTo(
      '.grid-line-h',
      { scaleX: prefersReducedMotion ? 1 : 0 },
      { scaleX: 1, duration: prefersReducedMotion ? 0.4 : 1, stagger: 0.1, ease: 'expo.out' }
    );

    lineTl.fromTo(
      '.grid-line-v',
      { scaleY: prefersReducedMotion ? 1 : 0 },
      { scaleY: 1, duration: prefersReducedMotion ? 0.4 : 1, stagger: 0.1, ease: 'expo.out' },
      0
    );

    if (lineTl.scrollTrigger) {
      triggersRef.current.push(lineTl.scrollTrigger);
    }

    // Cards flip in
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    cardsTl.fromTo(
      cards,
      {
        rotateY: prefersReducedMotion ? 0 : 90,
        opacity: 0,
      },
      {
        rotateY: 0,
        opacity: 1,
        duration: prefersReducedMotion ? 0.45 : 0.8,
        stagger: 0.1,
        ease: 'expo.out',
      }
    );

    if (cardsTl.scrollTrigger) {
      triggersRef.current.push(cardsTl.scrollTrigger);
    }

    return () => {
      lineTl.kill();
      cardsTl.kill();
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent, color: string, index: number) => {
    setActiveIndex(index);
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Create particles
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    const particleCount = isTouchDevice ? 6 : 12;
    const spread = isTouchDevice ? 70 : 100;
    const newParticles = Array.from({ length: particleCount }, () => ({
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * spread,
      y: y + (Math.random() - 0.5) * spread,
      color,
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    // Scroll to booking section
    window.dispatchEvent(
      new CustomEvent('app:scroll-to', {
        detail: {
          target: '#booking',
          offset: window.innerWidth < 768 ? -6 : -10,
        },
      })
    );
  };

  if (nailServicesConfig.services.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="nails"
      className="relative min-h-screen w-full bg-black py-20 sm:py-24 overflow-hidden"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal lines */}
        {[0, 33.33, 66.66, 100].map((pos, i) => (
          <div
            key={`h-${i}`}
            className="grid-line-h absolute left-0 right-0 h-px bg-white/10 origin-left"
            style={{ top: `${pos}%` }}
          />
        ))}
        {/* Vertical lines */}
        {[0, 25, 50, 75, 100].map((pos, i) => (
          <div
            key={`v-${i}`}
            className="grid-line-v absolute top-0 bottom-0 w-px bg-white/10 origin-top"
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          {nailServicesConfig.sectionLabel && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-pink" />
              <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                {nailServicesConfig.sectionLabel}
              </span>
              <div className="w-12 h-px bg-pink" />
            </div>
          )}
          {(nailServicesConfig.headingMain || nailServicesConfig.headingAccent) && (
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight">
              {nailServicesConfig.headingMain}<span className="text-pink">{nailServicesConfig.headingAccent}</span>
            </h2>
          )}
        </div>

        {/* Nail services grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {nailServicesConfig.services.map((service, index) => (
            <div
              key={service.name}
              className={`nail-card relative bg-black preserve-3d cursor-pointer group overflow-hidden rounded-lg active:scale-[0.99] transition-transform ${
                activeIndex === index ? 'ring-2 ring-pink z-10' : ''
              }`}
              onClick={(e) => handleCardClick(e, service.color, index)}
              data-cursor-hover
            >
              {/* Image block */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.name} ${service.nameSecondary}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-custom-expo group-hover:scale-110"
                />
              </div>

              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3 sm:p-4 text-center pb-4 sm:pb-8">
                <span className="font-display font-black text-lg sm:text-2xl text-white mb-1">
                  {service.nameSecondary}
                </span>
                <span className="font-body text-pink text-xs sm:text-sm mb-2">
                  {service.name}
                </span>
                <span className="font-body text-white/60 text-[11px] sm:text-xs">
                  {service.description}
                </span>
                <div className="mt-3 sm:mt-4 px-4 py-2 bg-pink text-black text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider">
                  <span className="md:hidden">Tap to Book</span>
                  <span className="hidden md:inline">Click to Book</span>
                </div>
              </div>

              {/* Color accent bar */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2"
                style={{ backgroundColor: service.color }}
              />

              {/* Corner accent */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-50 w-4 h-4 rounded-full animate-ping"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
            }}
          />
        ))}

        {/* Bottom text */}
        {nailServicesConfig.bottomText && (
          <div className="mt-16 text-center">
            <p className="font-body text-white/45 text-xs sm:text-sm uppercase tracking-wider">
              {nailServicesConfig.bottomText}
            </p>
          </div>
        )}
      </div>

      {/* Decorative text */}
      {nailServicesConfig.decorativeText && (
        <div className="absolute bottom-0 right-0 font-display font-black text-[8rem] md:text-[15rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {nailServicesConfig.decorativeText}
        </div>
      )}
    </section>
  );
};

export default NailServices;
