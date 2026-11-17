import { Link } from 'react-router-dom'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Gem, Hammer, ScrollText } from 'lucide-react'
import { useRef } from 'react'
import { models } from '@/data/images'
import { useLang } from '@/i18n/LangContext'
import type { StringKey } from '@/i18n/strings'
import { isLowEnd } from '@/lib/motion'
import { Breadcrumbs, Reveal, SmartImage } from '@/components/ui'
import { TrustStrip } from '@/components/Footer'
import './pages.css'

const VALUES: { icon: typeof Gem; title: StringKey; desc: StringKey }[] = [
  { icon: Gem, title: 'about.v1', desc: 'about.v1d' },
  { icon: Hammer, title: 'about.v2', desc: 'about.v2d' },
  { icon: ScrollText, title: 'about.v3', desc: 'about.v3d' },
]

export default function About() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() || isLowEnd
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -50, reduce ? 0 : 50])

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: t('nav.about') }]} />
          <Reveal className="about-hero__copy">
            <span className="eyebrow">{t('brand.name')}</span>
            <h1>{t('about.title')}</h1>
            <p>{t('about.lead')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-story" ref={ref}>
          <div className="about-story__imgs">
            <m.div className="arch about-story__a" style={{ y }}>
              <SmartImage id={models.goldSaree} alt="" ratio={1.3} widths={[360, 540, 720]} sizes="(max-width: 900px) 60vw, 28vw" />
            </m.div>
            <Reveal className="about-story__b" delay={0.15}>
              <SmartImage id={models.templeNecklace} alt="" ratio={1} widths={[280, 420]} sizes="220px" />
            </Reveal>
          </div>
          <div className="about-story__copy">
            <Reveal>
              <p className="about-story__lead">{t('about.p1')}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{t('about.p2')}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/collections/gold" className="link-arrow">
                {t('hero.cta2')} <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <div>
              <span className="eyebrow">{t('about.values')}</span>
            </div>
          </Reveal>
          <div className="values__grid">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08} className="value">
                <span className="value__icon">
                  <Icon size={26} strokeWidth={1.2} />
                </span>
                <h3>{t(title)}</h3>
                <p>{t(desc)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <TrustStrip />
    </>
  )
}
