// ============================================================================
// LUXE BEAUTY STUDIO - SITE CONFIGURATION
// ============================================================================
// Hair Salon & Nail Tech Website with Appointment Booking
// ============================================================================

// ----------------------------------------------------------------------------
// Navigation
// ----------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  logoAccent: string;
  navLinks: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "LUXE",
  logoAccent: ".",
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Now", href: "#booking" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText: "Book Appointment",
};

// ----------------------------------------------------------------------------
// Hero Section
// ----------------------------------------------------------------------------

export interface HeroConfig {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
  gridRows: number;
  gridCols: number;
  pinkCells: { row: number; col: number }[];
}

export const heroConfig: HeroConfig = {
  titleLine1: "LUXE",
  titleLine2: "BEAUTY",
  subtitle: "Premium Hair & Nail Studio - Where Beauty Meets Excellence",
  ctaText: "Book Your Appointment",
  ctaHref: "#booking",
  backgroundImage: "/images/hero-wigs.jpg",
  gridRows: 6,
  gridCols: 8,
  pinkCells: [
    { row: 0, col: 2 },
    { row: 1, col: 5 },
    { row: 2, col: 1 },
    { row: 3, col: 6 },
    { row: 4, col: 3 },
    { row: 5, col: 7 },
  ],
};

// ----------------------------------------------------------------------------
// Services Section (Product Showcase adapted for services)
// ----------------------------------------------------------------------------

export interface ServiceFeature {
  value: string;
  label: string;
}

export interface ServicesConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  serviceName: string;
  description: string;
  features: ServiceFeature[];
  serviceImages: string[];
  serviceImageAlts: string[];
  ctaText: string;
  decorativeText: string;
}

export const servicesConfig: ServicesConfig = {
  sectionLabel: "OUR SERVICES",
  headingMain: "Premium",
  headingAccent: "Hair",
  serviceName: "Hair Styling & Extensions",
  description: "Transform your look with our expert hair services. From luxurious lace front wigs to stunning braids and protective styles, we create masterpieces that turn heads. Our skilled stylists use only premium human hair and the latest techniques to ensure you leave feeling confident and beautiful.",
  features: [
    { value: "100%", label: "Human Hair" },
    { value: "HD", label: "Lace Technology" },
    { value: "12+", label: "Years Experience" },
  ],
  serviceImages: [
    "/images/brown-wig.jpg",
    "/images/water-wave-wig.jpg",
    "/images/braids-vacation.jpg",
  ],
  serviceImageAlts: [
    "Chocolate Brown Lace Front Wig",
    "Water Wave HD Lace Wig",
    "Vacation Braids Style",
  ],
  ctaText: "Book Hair Service",
  decorativeText: "HAIR",
};

// ----------------------------------------------------------------------------
// Nail Services Section (Color Palette adapted for nail services)
// ----------------------------------------------------------------------------

export interface NailService {
  name: string;
  nameSecondary: string;
  color: string;
  description: string;
  image: string;
}

export interface NailServicesConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  services: NailService[];
  bottomText: string;
  decorativeText: string;
}

export const nailServicesConfig: NailServicesConfig = {
  sectionLabel: "NAIL ARTISTRY",
  headingMain: "Express",
  headingAccent: "Yourself",
  services: [
    {
      name: "Pink",
      nameSecondary: "Elegance",
      color: "#ffb6c1",
      description: "Soft pink French tips with heart accents",
      image: "/images/nails-pink.jpg",
    },
    {
      name: "Marble",
      nameSecondary: "Luxury",
      color: "#e8d5c4",
      description: "Rose gold marble with glitter details",
      image: "/images/nails-pink.jpg",
    },
    {
      name: "Chocolate",
      nameSecondary: "Glam",
      color: "#8b4513",
      description: "Rich brown with white French tips",
      image: "/images/nails-brown.jpg",
    },
    {
      name: "Sunset",
      nameSecondary: "Vibes",
      color: "#ff8c00",
      description: "Neon orange French tips",
      image: "/images/nails-orange.jpg",
    },
    {
      name: "Classic",
      nameSecondary: "French",
      color: "#f5f5dc",
      description: "Timeless white French manicure",
      image: "/images/nails-french.jpg",
    },
    {
      name: "Cherry",
      nameSecondary: "Wine",
      color: "#722f37",
      description: "Deep red with floral accents",
      image: "/images/nails-red.jpg",
    },
  ],
  bottomText: "Click any style to book your nail appointment",
  decorativeText: "NAILS",
};

