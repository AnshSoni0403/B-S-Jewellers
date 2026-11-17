import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { m, useReducedMotion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { img, srcSet } from '@/data/images'
import { useLang } from '@/i18n/LangContext'
import { dur, ease, isLowEnd } from '@/lib/motion'
import { inr } from '@/lib/format'

/* ---------------------------------------------------------------- SmartImage */

interface SmartImageProps {
  id: string
  alt: string
  /** CSS `sizes` attribute — tells the browser which width to download. */
  sizes?: string
  widths?: number[]
  /** height / width — produces a matching crop from the CDN. */
  ratio?: number
  priority?: boolean
  className?: string
}

/** Lazy, responsive, fade-in image with a graceful fallback if the URL fails. */
export function SmartImage({
  id,
  alt,
  sizes = '(max-width: 640px) 50vw, 25vw',
  widths = [320, 480, 720, 960],
  ratio,
  priority,
  className = '',
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  if (failed) return <span className={`smart-img smart-img--fallback ${className}`} role="img" aria-label={alt} />
  return (
    <img
      className={`smart-img ${loaded ? 'is-loaded' : ''} ${className}`}
      src={img(id, widths[Math.min(1, widths.length - 1)], ratio ? Math.round(widths[1] * ratio) : undefined)}
      srcSet={srcSet(id, widths, ratio)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-expect-error — fetchpriority is valid HTML, React 18 types lag behind
      fetchpriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  )
}

/* ---------------------------------------------------------------- Reveal */

/** Fades + rises content into view once, on scroll. Respects reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const reduce = useReducedMotion()
  const Comp = m[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce || isLowEnd ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.15 : dur.slow, ease: ease.smooth, delay }}
    >
      {children}
    </Comp>
  )
}

/* ---------------------------------------------------------------- SectionHeading */

export function SectionHeading({
  eyebrow,
  title,
  action,
  align = 'left',
  light,
}: {
  eyebrow?: string
  title: string
  action?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
}) {
  return (
    <Reveal className={`section-head section-head--${align} ${light ? 'section-head--light' : ''}`}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </Reveal>
  )
}

/* ---------------------------------------------------------------- Logo */

export function Logo({ compact }: { compact?: boolean }) {
  const { t } = useLang()
  return (
    <Link to="/" className={`logo ${compact ? 'logo--compact' : ''}`} aria-label={`${t('brand.name')} ${t('brand.suffix')}`}>
      <svg className="logo__mark" viewBox="0 0 40 48" aria-hidden="true">
        <path d="M4 46V20a16 16 0 0 1 32 0v26" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 46V21a11 11 0 0 1 22 0v25" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <text x="20" y="38" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="17" fill="currentColor">
          B
        </text>
      </svg>
      <span className="logo__text">
        <span className="logo__name">{t('brand.name')}</span>
        <span className="logo__suffix">{t('brand.suffix')}</span>
      </span>
    </Link>
  )
}

/* ---------------------------------------------------------------- LangToggle */

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label={t('lang.label')} data-active={lang}>
      <span className="lang-toggle__thumb" aria-hidden="true" />
      <button type="button" lang="gu" aria-pressed={lang === 'gu'} onClick={() => setLang('gu')}>
        ગુજ
      </button>
      <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
        EN
      </button>
    </div>
  )
}

/* ---------------------------------------------------------------- Breadcrumbs */

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const { t } = useLang()
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">{t('common.home')}</Link>
        </li>
        {items.map((it, i) => (
          <li key={i}>
            <ChevronRight size={12} aria-hidden="true" />
            {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ---------------------------------------------------------------- Price */

export function Price({ value, className = '' }: { value: number; className?: string }) {
  const { lang } = useLang()
  return <span className={`price ${className}`}>{inr(value, lang)}</span>
}

/* ---------------------------------------------------------------- ScrollToTop on route change */

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

/* ---------------------------------------------------------------- Loader (Suspense fallback) */

export function PageLoader() {
  return (
    <div className="page-loader" aria-busy="true" aria-live="polite">
      <span className="page-loader__arch" />
    </div>
  )
}
