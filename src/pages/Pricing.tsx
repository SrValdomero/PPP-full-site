import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Zap, MessageSquare, BarChart3, Bot, HelpCircle, X } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'

type BillingPeriod = 'project' | 'retainer'

const plans = [
  {
    icon: Zap,
    name: 'CoreShift',
    projectPrice: 'Custom',
    retainerPrice: null,
    description: '90-day complete transformation',
    features: [
      'Full sales process audit',
      'Leadership alignment workshops',
      'KPI framework + dashboards',
      'Team restructuring plan',
      '30-day post-program support',
      'Bi-weekly executive check-ins',
    ],
    cta: 'Request Proposal',
    popular: false,
    color: 'from-brand-dark to-brand-mid',
  },
  {
    icon: MessageSquare,
    name: 'CoreXpress',
    projectPrice: 'Custom',
    retainerPrice: null,
    description: '60-day communication mastery',
    features: [
      'Executive presentation engineering',
      'Stakeholder influence mapping',
      'Negotiation frameworks',
      'Crisis communications playbook',
      '1:1 coaching sessions',
      'Presentation review & feedback',
    ],
    cta: 'Request Proposal',
    popular: false,
    color: 'from-brand-mid to-brand-light',
  },
  {
    icon: BarChart3,
    name: 'Sales DNA',
    projectPrice: 'Custom',
    retainerPrice: '$5,000/mo',
    description: 'Ongoing commercial intelligence',
    features: [
      'Buyer psychology workshops',
      'Pipeline architecture',
      'Closing frameworks (B2B)',
      'Competitive positioning',
      'Monthly reinforcement calls',
      'Quarterly strategy reviews',
    ],
    cta: 'Get Started',
    popular: true,
    color: 'from-brand-light to-accent',
  },
  {
    icon: Bot,
    name: 'AI Core Martha',
    projectPrice: 'Custom',
    retainerPrice: '$3,000/mo',
    description: 'AI-powered business intelligence',
    features: [
      'Workflow audit & automation',
      'Custom AI assistant (Martha)',
      'CRM/ERP integration',
      'Reporting automation',
      'Team AI training',
      'Monthly optimization reviews',
    ],
    cta: 'Request Demo',
    popular: false,
    color: 'from-accent to-blue-400',
  },
]

const faqs = [
  {
    q: 'How long does it take to see results?',
    a: 'Most clients see measurable improvements within the first 30 days. CoreShift delivers full transformation metrics at day 90. Sales DNA clients typically see close rate improvements within 60 days.',
  },
  {
    q: 'Do you work with small teams?',
    a: 'Yes. CoreXpress works with teams as small as 5 people. Sales DNA and AI Core Martha are effective at any team size. CoreShift is designed for organizations with 10+ sales team members.',
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We work across technology, financial services, healthcare, manufacturing, and professional services. Our methodology is industry-agnostic — the behavioral and strategic principles apply universally.',
  },
  {
    q: 'Can we combine multiple programs?',
    a: 'Absolutely. Many clients start with CoreShift for organizational redesign, then add Sales DNA for ongoing reinforcement and AI Core Martha for operational efficiency. We offer bundled pricing.',
  },
  {
    q: 'What if the program doesn\'t deliver results?',
    a: 'We stand behind our work with a performance guarantee. If predefined KPIs aren\'t met, we extend the program at no additional cost until targets are achieved.',
  },
]

export function Pricing() {
  const { ref, isInView } = useInView()
  const [billing, setBilling] = useState<BillingPeriod>('project')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-brand-dark/15 blur-[100px]" />
        </div>
        <div className="relative section-container !py-0 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge">Pricing</span>
            <h1 className="mt-6">
              Investment in{' '}
              <span className="gradient-text">Transformation</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              Every engagement is custom-scoped to your needs.
              Transparent pricing, no hidden fees, performance-guaranteed.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl bg-surface-card border border-border-dark p-1">
            <button
              onClick={() => setBilling('project')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                billing === 'project'
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Project-Based
            </button>
            <button
              onClick={() => setBilling('retainer')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                billing === 'retainer'
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Retainer
            </button>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section ref={ref} className="relative">
        <div className="section-container !pt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`glass-card p-6 flex flex-col relative ${
                  plan.popular ? 'border-accent/40 ring-1 ring-accent/20' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-1 py-0.5">
                    <span className="badge text-[10px] px-3 py-1">Most Popular</span>
                  </div>
                )}

                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${plan.color} mb-4`}>
                  <plan.icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-lg font-bold text-text-primary">{plan.name}</h3>
                <p className="text-xs text-text-muted mt-1 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-2xl font-bold text-text-primary font-mono">
                    {billing === 'retainer' && plan.retainerPrice ? plan.retainerPrice : plan.projectPrice}
                  </span>
                  {billing === 'retainer' && !plan.retainerPrice && (
                    <p className="text-xs text-text-muted mt-1">Retainer not available</p>
                  )}
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className={`mt-6 text-center py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'btn-primary justify-center w-full'
                    : 'btn-secondary justify-center w-full'
                }`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section className="relative">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="glass-card overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 cursor-pointer text-left"
                >
                  <span className="text-sm font-semibold text-text-primary pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <X className="h-4 w-4 text-text-muted shrink-0" />
                  ) : (
                    <HelpCircle className="h-4 w-4 text-text-muted shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5 prose prose-sm max-w-none text-text-secondary"
                  >
                    {typeof faq.a === 'string' ? <p>{faq.a}</p> : faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative">
        <div className="section-container text-center">
          <h2>Ready to Invest in Your Team?</h2>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto">
            Every engagement starts with a free diagnostic call. No pressure, no hard sell.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Schedule Free Call
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
