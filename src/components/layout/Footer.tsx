import { Link } from 'react-router-dom'
import { ArrowUpRight, Phone, MapPin, ExternalLink, Globe } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/about#team' },
    { label: 'Careers', path: '/about#careers' },
    { label: 'Contact', path: '/contact' },
  ],
  services: [
    { label: 'CoreShift', path: '/services#coreshift' },
    { label: 'CoreXpress', path: '/services#corexpress' },
    { label: 'Sales DNA', path: '/services#salesdna' },
    { label: 'AI Core Martha', path: '/services#aicore' },
  ],
  resources: [
    { label: 'Blog', path: '/blog' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Case Studies', path: '/blog?category=case-studies' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border-dark bg-surface-darker" role="contentinfo">
      <div className="section-container !py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <img src="/ppp-logo.png" alt="PPP Enterprise Logo" className="h-10 w-auto object-contain" />
              </div>
              <span className="text-sm font-semibold text-text-muted tracking-wide uppercase">
                Enterprise
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-8">
              Transforming organizations through advanced sales methodology,
              strategic communication, and AI-powered business intelligence.
              Since 2015.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+18297620670"
                className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                +1 (829) 762-0670
              </a>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <MapPin className="h-4 w-4 shrink-0" />
                Miami, FL — LATAM & Caribbean
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="group flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Services
                </h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="group flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="group flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-dark pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} PPP Professional Preparation Program.
            All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: ExternalLink, label: 'LinkedIn', href: '#' },
              { icon: Globe, label: 'Twitter', href: '#' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-dark text-text-muted transition-all hover:border-brand-mid hover:text-brand-light hover:scale-110"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
