import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Image entrance animation
    const imageTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    imageTl.fromTo(
      image,
      {
        rotateY: prefersReducedMotion ? 0 : 90,
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.86,
      },
      {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        duration: prefersReducedMotion ? 0.55 : 1.1,
        ease: 'expo.out',
      }
    );

    if (imageTl.scrollTrigger) {
      triggersRef.current.push(imageTl.scrollTrigger);
    }

    // Content entrance
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    contentTl.fromTo(
      content.children,
      {
        y: prefersReducedMotion ? 0 : 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion ? 0.45 : 0.8,
        stagger: 0.1,
        ease: 'expo.out',
      }
    );

    if (contentTl.scrollTrigger) {
      triggersRef.current.push(contentTl.scrollTrigger);
    }

    // Floating animation for image
    const floatTween = !isTouchDevice && !prefersReducedMotion
      ? gsap.to(image, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      : null;

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotateY = ((mouseX - centerX) / centerX) * 15;
      const rotateX = ((centerY - mouseY) / centerY) * 15;

      gsap.to(image, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    if (!isTouchDevice && !prefersReducedMotion) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      imageTl.kill();
      contentTl.kill();
      floatTween?.kill();
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  // Image carousel
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === servicesConfig.serviceImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? servicesConfig.serviceImages.length - 1 : prev - 1
    );
  };

  const handleImageTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchEndXRef.current = null;
  };

  const handleImageTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleImageTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;

    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(deltaX) < 40) return;

    if (deltaX > 0) {
      nextImage();
    } else {
      prevImage();
    }
  };

  const handleBookingClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent('app:scroll-to', {
        detail: {
          target: '#booking',
          offset: window.innerWidth < 768 ? -6 : -10,
        },
      })
    );
  };

  if (!servicesConfig.serviceName && !servicesConfig.headingMain) return null;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen w-full bg-black py-20 sm:py-24 overflow-hidden perspective-1000"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-pink" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-pink" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-pink" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-pink" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-pink" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          {servicesConfig.sectionLabel && (
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-pink" />
              <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                {servicesConfig.sectionLabel}
              </span>
            </div>
          )}
          {(servicesConfig.headingMain || servicesConfig.headingAccent) && (
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight">
              {servicesConfig.headingMain}<span className="text-pink">{servicesConfig.headingAccent}</span>
            </h2>
          )}
        </div>

        {/* Service display */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Service image carousel */}
          <div className="relative flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-96 md:h-96 bg-pink/20 rounded-full blur-3xl animate-pulse-pink" />
            </div>

            {/* Image container */}
            <div
              ref={imageRef}
              className="relative preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
              onTouchStart={handleImageTouchStart}
              onTouchMove={handleImageTouchMove}
              onTouchEnd={handleImageTouchEnd}
            >
              {servicesConfig.serviceImages.length > 0 && (
                <div className="relative">
                  <img
                    src={servicesConfig.serviceImages[currentImageIndex]}
                    alt={servicesConfig.serviceImageAlts[currentImageIndex]}
                    className="w-56 sm:w-64 md:w-80 lg:w-96 h-auto max-h-[500px] object-cover rounded-lg drop-shadow-2xl transition-all duration-500"
                  />
                  
                  {/* Navigation arrows */}
                  {servicesConfig.serviceImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        aria-label="Previous service image"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-11 h-11 bg-pink text-black flex items-center justify-center hover:bg-white transition-colors duration-300"
                        data-cursor-hover
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        aria-label="Next service image"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-11 h-11 bg-pink text-black flex items-center justify-center hover:bg-white transition-colors duration-300"
                        data-cursor-hover
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image indicators */}
                  {servicesConfig.serviceImages.length > 1 && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                      {servicesConfig.serviceImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`View service image ${index + 1}`}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-pink w-6' : 'bg-white/30'
                          }`}
                          data-cursor-hover
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Price tag */}
            {servicesConfig.price && (
              <div className="absolute top-0 right-0 lg:right-12 bg-pink text-black px-4 sm:px-6 py-2 sm:py-3 font-display font-black text-xl sm:text-2xl">
                {servicesConfig.price}
              </div>
            )}
          </div>

          {/* Service info */}
          <div ref={contentRef} className="space-y-8">
            <div>
              {servicesConfig.serviceName && (
                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4">
                  {servicesConfig.serviceName}
                </h3>
              )}
              {servicesConfig.description && (
                <p className="font-body text-white/65 text-base sm:text-lg leading-relaxed">
                  {servicesConfig.description}
                </p>
              )}
            </div>

            {/* Features */}
            {servicesConfig.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {servicesConfig.features.map((feature, index) => (
                  <div key={index} className="border border-white/10 p-5 sm:p-6 hover:border-pink transition-colors duration-300">
                    <div className="text-pink font-display font-black text-3xl mb-2">{feature.value}</div>
                    <div className="font-body text-white/40 text-sm uppercase tracking-wider">
                      {feature.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {servicesConfig.ctaText && (
              <a
                href="#booking"
                onClick={handleBookingClick}
                className="group inline-flex items-center justify-center gap-4 px-8 py-4 w-full sm:w-auto bg-pink text-black font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
                data-cursor-hover
              >
                <Scissors className="w-5 h-5" />
                {servicesConfig.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      {servicesConfig.decorativeText && (
        <div className="absolute bottom-12 left-6 font-display font-black text-[12rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {servicesConfig.decorativeText}
        </div>
      )}
    </section>
  );
};

export default Services;
