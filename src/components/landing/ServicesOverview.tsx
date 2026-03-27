import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, MessageSquare, BarChart3, Bot } from 'lucide-react'
import { useInView } from '../../hooks/useAnimations'

const services = [
  {
    icon: Zap,
    title: 'CoreShift',
    duration: '90 Days',
    description: 'Complete organizational transformation. Restructure sales operations, communication frameworks, and team performance systems from the ground up.',
    features: ['Sales Process Redesign', 'Leadership Alignment', 'Performance Metrics'],
    color: 'from-brand-dark to-brand-mid',
    borderColor: 'hover:border-brand-dark',
    path: '/services#coreshift',
  },
  {
    icon: MessageSquare,
    title: 'CoreXpress',
    duration: '60 Days',
    description: 'Accelerated communication mastery. Equip your team with advanced presentation, negotiation, and stakeholder management skills.',
    features: ['Executive Presence', 'Negotiation Tactics', 'Stakeholder Mapping'],
    color: 'from-brand-mid to-brand-light',
    borderColor: 'hover:border-brand-mid',
    path: '/services#corexpress',
  },
  {
    icon: BarChart3,
    title: 'Sales DNA',
    duration: 'Ongoing',
    description: 'Commercial intelligence program. Build the psychological and strategic foundations that separate elite sellers from average performers.',
    features: ['Buyer Psychology', 'Pipeline Architecture', 'Closing Frameworks'],
    color: 'from-brand-light to-accent',
    borderColor: 'hover:border-brand-light',
    path: '/services#salesdna',
  },
  {
    icon: Bot,
    title: 'AI Core Martha',
    duration: 'Custom',
    description: 'Your AI-powered business intelligence partner. Martha analyzes operations, generates insights, and automates repetitive workflows.',
    features: ['Operational Analysis', 'Workflow Automation', 'Predictive Insights'],
    color: 'from-accent to-blue-400',
    borderColor: 'hover:border-accent',
    path: '/services#aicore',
  },
]

export function ServicesOverview() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section ref={ref} className="relative" id="services">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="badge mb-4">Our Programs</span>
          <h2 className="mt-4 text-text-primary">
            Four Pillars of{' '}
            <span className="gradient-text">Transformation</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Each program is a precision instrument designed for a specific business challenge.
            Deploy one — or combine all four for complete organizational evolution.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={service.path}
                className={`glass-card group block p-8 cursor-pointer h-full ${service.borderColor}`}
              >
                {/* Icon + Duration */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider border border-border-dark rounded-full px-3 py-1">
                    {service.duration}
                  </span>
                </div>

                {/* Title + Description */}
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-light transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1.5 rounded-md bg-surface-card text-text-muted border border-border-dark"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-mid group-hover:text-brand-light transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
