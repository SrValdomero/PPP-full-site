import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import { useInView } from '../../hooks/useAnimations'
import { supabase } from '../../lib/supabase'

export function NewsletterCTA() {
  const { ref, isInView } = useInView({ threshold: 0.3 })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ email, source: 'newsletter' }])
        
      if (error) throw error
      
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setEmail('')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to subscribe. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      id="newsletter"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-surface-darker to-surface-dark" />
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      <motion.div
        className="relative section-container text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2>
          Stay Ahead of the{' '}
          <span className="gradient-text">Competition</span>
        </h2>
        <p className="mt-4 text-text-secondary max-w-xl mx-auto">
          Weekly insights on sales strategy, AI implementation, and organizational
          transformation. Join 2,000+ business leaders who read us every Monday.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email address for newsletter"
            className="w-full sm:flex-1 px-5 py-3.5 rounded-xl bg-surface-card border border-border-dark text-text-primary placeholder:text-text-muted text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
          />
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto whitespace-nowrap"
          >
            {submitted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Subscribed!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Subscribe
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-xs text-text-muted">
          No spam, unsubscribe anytime. We respect your inbox.
        </p>
      </motion.div>
    </section>
  )
}
