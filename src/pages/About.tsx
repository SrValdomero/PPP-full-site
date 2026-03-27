import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Shield, Award, Users } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'

const values = [
  { icon: Target, title: 'Precision', description: 'Every program is calibrated to your specific industry, team size, and growth objectives. No templates.' },
  { icon: Eye, title: 'Transparency', description: 'Real-time dashboards, no hidden costs. You see exactly what we do and measure every result.' },
  { icon: Heart, title: 'Partnership', description: "We don't disappear after delivery. Ongoing support means your gains compound, not decay." },
  { icon: Shield, title: 'Integrity', description: 'If your problem needs a different solution, we\'ll tell you — even if it means referring you elsewhere.' },
]

const team = [
  { name: 'Rafael Méndez', role: 'Founder & CEO', expertise: 'Sales Strategy, AI Implementation', initials: 'RM' },
  { name: 'Laura Chen', role: 'Head of Programs', expertise: 'Organizational Development', initials: 'LC' },
  { name: 'Marcus Thompson', role: 'AI Lead', expertise: 'Machine Learning, Business Automation', initials: 'MT' },
  { name: 'Sofia Alvarado', role: 'Client Success Director', expertise: 'Account Management, Training', initials: 'SA' },
]

export function About() {
  const { ref: missionRef, isInView: missionInView } = useInView()
  const { ref: valuesRef, isInView: valuesInView } = useInView()
  const { ref: teamRef, isInView: teamInView } = useInView()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-brand-dark/15 blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-brand-mid/10 blur-[100px]" />
        </div>
        <div className="relative section-container !py-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge">About PPP</span>
            <h1 className="mt-6">
              Built by Operators,{' '}
              <span className="gradient-text">Not Academics</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              PPP was founded on a simple belief: the best sales training comes from
              people who've carried a quota, closed enterprise deals, and built teams
              from scratch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="relative">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                We exist to close the gap between how organizations <em>think</em> they
                sell and how they <em>actually</em> sell. For 10+ years, we've helped
                200+ companies across LATAM, the Caribbean, and North America transform
                their commercial operations.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our methodology combines behavioral psychology, data-driven diagnostics,
                and AI-powered tools to create lasting transformation — not temporary
                motivation.
              </p>
              <Link to="/services" className="btn-primary">
                Explore Our Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              className="glass-card p-8 dot-grid"
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                {[
                  { icon: Award, stat: '10+', label: 'Years of transforming organizations' },
                  { icon: Users, stat: '200+', label: 'Companies across 3 continents' },
                  { icon: Target, stat: '95%', label: 'Client retention rate' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-brand-dark/20 border border-brand-dark/30 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-brand-light" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-text-primary font-mono">{item.stat}</span>
                      <p className="text-sm text-text-muted">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Values */}
      <section ref={valuesRef} className="relative" id="values">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                className="glass-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark/20 mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-brand-light" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Team */}
      <section ref={teamRef} className="relative" id="team">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>
              The <span className="gradient-text">Team</span>
            </h2>
            <p className="mt-4 text-text-secondary max-w-xl mx-auto">
              Operators, not consultants. Every team member has direct experience
              building and scaling commercial teams.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="glass-card p-6 text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-dark to-brand-mid flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-base font-bold text-text-primary">{member.name}</h3>
                <p className="text-sm text-brand-mid mt-1">{member.role}</p>
                <p className="text-xs text-text-muted mt-2">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
