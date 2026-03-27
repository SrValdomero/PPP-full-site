import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { useInView } from '../../hooks/useAnimations'

const questions = [
  {
    id: 'closing',
    question: "How would you rate your team's closing rate?",
    options: [
      { label: 'Below industry average', score: 1, icon: XCircle },
      { label: 'At industry average', score: 2, icon: AlertCircle },
      { label: 'Above average and growing', score: 3, icon: CheckCircle2 },
    ],
  },
  {
    id: 'development',
    question: 'Does your team receive structured professional development?',
    options: [
      { label: 'No formal program', score: 1, icon: XCircle },
      { label: 'Basic training only', score: 2, icon: AlertCircle },
      { label: 'Comprehensive & ongoing', score: 3, icon: CheckCircle2 },
    ],
  },
  {
    id: 'ai',
    question: 'Has your company integrated AI into daily operations?',
    options: [
      { label: 'Not at all', score: 1, icon: XCircle },
      { label: 'Exploring options', score: 2, icon: AlertCircle },
      { label: 'Actively using AI tools', score: 3, icon: CheckCircle2 },
    ],
  },
]

type Answers = Record<string, number>

function getResult(total: number) {
  if (total <= 4) return {
    title: 'Critical Gap Detected',
    description: 'Your organization has significant untapped potential. A structured transformation program like CoreShift could deliver a 2–3x improvement in team performance within 90 days.',
    severity: 'critical' as const,
    recommended: 'CoreShift (90-day Transformation)',
  }
  if (total <= 6) return {
    title: 'Growth Opportunity Identified',
    description: "Your team has a foundation but lacks the edge to dominate. CoreXpress or Sales DNA can sharpen your team's competitive advantage in 60 days.",
    severity: 'warning' as const,
    recommended: 'CoreXpress + Sales DNA',
  }
  return {
    title: 'Ready to Scale',
    description: "Your organization is well-positioned. AI Core Martha can amplify your existing strengths with intelligent automation and predictive insights.",
    severity: 'good' as const,
    recommended: 'AI Core Martha',
  }
}

export function BusinessHealthPulse() {
  const { ref, isInView } = useInView({ threshold: 0.3 })
  const [answers, setAnswers] = useState<Answers>({})
  const [showResult, setShowResult] = useState(false)

  const totalAnswered = Object.keys(answers).length
  const isComplete = totalAnswered === questions.length
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }))
  }

  const handleSubmit = () => {
    if (isComplete) setShowResult(true)
  }

  const result = getResult(totalScore)

  return (
    <section ref={ref} className="relative" id="diagnostic">
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="badge mb-4">Free Diagnostic</span>
            <h2 className="mt-4">
              Business Health{' '}
              <span className="gradient-text-accent">Pulse</span>
            </h2>
            <p className="mt-4 text-text-secondary max-w-lg mx-auto">
              Answer 3 questions. Get an instant assessment of your organization's
              competitive readiness.
            </p>
          </div>

          {!showResult ? (
            <div className="space-y-8">
              {questions.map((q, qi) => (
                <motion.div
                  key={q.id}
                  className="glass-card p-6 sm:p-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: qi * 0.15 }}
                >
                  <p className="text-base font-semibold text-text-primary mb-5">
                    <span className="text-brand-mid font-mono mr-2">{qi + 1}.</span>
                    {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map((option) => {
                      const isSelected = answers[q.id] === option.score
                      return (
                        <button
                          key={option.label}
                          onClick={() => handleAnswer(q.id, option.score)}
                          className={`flex items-center gap-3 p-4 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                            isSelected
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border-dark text-text-secondary hover:border-brand-dark hover:bg-surface-card'
                          }`}
                        >
                          <option.icon className={`h-4 w-4 shrink-0 ${
                            isSelected ? 'text-accent' : 'text-text-muted'
                          }`} />
                          <span className="font-medium">{option.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={isComplete ? { opacity: 1 } : { opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={handleSubmit}
                  disabled={!isComplete}
                  className="btn-primary text-base px-10 py-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  Get My Result
                  <ArrowRight className="h-5 w-5" />
                </button>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className={`glass-card p-8 sm:p-10 text-center border-2 ${
                result.severity === 'critical'
                  ? 'border-error/30'
                  : result.severity === 'warning'
                  ? 'border-warning/30'
                  : 'border-success/30'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6 ${
                result.severity === 'critical'
                  ? 'bg-error/10'
                  : result.severity === 'warning'
                  ? 'bg-warning/10'
                  : 'bg-success/10'
              }`}>
                {result.severity === 'critical' ? (
                  <XCircle className="h-8 w-8 text-error" />
                ) : result.severity === 'warning' ? (
                  <AlertCircle className="h-8 w-8 text-warning" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-success" />
                )}
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-3">
                {result.title}
              </h3>
              <p className="text-text-secondary leading-relaxed max-w-lg mx-auto mb-6">
                {result.description}
              </p>

              <div className="inline-block px-5 py-2.5 rounded-lg bg-surface-card border border-border-dark mb-8">
                <p className="text-xs text-text-muted mb-1">Recommended Program</p>
                <p className="text-sm font-semibold text-brand-light">{result.recommended}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="/contact" className="btn-primary">
                  Schedule Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() => { setShowResult(false); setAnswers({}) }}
                  className="btn-secondary text-sm"
                >
                  Retake Assessment
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
