'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { LogIn, LogOut, Settings, Sun, Moon, Check, X, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

/* ── Sunrise-trident brand icon ── */
function PoseidonIcon({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Horizon line */}
      <line x1="3" y1="18" x2="25" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Rising sun arc */}
      <path d="M8 18 A6 6 0 0 1 20 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Center ray */}
      <line x1="14" y1="5" x2="14" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Left ray */}
      <line x1="6" y1="10" x2="8.5" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Right ray */}
      <line x1="22" y1="10" x2="19.5" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { authenticated, authReady, logout, username } = useAuth();
  const { theme, setTheme } = useTheme();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setShowLogoutConfirm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsDropdownOpen(false);
    setShowLogoutConfirm(false);
    toast.success('Successfully logged out');
  };

  return (
    <nav className="sticky top-4 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl mx-auto bg-white/85 dark:bg-stone-950/85 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800/60 rounded-full z-50 transition-colors shadow-lg shadow-stone-200/40 dark:shadow-stone-950/60 mt-4 mb-6">
      <div className="pl-5 pr-3.5 lg:pl-6 lg:pr-3.5">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" onClick={handleHomeClick} className="flex items-center gap-2.5 group">
              <PoseidonIcon className="text-amber-500 dark:text-amber-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold text-xl tracking-[0.18em] uppercase text-stone-900 dark:text-stone-50 transition-colors">
                POSEIDON
              </span>
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-stone-300 dark:bg-stone-700 hidden sm:block rounded-full" />

            {/* Navigation links */}
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                onClick={handleHomeClick}
                className={`transition-all duration-200 py-1 ${
                  pathname === '/'
                    ? 'text-amber-600 dark:text-amber-400 font-semibold drop-shadow-[0_0_8px_rgba(245,158,11,0.45)] dark:drop-shadow-[0_0_10px_rgba(251,191,36,0.55)]'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                Home
              </Link>
              <Link
                href="/console"
                className={`transition-all duration-200 py-1 ${
                  pathname === '/console'
                    ? 'text-amber-600 dark:text-amber-400 font-semibold drop-shadow-[0_0_8px_rgba(245,158,11,0.45)] dark:drop-shadow-[0_0_10px_rgba(251,191,36,0.55)]'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                Console
              </Link>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {authReady && (
              <>
                {authenticated ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                        setShowLogoutConfirm(false);
                      }}
                      className="w-9 h-9 flex items-center justify-center rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                      aria-label="Settings"
                    >
                      <Settings size={20} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col z-50 origin-top-right"
                        >
                          <div className="p-2 border-b border-stone-100 dark:border-stone-800">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors cursor-default">
                              <User size={16} className="text-stone-500 dark:text-stone-400" />
                              <span className="text-sm font-medium text-stone-700 dark:text-stone-200 truncate">
                                {username || 'admin'}
                              </span>
                            </div>
                          </div>

                          <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                              Appearance
                            </span>
                            {mounted && (
                              <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="relative flex items-center w-14 h-7 rounded-full bg-stone-200 dark:bg-stone-700 transition-colors focus:outline-none cursor-pointer"
                                aria-label="Toggle Dark Mode"
                              >
                                <div
                                  className={`absolute left-1 flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-stone-900 shadow-sm transition-transform duration-300 ${
                                    theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                                  }`}
                                >
                                  <div className="relative flex items-center justify-center w-full h-full">
                                    <Moon
                                      size={12}
                                      className={`absolute text-stone-400 transition-all duration-300 ${
                                        theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
                                      }`}
                                    />
                                    <Sun
                                      size={12}
                                      className={`absolute text-amber-500 transition-all duration-300 ${
                                        theme === 'dark' ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'
                                      }`}
                                    />
                                  </div>
                                </div>
                              </button>
                            )}
                          </div>

                          <div className="p-2 min-h-[50px] flex items-center justify-center relative overflow-hidden">
                            <AnimatePresence mode="wait">
                              {!showLogoutConfirm ? (
                                <motion.button
                                  key="signout-btn"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  transition={{ duration: 0.2 }}
                                  onClick={() => setShowLogoutConfirm(true)}
                                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                                >
                                  <LogOut size={16} />
                                  Sign Out
                                </motion.button>
                              ) : (
                                <motion.div
                                  key="confirm-box"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex flex-col gap-2 p-1 w-full"
                                >
                                  <span className="text-xs text-center text-stone-500 dark:text-stone-400 mb-1">
                                    Are you sure?
                                  </span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={handleLogout}
                                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors cursor-pointer"
                                    >
                                      <Check size={14} /> Yes
                                    </button>
                                    <button
                                      onClick={() => setShowLogoutConfirm(false)}
                                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 text-xs font-medium transition-colors cursor-pointer"
                                    >
                                      <X size={14} /> No
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
                      pathname === '/login'
                        ? 'bg-amber-500 text-stone-950 shadow-[0_0_16px_rgba(245,158,11,0.4)]'
                        : 'bg-stone-900 text-white hover:bg-stone-800 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400 shadow-md hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] dark:shadow-[0_0_16px_rgba(245,158,11,0.3)] dark:hover:shadow-[0_0_24px_rgba(245,158,11,0.45)]'
                    }`}
                  >
                    <LogIn size={16} />
                    <span>Log In</span>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
