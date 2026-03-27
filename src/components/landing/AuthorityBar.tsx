import { motion } from 'framer-motion'
import { Calendar, Building2, BookOpen, TrendingUp } from 'lucide-react'
import { useInView, useCountUp } from '../../hooks/useAnimations'

const metrics = [
  { icon: Calendar, value: 10, suffix: '+', label: 'Years Experience', prefix: '' },
  { icon: Building2, value: 200, suffix: '+', label: 'Companies Transformed', prefix: '' },
  { icon: BookOpen, value: 4, suffix: '', label: 'Core Programs', prefix: '' },
  { icon: TrendingUp, value: 95, suffix: '%', label: 'Client Retention', prefix: '' },
]

function MetricItem({ icon: Icon, value, suffix, label, prefix, animate }: {
  icon: typeof Calendar
  value: number
  suffix: string
  prefix: string
  label: string
  animate: boolean
}) {
  const count = useCountUp(value, 2000, animate)

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-dark/20 border border-brand-dark/30">
        <Icon className="h-5 w-5 text-brand-light" />
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono tracking-tight">
          {prefix}{count}{suffix}
        </div>
        <div className="text-xs sm:text-sm text-text-muted">{label}</div>
      </div>
    </div>
  )
}

export function AuthorityBar() {
  const { ref, isInView } = useInView({ threshold: 0.25 })

  return (
    <section ref={ref} className="relative py-16 sm:py-20" id="authority">
      <div className="section-container !py-0">
        <motion.div
          className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <MetricItem {...metric} animate={isInView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
