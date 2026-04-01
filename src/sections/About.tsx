import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Heart, Shield, Star } from 'lucide-react';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const diagonal = diagonalRef.current;
    if (!section || !image || !text || !diagonal) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Diagonal line rotation on scroll
    let diagonalTl: gsap.core.Timeline | null = null;
    if (!isTouchDevice && !prefersReducedMotion) {
      diagonalTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      diagonalTl.fromTo(
        diagonal,
        { rotate: 15 },
        { rotate: -15, ease: 'none' }
      );

      if (diagonalTl.scrollTrigger) {
        triggersRef.current.push(diagonalTl.scrollTrigger);
      }
    }

    // Image depth zoom effect
    const imageTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'center center',
        scrub: prefersReducedMotion ? false : 1,
      },
    });

    imageTl.fromTo(
      image,
      {
        scale: prefersReducedMotion ? 1 : 1.2,
        opacity: 0.5,
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
      }
    );

    if (imageTl.scrollTrigger) {
      triggersRef.current.push(imageTl.scrollTrigger);
    }

    // Text reveal
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    textTl.fromTo(
      text.children,
      {
        y: prefersReducedMotion ? 0 : 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion ? 0.45 : 1,
        stagger: 0.15,
        ease: 'expo.out',
      }
    );

    if (textTl.scrollTrigger) {
      triggersRef.current.push(textTl.scrollTrigger);
    }

    // Glitch effect on title
    const title = text.querySelector('.glitch-title');
    let glitchInterval: ReturnType<typeof setInterval> | null = null;
    if (title && !isTouchDevice && !prefersReducedMotion) {
      glitchInterval = setInterval(() => {
        gsap.to(title, {
          x: 2,
          duration: 0.05,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            gsap.set(title, { x: 0 });
          },
        });
      }, 5000);
    }

    return () => {
      if (glitchInterval) {
        clearInterval(glitchInterval);
      }

      diagonalTl?.kill();
      imageTl.kill();
      textTl.kill();
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!aboutConfig.headingMain && !aboutConfig.headingAccent) return null;

  const featureIcons = [Award, Heart, Shield, Star];

  const handleCtaClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = aboutConfig.ctaHref || '#contact';
    if (!href.startsWith('#')) return;

    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent('app:scroll-to', {
        detail: {
          target: href,
          offset: window.innerWidth < 768 ? -6 : -10,
        },
      })
    );
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* Diagonal split line */}
      <div
        ref={diagonalRef}
        className="hidden lg:block absolute top-0 left-[60%] w-px h-[200%] bg-pink origin-top z-20"
        style={{ transform: 'rotate(15deg)' }}
      />

      <div className="relative z-10 grid lg:grid-cols-5 min-h-screen">
        {/* Text content - 60% */}
        <div className="lg:col-span-3 flex items-center px-6 lg:px-16 py-20 lg:py-24">
          <div ref={textRef} className="max-w-2xl">
            {aboutConfig.sectionLabel && (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-pink" />
                <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                  {aboutConfig.sectionLabel}
                </span>
              </div>
            )}

            {(aboutConfig.headingMain || aboutConfig.headingAccent) && (
              <h2 className="glitch-title font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight mb-8 leading-none">
                {aboutConfig.headingMain}
                <br />
                <span className="text-pink">{aboutConfig.headingAccent}</span>
              </h2>
            )}

            {aboutConfig.tagline && (
              <p className="font-body text-white/60 text-lg md:text-xl leading-relaxed mb-8">
                {aboutConfig.tagline}
              </p>
            )}

            {aboutConfig.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
                {aboutConfig.features.map((feature, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-pink" />
                      </div>
                      <span className="font-body text-white/60 text-sm uppercase tracking-wider">
                        {feature}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {aboutConfig.ctaText && (
              <a
                href={aboutConfig.ctaHref || '#'}
                onClick={handleCtaClick}
                className="group inline-flex items-center gap-4 px-8 py-4 bg-pink text-black font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
                data-cursor-hover
              >
                {aboutConfig.ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            )}
          </div>
        </div>

        {/* Image - 40% */}
        {aboutConfig.image && (
          <div className="lg:col-span-2 relative overflow-hidden min-h-[400px] lg:min-h-0">
            <div
              ref={imageRef}
              className="absolute inset-0"
              style={{ perspective: '1000px' }}
            >
              <img
                src={aboutConfig.image}
                alt={aboutConfig.imageAlt}
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

              {/* Pink accent border */}
              <div className="absolute top-8 right-8 bottom-8 w-px bg-pink/50" />
              <div className="absolute top-8 right-8 left-8 h-px bg-pink/50" />
            </div>
          </div>
        )}
      </div>

      {/* Floating text decoration */}
      {aboutConfig.decorativeText && (
        <div className="absolute bottom-12 left-6 font-display font-black text-[6rem] md:text-[10rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {aboutConfig.decorativeText}
        </div>
      )}
    </section>
  );
};

export default About;
