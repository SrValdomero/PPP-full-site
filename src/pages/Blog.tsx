import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag, Search } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'

const categories = ['All', 'Sales Strategy', 'AI Implementation', 'Leadership', 'Case Studies', 'Industry Trends']

import { blogPosts as articles } from '../data/blogPosts'

export function Blog() {
  const { ref, isInView } = useInView()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticles = filteredArticles.filter(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-brand-dark/15 blur-[100px]" />
        </div>
        <div className="relative section-container !py-0 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge">Insights & Strategy</span>
            <h1 className="mt-6">
              The PPP <span className="gradient-text">Intelligence Brief</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              Data-driven insights on sales performance, AI implementation,
              and organizational transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative">
        <div className="section-container !py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-accent text-white'
                      : 'text-text-muted hover:text-text-primary border border-border-dark hover:border-brand-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg bg-surface-card border border-border-dark text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section ref={ref} className="relative">
          <div className="section-container !pt-4 !pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article, i) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link to={`/blog/${article.slug}`} className="glass-card group block p-8 h-full cursor-pointer">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="badge text-[10px] py-1 px-2">Featured</span>
                      <span className="flex items-center gap-1.5 text-xs text-brand-mid font-medium">
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-light transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-text-muted">
                        <Clock className="h-3 w-3" />
                        {article.readTime} · {article.date}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-brand-mid group-hover:text-brand-light transition-colors">
                        Read <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="relative">
        <div className="section-container !pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={`/blog/${article.slug}`} className="glass-card group block p-6 h-full cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-brand-mid font-medium">{article.category}</span>
                    <span className="text-xs text-text-muted">·</span>
                    <span className="text-xs text-text-muted">{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-brand-light transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{article.excerpt}</p>
                  <p className="mt-4 text-xs text-text-muted">{article.date}</p>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-muted">No articles match your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
