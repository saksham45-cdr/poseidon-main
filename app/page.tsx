'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, MapPin, BarChart2, ArrowRight, Upload, Cpu, Globe, FileText } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const PROCESS_STEPS = [
  { icon: Upload, step: '01', label: 'Upload Sonar Image' },
  { icon: Cpu, step: '02', label: 'AI Debris Detection' },
  { icon: Globe, step: '03', label: 'Geospatial Mapping' },
  { icon: FileText, step: '04', label: 'Export Report' },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'AI Detection',
    body: 'Automated YOLO-based inference filters natural seabed clutter to surface man-made debris with high confidence and a low false-positive rate.',
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    iconBorder: 'border-amber-200 dark:border-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: MapPin,
    title: 'Geospatial Mapping',
    body: 'Pixel-to-coordinate conversion renders every detected object as a precise geolocation on an interactive real-time map.',
    iconBg: 'bg-orange-50 dark:bg-orange-500/10',
    iconBorder: 'border-orange-200 dark:border-orange-500/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    icon: BarChart2,
    title: 'Automated Reports',
    body: 'One-click export of structured JSON and CSV reports with full detection metadata, ready for analysis or dashboard integration.',
    iconBg: 'bg-yellow-50 dark:bg-yellow-500/10',
    iconBorder: 'border-yellow-200 dark:border-yellow-500/20',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
];

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-transparent text-stone-900 dark:text-stone-100 selection:bg-amber-500/30 overflow-x-hidden font-sans">

      {/* ── Hero ── */}
      <main className="relative z-10 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/60 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold tracking-[0.14em] uppercase backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
              Marine Intelligence Platform
            </span>
          </motion.div>

          {/* Product name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.06em] uppercase mb-6 leading-none"
          >
            <span className="bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 dark:from-stone-50 dark:via-stone-200 dark:to-stone-400 bg-clip-text text-transparent">
              POSEIDON
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-5 leading-snug"
          >
            Illuminate the deep. Surface what matters.
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.46, ease: 'easeOut' }}
            className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-xl leading-relaxed mb-12"
          >
            AI-powered sonar analysis that detects marine debris, maps every coordinate, and delivers exportable reports — from upload to insight in seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/console"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-full transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:shadow-xl hover:-translate-y-px active:translate-y-0 no-theme-transition"
            >
              Begin Detection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-stone-700 dark:text-stone-300 font-medium rounded-full border border-stone-300 dark:border-stone-700 hover:border-amber-400/70 dark:hover:border-amber-500/50 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-amber-50/60 dark:hover:bg-amber-500/[0.07] transition-all duration-200 no-theme-transition"
            >
              Explore Features
            </a>
          </motion.div>
        </div>

        {/* Decorative radial glow */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-2/3 -z-10 flex justify-center">
          <div className="w-[700px] h-[280px] bg-amber-400/8 dark:bg-amber-500/6 rounded-full blur-3xl" />
        </div>
      </main>

      {/* ── Process strip ── */}
      <section
        aria-label="How it works"
        className="relative z-10 py-14 border-y border-stone-200/60 dark:border-stone-800/50 bg-white/40 dark:bg-stone-900/25 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map(({ icon: Icon, step, label }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center">
                    <Icon size={20} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-500/30 rounded-full w-5 h-5 flex items-center justify-center leading-none">
                    {i + 1}
                  </span>
                </div>
                <span className="text-sm font-medium text-stone-600 dark:text-stone-400">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features section ── */}
      <section id="features" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-amber-600 dark:text-amber-400 mb-4">
              Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Built for Marine Surveyors
            </h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
              Purpose-built machine learning meets field-ready geospatial tooling — delivering actionable intelligence from raw sonar data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES.map(({ icon: Icon, title, body, iconBg, iconBorder, iconColor }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.22 } }}
                className="group relative bg-white/55 dark:bg-stone-900/50 backdrop-blur-md p-8 rounded-3xl border border-stone-200/60 dark:border-stone-800/60 hover:border-amber-400/50 dark:hover:border-amber-500/35 hover:bg-white dark:hover:bg-stone-900/80 transition-colors shadow-sm hover:shadow-md hover:shadow-amber-500/[0.07] cursor-default"
              >
                {/* Hover top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/70 transition-all duration-500 rounded-full" />

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-110 ${iconBg} ${iconBorder}`}>
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-stone-900 dark:text-stone-100">{title}</h3>
                <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="relative z-10 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="relative bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-amber-500/[0.07] dark:to-orange-500/[0.04] border border-amber-200/80 dark:border-amber-500/25 rounded-3xl p-12 text-center overflow-hidden"
          >
            {/* Glow */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-amber-400/12 dark:bg-amber-500/8 rounded-full blur-3xl" />
            </div>

            <p className="relative text-xs font-semibold tracking-[0.18em] uppercase text-amber-600 dark:text-amber-400 mb-4">
              Ready to start
            </p>
            <h2 className="relative text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              See beneath the surface
            </h2>
            <p className="relative text-stone-500 dark:text-stone-400 mb-8 leading-relaxed max-w-md mx-auto">
              Upload your first sonar image and receive a full debris analysis with geospatial coordinates and a ready-to-export report.
            </p>
            <Link
              href="/console"
              className="relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-full transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:shadow-xl hover:-translate-y-px active:translate-y-0 no-theme-transition"
            >
              Open Console
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