// ----------------------------------------------------------------------------
// Gallery Section
// ----------------------------------------------------------------------------

export interface GalleryItem {
  image: string;
  alt: string;
  category: "hair" | "nails";
}

export interface GalleryConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  items: GalleryItem[];
  decorativeText: string;
}

export const galleryConfig: GalleryConfig = {
  sectionLabel: "PORTFOLIO",
  headingMain: "Our",
  headingAccent: "Work",
  items: [
    { image: "/images/brown-wig.jpg", alt: "Chocolate Brown Wig", category: "hair" },
    { image: "/images/nails-pink.jpg", alt: "Pink Nail Design", category: "nails" },
    { image: "/images/braids-vacation.jpg", alt: "Vacation Braids", category: "hair" },
    { image: "/images/nails-brown.jpg", alt: "Brown Nail Design", category: "nails" },
    { image: "/images/water-wave-wig.jpg", alt: "Water Wave Wig", category: "hair" },
    { image: "/images/nails-orange.jpg", alt: "Orange Nail Design", category: "nails" },
    { image: "/images/fulani-braids.jpg", alt: "Fulani Braids", category: "hair" },
    { image: "/images/nails-french.jpg", alt: "French Manicure", category: "nails" },
    { image: "/images/braids-copper.jpg", alt: "Copper Braids", category: "hair" },
    { image: "/images/nails-red.jpg", alt: "Red Nail Design", category: "nails" },
    { image: "/images/salon-wash.jpg", alt: "Salon Experience", category: "hair" },
    { image: "/images/nails-halloween.jpg", alt: "Halloween Nails", category: "nails" },
  ],
  decorativeText: "GALLERY",
};

// ----------------------------------------------------------------------------
// Booking Section
// ----------------------------------------------------------------------------

export interface ServiceOption {
  id: string;
  name: string;
  duration: string;
  category: "hair" | "nails";
}

export interface BookingConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  description: string;
  services: ServiceOption[];
  timeSlots: string[];
  ctaText: string;
  decorativeText: string;
}

export const bookingConfig: BookingConfig = {
  sectionLabel: "BOOK NOW",
  headingMain: "Schedule",
  headingAccent: "Your Visit",
  description: "Choose your preferred service and time slot. We'll confirm your appointment within 24 hours.",
  services: [
    { id: "hair1", name: "Lace Front Wig Install", duration: "2-3 hrs", category: "hair" },
    { id: "hair2", name: "Braids (Box/Fulani)", duration: "3-5 hrs", category: "hair" },
    { id: "hair3", name: "Hair Wash & Style", duration: "1-2 hrs", category: "hair" },
    { id: "hair4", name: "Wig Customization", duration: "1 hr", category: "hair" },
    { id: "nail1", name: "Gel Manicure", duration: "45 min", category: "nails" },
    { id: "nail2", name: "Acrylic Full Set", duration: "1.5 hrs", category: "nails" },
    { id: "nail3", name: "Nail Art Design", duration: "30 min", category: "nails" },
    { id: "nail4", name: "Pedicure", duration: "45 min", category: "nails" },
  ],
  timeSlots: [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ],
  ctaText: "Confirm Booking",
  decorativeText: "BOOK",
};

// ----------------------------------------------------------------------------
// About / Brand Philosophy Section (Finale adapted)
// ----------------------------------------------------------------------------

export interface AboutConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  tagline: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  decorativeText: string;
}

