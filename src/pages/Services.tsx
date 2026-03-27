import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, MessageSquare, BarChart3, Bot, Check, Clock, Users, Target } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'

const programs = [
  {
    id: 'coreshift',
    icon: Zap,
    title: 'CoreShift',
    tagline: '90-Day Organizational Transformation',
    description: 'A full-stack overhaul of your commercial operations. We diagnose, redesign, and implement new sales processes, team structures, and performance systems.',
    whatYouGet: [
      'Complete sales process audit and redesign',
      'Leadership alignment workshops (C-suite + VPs)',
      'New KPI framework with real-time dashboards',
      'Team restructuring recommendations',
      'Post-program support for 30 additional days',
    ],
    forWho: 'Organizations experiencing flat/declining revenue despite growing headcount',
    metrics: [
      { icon: Clock, label: '90 Days', detail: 'Program Duration' },
      { icon: Users, label: '10-200', detail: 'Team Size' },
      { icon: Target, label: '2-3x', detail: 'Avg ROI' },
    ],
    color: 'from-brand-dark to-brand-mid',
  },
  {
    id: 'corexpress',
    icon: MessageSquare,
    title: 'CoreXpress',
    tagline: '60-Day Communication Mastery',
    description: 'Executive presence, stakeholder management, and negotiation under pressure. Built for teams that need to win in board rooms, not just meeting rooms.',
    whatYouGet: [
      'Executive presentation engineering',
      'Stakeholder influence mapping',
      'High-stakes negotiation frameworks',
      'Crisis communications playbook',
      'Individual coaching sessions (1:1)',
    ],
    forWho: 'Teams presenting to boards, investors, or enterprise clients',
    metrics: [
      { icon: Clock, label: '60 Days', detail: 'Program Duration' },
      { icon: Users, label: '5-50', detail: 'Participants' },
      { icon: Target, label: '85%', detail: 'Approval Rate Improvement' },
    ],
    color: 'from-brand-mid to-brand-light',
  },
  {
    id: 'salesdna',
    icon: BarChart3,
    title: 'Sales DNA',
    tagline: 'Commercial Intelligence Program',
    description: "Rewire how your team thinks about selling. We go beyond tactics to build the cognitive frameworks that separate elite performers from order-takers.",
    whatYouGet: [
      'Buyer psychology deep-dive workshops',
      'Pipeline architecture & forecasting models',
      'Closing frameworks for complex B2B cycles',
      'Competitive positioning strategy',
      'Ongoing monthly reinforcement calls',
    ],
    forWho: 'Sales teams with strong products but underperforming win rates',
    metrics: [
      { icon: Clock, label: 'Ongoing', detail: 'Continuous' },
      { icon: Users, label: '10-100', detail: 'Sellers' },
      { icon: Target, label: '+47%', detail: 'Avg Close Rate' },
    ],
    color: 'from-brand-light to-accent',
  },
  {
    id: 'aicore',
    icon: Bot,
    title: 'AI Core Martha',
    tagline: 'AI-Powered Business Intelligence',
    description: 'Your organization\'s AI partner. Martha analyzes operations, automates repetitive workflows, and generates actionable intelligence at scale.',
    whatYouGet: [
      'Operational workflow audit & automation plan',
      'Custom AI assistant deployment (Martha)',
      'Reporting automation (60% time savings avg)',
      'Integration with existing CRM/ERP systems',
      'Team training on AI tool adoption',
    ],
    forWho: 'Companies spending 15+ hours/week on manual reporting and analysis',
    metrics: [
      { icon: Clock, label: 'Custom', detail: 'Timeline' },
      { icon: Users, label: 'Any Size', detail: 'Scalable' },
      { icon: Target, label: '60%', detail: 'Time Savings' },
    ],
    color: 'from-accent to-blue-400',
  },
]

export function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-brand-dark/15 blur-[100px]" />
        </div>
        <div className="relative section-container !py-0 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge">Our Programs</span>
            <h1 className="mt-6">
              Precision Programs for{' '}
              <span className="gradient-text">Real Problems</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              Each program is a proven system, not a generic seminar.
              We diagnose first, prescribe second, and measure always.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Programs */}
      {programs.map((program, index) => (
        <ProgramSection key={program.id} program={program} index={index} />
      ))}

      {/* CTA Section */}
      <section className="relative">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Not Sure Which Program?</h2>
            <p className="mt-4 text-text-secondary max-w-lg mx-auto">
              Book a free 30-minute diagnostic call. We'll assess your situation
              and recommend the right path — even if it's not with us.
            </p>
            <Link to="/contact" className="btn-primary mt-8">
              Book Free Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function ProgramSection({ program, index }: {
  program: typeof programs[number]
  index: number
}) {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section ref={ref} className="relative" id={program.id}>
      <div className="section-container">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${program.color} mb-6`}>
              <program.icon className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">{program.title}</h2>
            <p className="text-brand-mid font-semibold mb-4">{program.tagline}</p>
            <p className="text-text-secondary leading-relaxed mb-8">{program.description}</p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-4 mb-8">
              {program.metrics.map((metric) => (
                <div key={metric.detail} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-card border border-border-dark">
                  <metric.icon className="h-4 w-4 text-brand-mid" />
                  <span className="text-sm font-bold text-text-primary font-mono">{metric.label}</span>
                  <span className="text-xs text-text-muted">{metric.detail}</span>
                </div>
              ))}
            </div>

            <Link to="/contact" className="btn-primary">
              Get Started with {program.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* What You Get Card */}
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-text-primary mb-6">What You Get</h3>
            <ul className="space-y-4">
              {program.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-border-dark">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Ideal For</p>
              <p className="text-sm text-text-secondary">{program.forWho}</p>
            </div>
          </motion.div>
        </div>
      </div>
      {index < programs.length - 1 && <div className="section-divider" />}
    </section>
  )
}
