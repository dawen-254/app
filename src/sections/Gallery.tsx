import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';
import { galleryConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<typeof galleryConfig.items[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'hair' | 'nails'>('all');
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const items = grid.querySelectorAll('.gallery-item');

    // Items entrance animation
    const itemsTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    itemsTl.fromTo(
      items,
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
      }
    );

    if (itemsTl.scrollTrigger) {
      triggersRef.current.push(itemsTl.scrollTrigger);
    }

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [filter]);

  const filteredItems = filter === 'all' 
    ? galleryConfig.items 
    : galleryConfig.items.filter(item => item.category === filter);

  if (galleryConfig.items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative min-h-screen w-full bg-black py-24 overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 text-center">
          {galleryConfig.sectionLabel && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-pink" />
              <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                {galleryConfig.sectionLabel}
              </span>
              <div className="w-12 h-px bg-pink" />
            </div>
          )}
          {(galleryConfig.headingMain || galleryConfig.headingAccent) && (
            <h2 className="font-display font-black text-5xl md:text-7xl text-white uppercase tracking-tight">
              {galleryConfig.headingMain}<span className="text-pink">{galleryConfig.headingAccent}</span>
            </h2>
          )}
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {(['all', 'hair', 'nails'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === category
                  ? 'bg-pink text-black'
                  : 'border border-white/20 text-white/60 hover:border-pink hover:text-pink'
              }`}
              data-cursor-hover
            >
              {category === 'all' ? 'All Work' : category === 'hair' ? 'Hair' : 'Nails'}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, index) => (
            <div
              key={`${item.image}-${index}`}
              className={`gallery-item relative group cursor-pointer overflow-hidden ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(item)}
              data-cursor-hover
            >
              <div className={`relative overflow-hidden ${
                index === 0 || index === 5 ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-square'
              }`}>
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-custom-expo group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <ZoomIn className="w-8 h-8 text-pink mx-auto mb-2" />
                    <span className="font-body text-white text-sm uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-pink text-black text-xs font-display font-bold uppercase">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-pink text-black flex items-center justify-center hover:bg-white transition-colors duration-300"
            data-cursor-hover
          >
            <X className="w-6 h-6" />
          </button>
          
          <img
            src={selectedImage.image}
            alt={selectedImage.alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <span className="font-body text-white/60 text-sm uppercase tracking-wider">
              {selectedImage.alt}
            </span>
          </div>
        </div>
      )}

      {/* Decorative text */}
      {galleryConfig.decorativeText && (
        <div className="absolute bottom-0 left-0 font-display font-black text-[8rem] md:text-[15rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {galleryConfig.decorativeText}
        </div>
      )}
    </section>
  );
};

export default Gallery;
