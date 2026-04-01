import { useState } from 'react';
import { 
  LogOut, 
  Calendar, 
  Image, 
  CheckCircle, 
  XCircle, 
  Clock,
  Trash2,
  Upload,
  ExternalLink
} from 'lucide-react';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const loadStoredArray = <T,>(key: string): T[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
  } catch {
    return [];
  }
};

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'gallery'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>(() => loadStoredArray<Booking>('luxe_bookings'));
  const [galleryImages, setGalleryImages] = useState<string[]>(() =>
    loadStoredArray<unknown>('luxe_gallery').filter((value): value is string => typeof value === 'string')
  );

  const handleStatusChange = (bookingId: number, newStatus: Booking['status']) => {
    setBookings((currentBookings) => {
      const updatedBookings = currentBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      localStorage.setItem('luxe_bookings', JSON.stringify(updatedBookings));
      return updatedBookings;
    });
  };

  const handleDeleteBooking = (bookingId: number) => {
    setBookings((currentBookings) => {
      const updatedBookings = currentBookings.filter((booking) => booking.id !== bookingId);
      localStorage.setItem('luxe_bookings', JSON.stringify(updatedBookings));
      return updatedBookings;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') {
          return;
        }

        setGalleryImages((currentImages) => {
          const nextImages = [...currentImages, reader.result as string];
          localStorage.setItem('luxe_gallery', JSON.stringify(nextImages));
          return nextImages;
        });
      };
      reader.readAsDataURL(file);
    });

    e.currentTarget.value = '';
  };

  const handleDeleteImage = (index: number) => {
    setGalleryImages((currentImages) => {
      const nextImages = currentImages.filter((_, imageIndex) => imageIndex !== index);
      localStorage.setItem('luxe_gallery', JSON.stringify(nextImages));
      return nextImages;
    });
  };

  const getServiceName = (serviceId: string) => {
    const services: Record<string, string> = {
      hair1: 'Lace Front Wig Install',
      hair2: 'Braids (Box/Fulani)',
      hair3: 'Hair Wash & Style',
      hair4: 'Wig Customization',
      nail1: 'Gel Manicure',
      nail2: 'Acrylic Full Set',
      nail3: 'Nail Art Design',
      nail4: 'Pedicure',
    };
    return services[serviceId] || serviceId;
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-display uppercase">
            <CheckCircle className="w-3 h-3" /> Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 text-xs font-display uppercase">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-display uppercase">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="font-display font-black text-2xl text-white">
              LUXE<span className="text-pink">.</span>
            </h1>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center gap-2 font-body text-sm uppercase tracking-wider transition-colors duration-300 ${
                  activeTab === 'bookings' ? 'text-pink' : 'text-white/60 hover:text-white'
                }`}
                data-cursor-hover
              >
                <Calendar className="w-4 h-4" /> Bookings
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 font-body text-sm uppercase tracking-wider transition-colors duration-300 ${
                  activeTab === 'gallery' ? 'text-pink' : 'text-white/60 hover:text-white'
                }`}
                data-cursor-hover
              >
                <Image className="w-4 h-4" /> Gallery
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 font-body text-sm text-white/60 hover:text-pink transition-colors duration-300"
              data-cursor-hover
            >
              <ExternalLink className="w-4 h-4" /> View Site
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white/60 hover:border-pink hover:text-pink transition-all duration-300"
              data-cursor-hover
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-pink" />
              <span className="font-body text-white/40 text-sm uppercase">Total Bookings</span>
            </div>
            <div className="font-display font-black text-3xl text-white">{bookings.length}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="font-body text-white/40 text-sm uppercase">Pending</span>
            </div>
            <div className="font-display font-black text-3xl text-white">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-body text-white/40 text-sm uppercase">Confirmed</span>
            </div>
            <div className="font-display font-black text-3xl text-white">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Image className="w-5 h-5 text-pink" />
              <span className="font-body text-white/40 text-sm uppercase">Gallery Images</span>
            </div>
            <div className="font-display font-black text-3xl text-white">{galleryImages.length}</div>
          </div>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="font-display font-bold text-xl text-white mb-6">Appointments</h2>
            {bookings.length === 0 ? (
              <div className="bg-white/5 border border-white/10 p-12 text-center">
                <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="font-body text-white/40">No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white/5 border border-white/10 p-6 hover:border-pink/50 transition-colors duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-display font-bold text-lg text-white">{booking.name}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-white/40">Service:</span>
                            <p className="text-white">{getServiceName(booking.service)}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Date & Time:</span>
                            <p className="text-white">{booking.date} at {booking.time}</p>
                          </div>
                          <div>
                            <span className="text-white/40">Contact:</span>
                            <p className="text-white">{booking.phone}</p>
                            <p className="text-white/60 text-xs">{booking.email}</p>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <span className="text-white/40 text-sm">Notes:</span>
                            <p className="text-white/60 text-sm">{booking.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors duration-300"
                              data-cursor-hover
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-300"
                              data-cursor-hover
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="px-4 py-2 bg-white/5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors duration-300"
                          data-cursor-hover
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-white">Gallery Management</h2>
              <label
                className="flex items-center gap-2 px-6 py-3 bg-pink text-black font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 cursor-pointer"
                data-cursor-hover
              >
                <Upload className="w-4 h-4" /> Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {galleryImages.length === 0 ? (
              <div className="bg-white/5 border border-white/10 p-12 text-center">
                <Image className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="font-body text-white/40 mb-4">No images uploaded yet</p>
                <p className="font-body text-white/20 text-sm">
                  Upload images to add them to your gallery
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="w-10 h-10 bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                        data-cursor-hover
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