export const aboutConfig: AboutConfig = {
  sectionLabel: "ABOUT US",
  headingMain: "Beauty is",
  headingAccent: "Our Passion",
  tagline: "At Luxe Beauty Studio, we believe every client deserves to feel confident and beautiful. Our team of skilled stylists and nail technicians are dedicated to providing exceptional service using premium products and the latest techniques. Whether you're looking for a stunning new hairstyle or intricate nail art, we're here to bring your vision to life.",
  features: [
    "Licensed Professionals",
    "Premium Products",
    "Sanitized Environment",
    "Satisfaction Guaranteed",
  ],
  ctaText: "Meet Our Team",
  ctaHref: "#contact",
  image: "/images/salon-wash.jpg",
  imageAlt: "Luxe Beauty Studio Experience",
  decorativeText: "LUXE",
};

// ----------------------------------------------------------------------------
// Contact Section
// ----------------------------------------------------------------------------

export interface ContactConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  address: string;
  phone: string;
  email: string;
  hours: string[];
  socialLinks: { platform: string; href: string; label: string }[];
  decorativeText: string;
}

export const contactConfig: ContactConfig = {
  sectionLabel: "GET IN TOUCH",
  headingMain: "Visit",
  headingAccent: "Us",
  address: "Gate C, JKUAT University\nJuja Town, Kenya",
  phone: "0794973678",
  email: "mitchelakinyi1@gmail.com",
  hours: [
    "Monday - Friday: 9:00 AM - 7:00 PM",
    "Saturday: 9:00 AM - 6:00 PM",
    "Sunday: Closed",
  ],
  socialLinks: [
    { platform: "instagram", href: "https://instagram.com/just.mishy_", label: "just.mishy_" },
    { platform: "tiktok", href: "https://www.tiktok.com/@mishy", label: "mishy 🦋🤍" },
  ],
  decorativeText: "CONTACT",
};

// ----------------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------------

export interface SocialLink {
  platform: "instagram" | "tiktok";
  href: string;
  label: string;
}

export interface FooterLinkSection {
  title: string;
  links: string[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logo: string;
  logoAccent: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  linkSections: FooterLinkSection[];
  contact: ContactInfo;
  legalLinks: LegalLink[];
  copyrightText: string;
  decorativeText: string;
}

export const footerConfig: FooterConfig = {
  logo: "LUXE",
  logoAccent: ".",
  brandDescription: "Premium Hair & Nail Studio - Where beauty meets excellence. Book your appointment today and experience the Luxe difference.",
  socialLinks: [
    { platform: "instagram", href: "https://instagram.com/just.mishy_", label: "Instagram" },
    { platform: "tiktok", href: "https://www.tiktok.com/@mishy", label: "TikTok" },
  ],
  linkSections: [
    { title: "Services", links: ["Hair Styling", "Wig Install", "Braids", "Nail Art", "Manicure", "Pedicure"] },
    { title: "Company", links: ["About Us", "Our Team", "Careers", "Press"] },
    { title: "Support", links: ["FAQ", "Booking Policy", "Cancellation", "Contact"] },
  ],
  contact: {
    address: "Gate C, JKUAT University\nJuja Town, Kenya",
    phone: "0794973678",
    email: "mitchelakinyi1@gmail.com",
  },
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  copyrightText: "Luxe Beauty Studio. All rights reserved.",
  decorativeText: "LUXE",
};

// ----------------------------------------------------------------------------
// Admin Panel Config
// ----------------------------------------------------------------------------

export interface AdminConfig {
  enabled: boolean;
  loginPath: string;
  dashboardPath: string;
}

export const adminConfig: AdminConfig = {
  enabled: true,
  loginPath: "/admin/login",
  dashboardPath: "/admin/dashboard",
};

// ----------------------------------------------------------------------------
// Site Metadata
// ----------------------------------------------------------------------------

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Luxe Beauty Studio | Premium Hair & Nail Services",
  description: "Book your appointment at Luxe Beauty Studio for premium hair styling, wig installation, braids, and nail art services in Juja, Kenya.",
  language: "en",
};
