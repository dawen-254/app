import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationConfig } from '../config';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) return;

      isTicking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 32);
        isTicking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const scrollToAnchor = (href: string) => {
    if (!href.startsWith('#')) return;

    window.dispatchEvent(
      new CustomEvent('app:scroll-to', {
        detail: {
          target: href,
          offset: window.innerWidth < 768 ? -6 : -10,
        },
      })
    );
  };

  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    scrollToAnchor(href);
    setIsMobileMenuOpen(false);
  };

  if (!navigationConfig.logo) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-custom-expo ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md py-3 md:py-4 border-b border-white/10'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3">
          {/* Logo */}
          <a
            href="#top"
            onClick={(event) => handleNavLinkClick(event, '#top')}
            className="font-display font-black text-lg sm:text-xl tracking-tight text-white hover:text-pink transition-colors duration-300"
            data-cursor-hover
          >
            {navigationConfig.logo}<span className="text-pink">{navigationConfig.logoAccent}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavLinkClick(event, link.href)}
                className="font-body text-sm text-white/70 hover:text-pink transition-colors duration-300 uppercase tracking-widest"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
            {navigationConfig.ctaText && (
              <a
                href="#booking"
                onClick={(event) => handleNavLinkClick(event, '#booking')}
                className="px-6 py-2 bg-pink text-black font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300"
                data-cursor-hover
              >
                {navigationConfig.ctaText}
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white p-2 rounded-sm border border-white/20 hover:border-pink hover:text-pink transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            data-cursor-hover
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-500 ease-custom-expo md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="h-full px-6 pt-24 pb-10 flex flex-col">
          <p className="font-body text-white/50 text-xs uppercase tracking-[0.35em] mb-6">
            Navigate
          </p>

          <div className="flex-1 flex flex-col gap-3">
          {navigationConfig.navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavLinkClick(event, link.href)}
              className="font-display font-bold text-2xl text-white hover:text-pink transition-colors duration-300 uppercase border border-white/10 px-4 py-4"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(12px)',
              }}
              data-cursor-hover
            >
              {link.label}
            </a>
          ))}
          </div>

          {navigationConfig.ctaText && (
            <a
              href="#booking"
              onClick={(event) => handleNavLinkClick(event, '#booking')}
              className="mt-6 px-8 py-4 bg-pink text-black font-display font-bold text-base uppercase tracking-wider text-center"
              style={{
                transitionDelay: isMobileMenuOpen ? `${navigationConfig.navLinks.length * 100}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
              data-cursor-hover
            >
              {navigationConfig.ctaText}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
