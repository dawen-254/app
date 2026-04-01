import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Hero from './sections/Hero';
import Services from './sections/Services';
import NailServices from './sections/NailServices';
import Gallery from './sections/Gallery';
import Booking from './sections/Booking';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const mainElement = mainRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const enableSkewEffect = !prefersReducedMotion && !isTouchDevice;

    const lenis = new Lenis({
      duration: isTouchDevice ? 0.9 : 1.15,
      smoothWheel: true,
      syncTouch: isTouchDevice,
      touchMultiplier: 1,
    });

    let currentSkew = 0;
    let targetSkew = 0;
    let animationFrameId = 0;

    lenis.on('scroll', (event: { velocity: number }) => {
      ScrollTrigger.update();
      if (enableSkewEffect) {
        targetSkew = gsap.utils.clamp(-2.5, 2.5, event.velocity * 0.65);
      }
    });

    const handleAppScrollTo = (event: Event) => {
      const customEvent = event as CustomEvent<{ target: string; offset?: number }>;
      const target = customEvent.detail?.target;
      if (!target) return;

      lenis.scrollTo(target, {
        offset: customEvent.detail?.offset ?? 0,
        duration: isTouchDevice ? 1 : 1.2,
      });
    };

    window.addEventListener('app:scroll-to', handleAppScrollTo);

    const animate = (time: number) => {
      lenis.raf(time);

      if (enableSkewEffect && mainElement) {
        currentSkew += (targetSkew - currentSkew) * 0.08;
        targetSkew *= 0.92;

        if (Math.abs(targetSkew) < 0.01 && Math.abs(currentSkew) < 0.01) {
          targetSkew = 0;
          currentSkew = 0;
        }

        mainElement.style.transform = `skewY(${currentSkew.toFixed(3)}deg)`;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);
    ScrollTrigger.refresh();
    
    return () => {
      window.removeEventListener('app:scroll-to', handleAppScrollTo);
      window.cancelAnimationFrame(animationFrameId);
      lenis.destroy();

      if (mainElement) {
        mainElement.style.transform = 'none';
      }

      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <div id="top" className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main ref={mainRef} className="relative transition-transform duration-100 ease-out will-change-transform">
        <Hero />
        <Services />
        <NailServices />
        <Gallery />
        <Booking />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
