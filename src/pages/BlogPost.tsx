import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true })
    }
  }, [post, navigate])

  if (!post) return null

  return (
    <article className="pt-32 pb-20">
      <div className="section-container max-w-4xl">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-light transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-border-dark pb-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="badge py-1 px-3">
              <Tag className="h-3 w-3 inline-block mr-1.5" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="text-sm text-text-muted ml-auto">
              {post.date}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-brand max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-16 pt-10 border-t border-border-dark">
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Share this article</h3>
            <div className="flex gap-4">
                <button className="px-4 py-2 rounded bg-surface-card border border-border-dark hover:border-brand-mid text-text-secondary transition-all">Twitter</button>
                <button className="px-4 py-2 rounded bg-surface-card border border-border-dark hover:border-brand-mid text-text-secondary transition-all">LinkedIn</button>
            </div>
        </div>
      </div>
    </article>
  )
}
