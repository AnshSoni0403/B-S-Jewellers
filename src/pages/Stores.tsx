import { useState } from 'react'
import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { stores } from '@/data/stores'
import { useLang } from '@/i18n/LangContext'
import { Breadcrumbs, Reveal, SmartImage } from '@/components/ui'
import './pages.css'

export default function Stores() {
  const { t, tx } = useLang()
  const [active, setActive] = useState(stores[0].id)
  const current = stores.find((s) => s.id === active) ?? stores[0]

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('nav.stores') }]} />
      <Reveal className="stores-head">
        <h1 className="page__title">{t('stores.title')}</h1>
        <p>{t('stores.sub')}</p>
      </Reveal>

      <div className="stores">
        <ul className="stores__list">
          {stores.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.08}>
              <article
                className={`store ${active === s.id ? 'is-active' : ''}`}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(s.id)}
                tabIndex={0}
                aria-pressed={active === s.id}
                role="button"
              >
                <span className="store__img arch">
                  <SmartImage id={s.image} alt="" ratio={1.25} widths={[160, 240]} sizes="110px" />
                </span>
                <div className="store__body">
                  <h2>{tx(s.name)}</h2>
                  <p>
                    <MapPin size={15} /> {tx(s.address)}, {tx(s.city)}
                  </p>
                  <p>
                    <Clock size={15} /> {tx(s.hours)}
                  </p>
                  <div className="store__actions">
                    <a className="btn btn--ghost" href={`tel:${s.phone.replace(/\s/g, '')}`} onClick={(e) => e.stopPropagation()}>
                      <Phone size={15} /> {t('stores.call')}
                    </a>
                    <a
                      className="btn"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Navigation size={15} /> {t('stores.directions')}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <div className="stores__map">
          <iframe
            key={current.id}
            title={tx(current.name)}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(current.mapQuery)}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
