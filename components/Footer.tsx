'use client';

export default function Footer() {
  return (
    <footer className="relative z-10 py-6 border-t border-stone-200 dark:border-stone-800 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

        {/* Left: Copyright */}
        <p className="text-sm text-stone-500 font-sans text-center md:text-left">
          &copy; 2026 Poseidon. Made by Team Unstable.
        </p>

        {/* Right: GitHub */}
        <a
          href="https://github.com/agrimgarg08/anveshan"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors duration-300"
          aria-label="GitHub Repository"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
            <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
          </svg>
        </a>

      </div>
    </footer>
  );
}
