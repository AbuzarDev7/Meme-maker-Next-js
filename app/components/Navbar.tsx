'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      setUsername(localStorage.getItem('username') || '');
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/');
  };

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold premium-gradient-text tracking-tight">
          AESTHETIC
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/" className="hover:text-brand-primary transition-colors font-medium">Home</Link>
          <Link href="/about" className="hover:text-brand-primary transition-colors font-medium">About</Link>
          <Link href="/meme-maker" className="hover:text-brand-primary transition-colors font-medium">Meme Maker</Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold opacity-60">Hi, {username}</span>
              <button 
                onClick={handleLogout}
                className="btn-premium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-premium">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
