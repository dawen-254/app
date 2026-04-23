import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Youtube } from 'lucide-react';
import { contactConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Content entrance animation
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
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

    return () => {
      contentTl.kill();
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return Instagram;
      case 'twitter':
        return Twitter;
      case 'youtube':
        return Youtube;
      default:
        return Instagram;
    }
  };

  if (!contactConfig.headingMain && !contactConfig.headingAccent) return null;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full bg-black py-20 sm:py-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          {contactConfig.sectionLabel && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-pink" />
              <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                {contactConfig.sectionLabel}
              </span>
              <div className="w-12 h-px bg-pink" />
            </div>
          )}
          {(contactConfig.headingMain || contactConfig.headingAccent) && (
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight">
              {contactConfig.headingMain}<span className="text-pink">{contactConfig.headingAccent}</span>
            </h2>
          )}
        </div>

        {/* Contact content */}
        <div ref={contentRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Address */}
          <div className="group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-pink transition-colors duration-300">
              <MapPin className="w-8 h-8 text-pink group-hover:text-black transition-colors duration-300" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">Location</h3>
            <p className="font-body text-white/60 whitespace-pre-line">
              {contactConfig.address}
            </p>
          </div>

          {/* Phone */}
          <div className="group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-pink transition-colors duration-300">
              <Phone className="w-8 h-8 text-pink group-hover:text-black transition-colors duration-300" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">Phone</h3>
            <a 
              href={`tel:${contactConfig.phone.replace(/\D/g, '')}`}
              className="font-body text-white/60 hover:text-pink transition-colors duration-300"
              data-cursor-hover
            >
              {contactConfig.phone}
            </a>
          </div>

          {/* Email */}
          <div className="group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-pink transition-colors duration-300">
              <Mail className="w-8 h-8 text-pink group-hover:text-black transition-colors duration-300" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">Email</h3>
            <a 
              href={`mailto:${contactConfig.email}`}
              className="font-body text-white/60 hover:text-pink transition-colors duration-300"
              data-cursor-hover
            >
              {contactConfig.email}
            </a>
          </div>

          {/* Hours */}
          <div className="group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-pink transition-colors duration-300">
              <Clock className="w-8 h-8 text-pink group-hover:text-black transition-colors duration-300" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">Hours</h3>
            <div className="font-body text-white/60">
              {contactConfig.hours.map((hour, index) => (
                <p key={index}>{hour}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Social links */}
        {contactConfig.socialLinks.length > 0 && (
          <div className="mt-14 sm:mt-16 text-center">
            <h3 className="font-display font-bold text-lg text-white/40 uppercase tracking-wider mb-8">
              Follow Us
            </h3>
            <div className="flex justify-center gap-4 sm:gap-6">
              {contactConfig.socialLinks.map((link, index) => {
                const Icon = getSocialIcon(link.platform);
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 border border-white/20 flex items-center justify-center text-white/60 hover:border-pink hover:text-pink hover:bg-pink/10 transition-all duration-300"
                    data-cursor-hover
                    aria-label={link.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="aspect-video bg-white/5 border border-white/10 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8149898562284!2d37.010679173516225!3d-1.0933964999999987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f115fc496c501%3A0x7a4e0e0f0e0e0e0!2sJKUAT%20Gate%20C%2C%20Juja!5e0!3m2!1sen!2ske!4v1704067200000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Salon Location"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Decorative text */}
      {contactConfig.decorativeText && (
        <div className="absolute bottom-0 left-0 font-display font-black text-[8rem] md:text-[15rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {contactConfig.decorativeText}
        </div>
      )}
    </section>
  );
};

export default Contact;
