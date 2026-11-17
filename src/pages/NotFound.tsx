import { Link } from 'react-router-dom'
import { useLang } from '@/i18n/LangContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="container" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <div style={{ display: 'grid', gap: 18, justifyItems: 'center' }}>
        <span className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', lineHeight: 1 }}>
          404
        </span>
        <h1 style={{ fontSize: 'var(--fs-h2)' }}>{t('nf.title')}</h1>
        <p style={{ color: 'var(--ink-2)' }}>{t('nf.body')}</p>
        <Link to="/" className="btn">
          {t('nf.cta')}
        </Link>
      </div>
    </div>
  )
}
