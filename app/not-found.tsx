'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
      >
        <Compass size={48} strokeWidth={1.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="text-7xl md:text-8xl font-bold text-stone-900 dark:text-stone-100 mb-4 tracking-tight"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="text-2xl md:text-3xl font-semibold text-stone-700 dark:text-stone-300 mb-6"
      >
        Lost at Sea
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-10 text-lg"
      >
        It looks like this sector hasn't been scanned yet. The page you are looking for doesn't exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-full transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-px no-theme-transition"
        >
          <Home size={18} /> Return Home
        </Link>
      </motion.div>
    </main>
  );
}
