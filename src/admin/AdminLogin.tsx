import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (in production, use proper backend auth)
    if (username === 'admin' && password === 'luxe2024') {
      localStorage.setItem('luxe_admin_logged_in', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-display font-black text-4xl text-white">
            LUXE<span className="text-pink">.</span>
          </h1>
          <p className="font-body text-white/40 mt-2">Admin Dashboard</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white placeholder:text-white/40 focus:border-pink focus:outline-none transition-colors duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white placeholder:text-white/40 focus:border-pink focus:outline-none transition-colors duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-pink transition-colors duration-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-pink text-black font-display font-bold text-sm uppercase tracking-wider py-4 hover:bg-white transition-colors duration-300"
            data-cursor-hover
          >
            Sign In
          </button>
        </form>

        {/* Back to site */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="font-body text-white/40 hover:text-pink transition-colors duration-300 text-sm"
            data-cursor-hover
          >
            &larr; Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
