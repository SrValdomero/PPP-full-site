import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, MapPin, Calendar, CheckCircle2, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'

type FormData = {
  name: string
  email: string
  company: string
  team_size: string
  interested_in: string
  message: string
}

const interests = [
  'CoreShift (90-Day Transformation)',
  'CoreXpress (60-Day Communication)',
  'Sales DNA (Commercial Intelligence)',
  'AI Core Martha (AI Implementation)',
  'Not sure — need consultation',
]

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', company: '', team_size: '', interested_in: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          name: formData.name,
          email: formData.email,
          company: formData.company,
          team_size: formData.team_size,
          interested_in: formData.interested_in,
          message: formData.message
        }])

      if (error) throw error

      setSubmitted(true)
      setFormData({ name: '', email: '', company: '', team_size: '', interested_in: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 h-80 w-80 rounded-full bg-brand-dark/15 blur-[100px]" />
        </div>
        <div className="relative section-container !py-0 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge">Let's Talk</span>
            <h1 className="mt-6">
              Start Your{' '}
              <span className="gradient-text">Transformation</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
              Book a free 30-minute diagnostic call. We'll assess your situation
              and recommend the right path forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative">
        <div className="section-container !pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  <h2 className="text-xl font-bold text-text-primary mb-2">
                    Request a Free Assessment
                  </h2>
                  <p className="text-sm text-text-secondary mb-6">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text" id="name" name="name" required
                        value={formData.name} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-surface-darker border border-border-dark text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email" id="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-surface-darker border border-border-dark text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Company *
                      </label>
                      <input
                        type="text" id="company" name="company" required
                        value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-surface-darker border border-border-dark text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label htmlFor="team_size" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Team Size
                      </label>
                      <select
                        id="team_size" name="team_size"
                        value={formData.team_size} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-surface-darker border border-border-dark text-sm text-text-primary focus:border-accent outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select...</option>
                        <option value="1-10">1-10 people</option>
                        <option value="11-50">11-50 people</option>
                        <option value="51-200">51-200 people</option>
                        <option value="200+">200+ people</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interested_in" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      I'm Interested In
                    </label>
                    <select
                      id="interested_in" name="interested_in"
                      value={formData.interested_in} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-surface-darker border border-border-dark text-sm text-text-primary focus:border-accent outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a program...</option>
                      {interests.map((int) => (
                        <option key={int} value={int}>{int}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Tell Us About Your Challenge
                    </label>
                    <textarea
                      id="message" name="message" rows={4}
                      value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-surface-darker border border-border-dark text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition-all resize-none"
                      placeholder="What specific problem are you trying to solve?"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4">
                    <Send className="h-4 w-4" />
                    Submit Request
                  </button>
                </form>
              ) : (
                <motion.div
                  className="glass-card p-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">
                    Request Received
                  </h3>
                  <p className="text-text-secondary max-w-md mx-auto mb-6">
                    Thank you! Our team will review your request
                    and reach out within 24 hours to schedule your free assessment.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
                    <Clock className="h-4 w-4" />
                    Expected response time: 24 hours
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Quick Contact */}
              <div className="glass-card p-6">
                <h3 className="text-base font-bold text-text-primary mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+18633594147" className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors">
                    <Phone className="h-4 w-4 text-brand-mid" />
                    +1 (863) 359-4147
                  </a>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin className="h-4 w-4 text-brand-mid shrink-0" />
                    Miami, FL — LATAM & Caribbean
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="glass-card p-6">
                <h3 className="text-base font-bold text-text-primary mb-4">What to Expect</h3>
                <ol className="space-y-4">
                  {[
                    { step: '1', text: '30-minute diagnostic call to understand your situation' },
                    { step: '2', text: 'Custom recommendation with no obligation' },
                    { step: '3', text: 'Detailed proposal within 48 hours if we\'re a fit' },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-dark/30 text-xs font-bold text-brand-light">
                        {item.step}
                      </span>
                      <span className="text-sm text-text-secondary">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Schedule Directly */}
              <div className="glass-card p-6">
                <h3 className="text-base font-bold text-text-primary mb-3">Prefer to Schedule Directly?</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Skip the form — book a call at a time that works for you.
                </p>
                <a href="#" className="btn-secondary w-full justify-center text-sm">
                  <Calendar className="h-4 w-4" />
                  Book a Call
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
