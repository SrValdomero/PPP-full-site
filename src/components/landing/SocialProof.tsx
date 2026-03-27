import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useInView } from '../../hooks/useAnimations'

const testimonials = [
  {
    quote: "PPP didn't just improve our sales numbers — they fundamentally changed how our entire team thinks about value creation. Our close rate went from 18% to 47% in 90 days.",
    author: 'María Elena Torres',
    title: 'VP of Sales, TechGlobal LATAM',
    rating: 5,
  },
  {
    quote: "The AI Core Martha integration automated 60% of our reporting workflow. What used to take our team 3 days now takes 4 hours. The ROI was visible within the first month.",
    author: 'Carlos Rivera',
    title: 'COO, FinanceHub Caribbean',
    rating: 5,
  },
  {
    quote: "CoreXpress transformed how our executive team communicates with stakeholders. Board presentations that used to get rejected are now getting approved on first pass.",
    author: 'Andrea Vásquez',
    title: 'Director of Strategy, IndustriaMax',
    rating: 5,
  },
]

const clientLogos = [
  'TechGlobal', 'FinanceHub', 'IndustriaMax', 'Meridian Corp', 
  'Atlas Group', 'NovaPrime', 'Vertex Solutions', 'ClearPath',
]

export function SocialProof() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative" id="testimonials">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="badge mb-4">Client Results</span>
          <h2 className="mt-4">
            Measurable Impact,{' '}
            <span className="gradient-text">Every Engagement</span>
          </h2>
        </motion.div>

        {/* Logo Bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mb-16 pb-16 border-b border-border-dark"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {clientLogos.map((logo, i) => (
            <motion.div
              key={logo}
              className="text-sm font-semibold text-text-muted/40 uppercase tracking-widest hover:text-text-secondary transition-colors"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              className="glass-card p-8 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote className="absolute -top-1 -left-1 h-6 w-6 text-brand-dark/30" />
                <p className="text-sm text-text-secondary leading-relaxed pl-6">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 pt-6 border-t border-border-dark">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-dark to-brand-mid flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-text-muted">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
