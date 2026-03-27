import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      id="hero"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-dark/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-mid/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[150px]" />

        {/* Blueprint Grid */}
        <div className="absolute inset-0 blueprint-grid opacity-40" />

        {/* Radial Gradient Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-surface-dark)_70%)]" />
      </div>

      <div className="relative z-10 section-container !py-0 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="badge">
            <Sparkles className="h-3 w-3" />
            10+ Years Transforming Organizations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-8 text-text-primary max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Transform Your Team Into{' '}
          <span className="gradient-text">Market Leaders</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          We don't train teams — we{' '}
          <span className="text-text-primary font-semibold">re-engineer how they sell, communicate, and compete.</span>{' '}
          Advanced sales methodology meets AI-powered business intelligence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Get Your Free Assessment
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/services" className="btn-secondary text-base px-8 py-4">
            Explore Our Programs
          </Link>
        </motion.div>

        {/* Trust Indicator */}
        <motion.p
          className="mt-8 text-xs text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          Trusted by 200+ organizations across LATAM, Caribbean & North America
        </motion.p>

        {/* Animated Line */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-brand-mid to-transparent mx-auto"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          style={{ maxWidth: '24rem' }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          className="h-8 w-5 rounded-full border border-border-dark flex items-start justify-center p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-brand-mid"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
