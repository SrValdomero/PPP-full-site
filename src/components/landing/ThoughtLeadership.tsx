import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { useInView } from '../../hooks/useAnimations'

const articles = [
  {
    title: 'Why 73% of Sales Training Fails — And What to Do Instead',
    excerpt: 'Traditional training treats symptoms. Here\'s the diagnostic framework that identifies root causes and delivers lasting performance change.',
    category: 'Sales Strategy',
    readTime: '8 min read',
    date: '2024-12-15',
    slug: 'why-sales-training-fails',
  },
  {
    title: 'The AI Integration Playbook for Mid-Market Companies',
    excerpt: 'You don\'t need a CTO to start leveraging AI. This step-by-step playbook shows how teams of 50-500 can automate operations in 30 days.',
    category: 'AI Implementation',
    readTime: '12 min read',
    date: '2024-12-08',
    slug: 'ai-integration-playbook',
  },
  {
    title: 'From Order-Takers to Deal Makers: The Sales DNA Method',
    excerpt: 'The psychological foundations that separate elite performers from average sellers. And the 60-day protocol to rewire your team\'s approach.',
    category: 'Leadership',
    readTime: '6 min read',
    date: '2024-11-28',
    slug: 'order-takers-to-deal-makers',
  },
]

export function ThoughtLeadership() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section ref={ref} className="relative" id="insights">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="badge mb-4">Insights</span>
            <h2 className="mt-4">
              Latest <span className="gradient-text">Thinking</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="btn-secondary text-sm"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${article.slug}`}
                className="glass-card group block p-6 h-full cursor-pointer"
              >
                {/* Category + Read Time */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-mid">
                    <Tag className="h-3 w-3" />
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-brand-light transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-mid group-hover:text-brand-light transition-colors">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
