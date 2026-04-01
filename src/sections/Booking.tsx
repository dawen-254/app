import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, User, Mail, Phone, Check, Scissors, Sparkles } from 'lucide-react';
import { bookingConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const Booking = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hair' | 'nails'>('all');
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Form entrance animation
    const formTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    formTl.fromTo(
      form.children,
      {
        y: prefersReducedMotion ? 0 : 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion ? 0.45 : 0.8,
        stagger: 0.08,
        ease: 'expo.out',
      }
    );

    if (formTl.scrollTrigger) {
      triggersRef.current.push(formTl.scrollTrigger);
    }

    return () => {
      formTl.kill();
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking submission
    setIsSubmitted(true);
    
    // Store booking in localStorage for admin access
    let bookings: Array<BookingForm & { id: number; status: string; createdAt: string }> = [];
    try {
      const parsedBookings: unknown = JSON.parse(localStorage.getItem('luxe_bookings') || '[]');
      bookings = Array.isArray(parsedBookings) ? parsedBookings as Array<BookingForm & { id: number; status: string; createdAt: string }> : [];
    } catch {
      bookings = [];
    }

    bookings.push({
      ...form,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('luxe_bookings', JSON.stringify(bookings));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filteredServices = selectedCategory === 'all' 
    ? bookingConfig.services 
    : bookingConfig.services.filter(service => service.category === selectedCategory);

  if (!bookingConfig.headingMain && !bookingConfig.headingAccent) return null;

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative min-h-screen w-full bg-black py-20 sm:py-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          {bookingConfig.sectionLabel && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-pink" />
              <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                {bookingConfig.sectionLabel}
              </span>
              <div className="w-12 h-px bg-pink" />
            </div>
          )}
          {(bookingConfig.headingMain || bookingConfig.headingAccent) && (
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight">
              {bookingConfig.headingMain}<span className="text-pink">{bookingConfig.headingAccent}</span>
            </h2>
          )}
          {bookingConfig.description && (
            <p className="mt-6 font-body text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-2">
              {bookingConfig.description}
            </p>
          )}
        </div>

        {/* Success message */}
        {isSubmitted ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-pink rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-black" />
            </div>
            <h3 className="font-display font-bold text-3xl text-white mb-4">
              Booking Request Received!
            </h3>
            <p className="font-body text-white/60 text-lg mb-8">
              Thank you for booking with Luxe Beauty Studio. We'll confirm your appointment within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setForm({
                  name: '',
                  email: '',
                  phone: '',
                  service: '',
                  date: '',
                  time: '',
                  notes: '',
                });
              }}
              className="px-8 py-4 bg-pink text-black font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
              data-cursor-hover
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto"
          >
            {/* Service category filter */}
            <div className="flex justify-start md:justify-center gap-3 sm:gap-4 mb-8 overflow-x-auto pb-2">
              {(['all', 'hair', 'nails'] as const).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setForm(prev => ({ ...prev, service: '' }));
                  }}
                  className={`px-5 sm:px-6 py-3 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-pink text-black'
                      : 'border border-white/20 text-white/60 hover:border-pink hover:text-pink'
                  }`}
                  data-cursor-hover
                >
                  {category === 'all' ? 'All Services' : category === 'hair' ? <><Scissors className="w-4 h-4" /> Hair</> : <><Sparkles className="w-4 h-4" /> Nails</>}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  autoComplete="name"
                  className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white text-sm sm:text-base placeholder:text-white/40 focus:border-pink focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  autoComplete="email"
                  className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white text-sm sm:text-base placeholder:text-white/40 focus:border-pink focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white text-sm sm:text-base placeholder:text-white/40 focus:border-pink focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Service */}
              <div className="relative">
                <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white text-sm sm:text-base focus:border-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black">Select Service</option>
                  {filteredServices.map((service) => (
                    <option key={service.id} value={service.id} className="bg-black">
                      {service.name} - {service.price} ({service.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white text-sm sm:text-base placeholder:text-white/40 focus:border-pink focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Time */}
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white text-sm sm:text-base focus:border-pink focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black">Select Time</option>
                  {bookingConfig.timeSlots.map((time) => (
                    <option key={time} value={time} className="bg-black">
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional Notes (optional)"
                rows={4}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm sm:text-base placeholder:text-white/40 focus:border-pink focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-4 px-12 py-4 w-full sm:w-auto bg-pink text-black font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
                data-cursor-hover
              >
                <Calendar className="w-5 h-5" />
                {bookingConfig.ctaText}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Decorative text */}
      {bookingConfig.decorativeText && (
        <div className="absolute bottom-0 right-0 font-display font-black text-[8rem] md:text-[15rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {bookingConfig.decorativeText}
        </div>
      )}
    </section>
  );
};

export default Booking;
