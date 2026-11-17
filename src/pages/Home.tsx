import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { categories, getSub } from '@/data/categories'
import { models } from '@/data/images'
import { products, productsIn } from '@/data/products'
import { useLang } from '@/i18n/LangContext'
import { num } from '@/lib/format'
import { ease, isLowEnd, riseItem, stagger } from '@/lib/motion'
import { Reveal, SectionHeading, SmartImage } from '@/components/ui'
import { ProductGrid } from '@/components/ProductCard'
import { TrustStrip } from '@/components/Footer'
import { HeroShowcase } from '@/components/HeroShowcase'
import './Home.css'

/* ---------------------------------------------------------------- Manifesto band (scroll-linked, text only) */

const BAND_WORDS: { gu: string; en: string }[] = [
  { gu: 'હોલમાર્ક', en: 'Hallmarked' },
  { gu: 'કુંદન', en: 'Kundan' },
  { gu: 'હસ્તકલા', en: 'Handcrafted' },
  { gu: 'પોલકી', en: 'Polki' },
  { gu: 'વારસો', en: 'Heritage' },
  { gu: 'નકશી', en: 'Nakshi' },
  { gu: 'શુદ્ધતા', en: 'Purity' },
  { gu: 'મીનાકારી', en: 'Meenakari' },
]

function ScrollBand() {
  const { tx } = useLang()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() || isLowEnd
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ['-10%', '-10%'] : ['0%', '-30%'])
  return (
    <section className="band" ref={ref} aria-hidden="true">
      <m.div className="band__row" style={{ x }}>
        {[0, 1, 2].flatMap((rep) =>
          BAND_WORDS.map((w, i) => (
            <span key={`${rep}-${i}`} className="band__item">
              <span className={i % 2 ? 'band__word band__word--soft' : 'band__word'}>{tx(w)}</span>
              <svg className="band__mark" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" />
              </svg>
            </span>
          )),
        )}
      </m.div>
    </section>
  )
}

/* ---------------------------------------------------------------- Collections (arches) */

