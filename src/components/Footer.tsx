import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, BadgeCheck, RefreshCcw, ShieldCheck, Sparkles } from 'lucide-react'
import { categories } from '@/data/categories'
import { stores } from '@/data/stores'
import { useLang } from '@/i18n/LangContext'
import type { StringKey } from '@/i18n/strings'
import { Logo, Reveal } from './ui'

const TRUST: { icon: typeof BadgeCheck; title: StringKey; desc: StringKey }[] = [
  { icon: BadgeCheck, title: 'trust.hallmark', desc: 'trust.hallmark.d' },
  { icon: RefreshCcw, title: 'trust.exchange', desc: 'trust.exchange.d' },
  { icon: ShieldCheck, title: 'trust.certified', desc: 'trust.certified.d' },
  { icon: Sparkles, title: 'trust.care', desc: 'trust.care.d' },
]

export function TrustStrip() {
  const { t } = useLang()
  return (
    <section className="trust">
      <div className="container trust__grid">
        {TRUST.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 0.06} className="trust__item">
            <span className="trust__icon">
              <Icon size={22} strokeWidth={1.3} />
            </span>
            <span>
              <strong>{t(title)}</strong>
              <small>{t(desc)}</small>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  const { t, tx } = useLang()
  const [done, setDone] = useState(false)
  const main = stores[0]

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO(backend): POST /newsletter
    setDone(true)
    e.currentTarget.reset()
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__news">
          <h3>{t('footer.newsletter')}</h3>
          {done ? (
            <p className="footer__done">{t('footer.subscribed')}</p>
          ) : (
            <form onSubmit={subscribe} className="footer__form">
              <input type="email" required placeholder={t('footer.emailPh')} aria-label={t('footer.emailPh')} />
              <button className="btn btn--gold" type="submit">
                {t('footer.subscribe')}
              </button>
            </form>
          )}
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>{t('footer.about')}</p>
            <div className="footer__social">
              {/* TODO: replace with real social profile URLs */}
              <a href="#" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <p className="footer__h">{t('footer.shop')}</p>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/collections/${c.slug}`}>{tx(c.name)}</Link>
                </li>
              ))}
              <li>
                <Link to="/collections/gold/coins">{tx(categories[0].children.find((s) => s.slug === 'coins')?.name)}</Link>
              </li>
              <li>
                <Link to="/collections/wedding-festive/bridal-sets">{tx(categories[2].children[0].name)}</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer__h">{t('footer.help')}</p>
            <ul>
              <li>
                <a href="#">{t('footer.shipping')}</a>
              </li>
              <li>
                <a href="#">{t('footer.returns')}</a>
              </li>
              <li>
                <a href="#">{t('footer.ringSize')}</a>
              </li>
              <li>
                <a href="#">{t('footer.faq')}</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer__h">{t('footer.company')}</p>
            <ul className="footer__contact">
              <li>
                <Link to="/about">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/stores">
                  <MapPin size={15} /> {tx(main.address)}, {tx(main.city)}
                </Link>
              </li>
              <li>
                <a href={`tel:${main.phone.replace(/\s/g, '')}`}>
                  <Phone size={15} /> {main.phone}
                </a>
              </li>
              <li>
                <a href="mailto:hello@example.com">
                  <Mail size={15} /> hello@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {t('brand.name')} {t('brand.suffix')}. {t('footer.rights')}
          </span>
          <span className="footer__bis">BIS 916 · HUID</span>
        </div>
      </div>
    </footer>
  )
}
