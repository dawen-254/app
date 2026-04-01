import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem('luxe_admin_logged_in') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('luxe_admin_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('luxe_admin_logged_in');
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </>
  );
};

export default AdminApp;