function Collections() {
  const { t, tx, lang } = useLang()
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={t('home.cat.eyebrow')} title={t('home.cat.title')} align="center" />
        <m.div
          className="collections"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        >
          {categories.map((c) => (
            <m.div key={c.slug} variants={riseItem}>
              <Link to={`/collections/${c.slug}`} className={`collection collection--${c.tone}`}>
                <span className="collection__media arch">
                  <SmartImage id={c.hero} alt={tx(c.name)} ratio={1.35} widths={[360, 540, 720]} sizes="(max-width: 760px) 90vw, 30vw" />
                </span>
                <span className="collection__body">
                  <strong>{tx(c.name)}</strong>
                  <span>{tx(c.tagline)}</span>
                  <span className="collection__meta">
                    {num(productsIn(c.slug).length, lang)}+ {t('common.designs')} · {num(c.children.length, lang)}{' '}
                    {lang === 'gu' ? 'શ્રેણી' : 'categories'}
                    <ArrowRight size={16} />
                  </span>
                </span>
              </Link>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Popular sub-categories */

const POPULAR_SUBS = [
  'necklaces', 'earrings', 'bangles', 'rings', 'mangalsutra', 'silver-payal',
  'chains', 'bridal-sets', 'silver-pooja', 'coins', 'nosepins', 'silver-toe-rings',
]

function PopularCategories() {
  const { t, tx } = useLang()
  return (
    <section className="section section--tight popular">
      <div className="container">
        <SectionHeading eyebrow={t('home.popular.eyebrow')} title={t('home.popular.title')} />
      </div>
      <div className="container">
        <m.ul
          className="popular__list h-scroll"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {POPULAR_SUBS.map((slug) => {
            const found = getSub(slug)
            if (!found) return null
            return (
              <m.li key={slug} variants={riseItem}>
                <Link to={`/collections/${found.category.slug}/${slug}`} className="popular__item">
                  <span className="popular__img">
                    <SmartImage id={found.sub.image} alt="" ratio={1} widths={[160, 240, 320]} sizes="140px" />
                  </span>
                  <span className="popular__name">{tx(found.sub.name)}</span>
                </Link>
              </m.li>
            )
          })}
        </m.ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Bridal (light editorial) */

function Bridal() {
  const { t, tx, lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() || isLowEnd
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -30, reduce ? 0 : 30])
  const rituals = ['bridal-sets', 'mehndi-haldi', 'groom', 'akshaya-tritiya'].map((s) => getSub(s)!)

  return (
    <section className="bridal" ref={ref}>
      <div className="container bridal__grid">
        <Reveal className="bridal__art">
          <m.div className="bridal__media" style={{ y }}>
            <SmartImage id={models.redLehenga} alt={t('home.bridal.eyebrow')} ratio={1.25} widths={[420, 640, 860, 1100]} sizes="(max-width: 900px) 92vw, 46vw" />
          </m.div>
        </Reveal>
        <div className="bridal__copy">
          <Reveal>
            <span className="eyebrow">{t('home.bridal.eyebrow')}</span>
            <h2>{t('home.bridal.title')}</h2>
            <p>{t('home.bridal.body')}</p>
          </Reveal>
          <m.ul className="rituals" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {rituals.map(({ category, sub }, i) => (
              <m.li key={sub.slug} variants={riseItem}>
                <Link to={`/collections/${category.slug}/${sub.slug}`} className="ritual">
                  <span className="ritual__num">{num(i + 1, lang).padStart(2, lang === 'gu' ? '૦' : '0')}</span>
                  <span className="ritual__img">
                    <SmartImage id={sub.image} alt="" ratio={1} widths={[120, 180]} sizes="56px" />
                  </span>
                  <span className="ritual__text">
                    <strong>{tx(sub.name)}</strong>
                    <small>
                      {num(productsIn(category.slug, sub.slug).length, lang)} {t('common.designs')}
                    </small>
                  </span>
                  <ArrowRight size={18} className="ritual__go" />
                </Link>
              </m.li>
            ))}
          </m.ul>
          <Reveal delay={0.1}>
            <Link to="/collections/wedding-festive" className="btn">
              {t('home.bridal.cta')} <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Festive carousel */

const FESTIVALS = ['diwali', 'navratri', 'dhanteras', 'akshaya-tritiya', 'karva-chauth', 'raksha-bandhan']

function Festive() {
  const { t, tx } = useLang()
  const track = useRef<HTMLUListElement>(null)
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  return (
    <section className="section festive">
      <div className="container">
        <SectionHeading
          eyebrow={t('home.festive.eyebrow')}
          title={t('home.festive.title')}
          action={
            <div className="carousel-nav">
              <button className="round-btn" onClick={() => scrollBy(-1)} aria-label={t('common.prev')}>
                <ChevronLeft size={20} />
              </button>
              <button className="round-btn" onClick={() => scrollBy(1)} aria-label={t('common.next')}>
                <ChevronRight size={20} />
              </button>
            </div>
          }
        />
      </div>
      <div className="container container--bleed-right">
        <m.ul ref={track} className="festive__track h-scroll" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {FESTIVALS.map((slug) => {
            const f = getSub(slug)!
            return (
              <m.li key={slug} variants={riseItem}>
                <Link to={`/collections/wedding-festive/${slug}`} className="fest-card">
                  <SmartImage id={f.sub.image} alt={tx(f.sub.name)} ratio={1.45} widths={[300, 450, 600]} sizes="(max-width: 640px) 70vw, 300px" />
                  <span className="fest-card__body">
                    {f.sub.note && <span className="fest-card__note">{tx(f.sub.note)}</span>}
                    <strong>{tx(f.sub.name)}</strong>
                    <span className="fest-card__cta">
                      {t('common.explore')} <ArrowRight size={14} />
                    </span>
                  </span>
                </Link>
              </m.li>
            )
          })}
        </m.ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Bestsellers (tabbed) */

function Bestsellers() {
  const { t, tx } = useLang()
  const [tab, setTab] = useState(categories[0].slug)
  const items = useMemo(() => {
    const inCat = products.filter((p) => p.category === tab)
    const best = inCat.filter((p) => p.badge === 'bestseller')
    const rest = inCat.filter((p) => p.badge !== 'bestseller').sort((a, b) => b.rating - a.rating)
    return [...best, ...rest].slice(0, 8)
  }, [tab])

  return (
    <section className="section bestsellers">
      <div className="container">
        <SectionHeading eyebrow={t('home.best.eyebrow')} title={t('home.best.title')} align="center" />
        <div className="tabs" role="tablist">
          {categories.map((c) => (
            <button key={c.slug} role="tab" aria-selected={tab === c.slug} className="tab" onClick={() => setTab(c.slug)}>
              {tab === c.slug && (
                <m.span layoutId="best-tab" className="tab__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
              )}
              <span className="tab__label">{tx(c.name)}</span>
            </button>
          ))}
        </div>
        <m.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: ease.smooth }}>
          <ProductGrid items={items} />
        </m.div>
        <div className="center-cta">
          <Link to={`/collections/${tab}`} className="link-arrow">
            {t('common.viewAll')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Heritage */

function Heritage() {
  const { t, lang } = useLang()
  // PLACEHOLDER stats — replace with the real numbers.
  const stats = [
    { v: 35, suffix: '+', label: t('stat.years') },
    { v: 50000, suffix: '+', label: t('stat.families') },
    { v: products.length, suffix: '+', label: t('stat.designs') },
  ]
  return (
    <section className="section heritage">
      <div className="container heritage__grid">
        <Reveal className="heritage__img arch-outline">
          <div className="arch">
            <SmartImage id={models.silkSaree} alt="" ratio={1.25} widths={[420, 640, 860]} sizes="(max-width: 900px) 85vw, 40vw" />
          </div>
        </Reveal>
        <div className="heritage__copy">
          <Reveal>
            <span className="eyebrow">{t('home.heritage.eyebrow')}</span>
            <h2>{t('home.heritage.title')}</h2>
            <p>{t('home.heritage.body')}</p>
          </Reveal>
          <Reveal delay={0.1} className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <strong>
                  {num(s.v, lang)}
                  {s.suffix}
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/about" className="link-arrow">
              {t('home.heritage.cta')} <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Visit CTA */

function VisitCta() {
  const { t } = useLang()
  return (
    <section className="visit">
      <SmartImage id={models.diya} alt="" widths={[640, 1024, 1600]} sizes="100vw" className="visit__bg" />
      <div className="container visit__inner">
        <Reveal>
          <span className="eyebrow">{t('visit.eyebrow')}</span>
          <h2>{t('visit.title')}</h2>
          <p>{t('visit.body')}</p>
          <Link to="/stores" className="btn btn--light">
            {t('visit.cta')} <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroShowcase />
      <TrustStrip />
      <Collections />
      <PopularCategories />
      <Bestsellers />
      <Bridal />
      <Festive />
      <ScrollBand />
      <Heritage />
      <VisitCta />
    </>
  )
}
