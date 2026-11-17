import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { L } from '@/data/types'
import { models } from '@/data/images'
import { productsIn } from '@/data/products'
import { priceOf } from '@/data/rates'
import { useLang } from '@/i18n/LangContext'
import { useRates } from '@/store/ShopContext'
import { inr, num } from '@/lib/format'
import { ease, isLowEnd } from '@/lib/motion'
import { SmartImage } from './ui'
import './HeroShowcase.css'

/* ---------------------------------------------------------------- slides */

interface Slide {
  key: string
  label: L
  eyebrow: L
  title: [L, L]
  sub: L
  image: string
  caption: L
  priceFrom: [string, string]
  to: string
  cta: L
}

const SLIDES: Slide[] = [
  {
    key: 'bridal',
    label: { gu: 'દુલ્હન', en: 'Bridal' },
    eyebrow: { gu: 'દુલ્હન સંગ્રહ', en: 'The Bridal Collection' },
    title: [
      { gu: 'શાહી શૃંગાર,', en: 'Royal adornment,' },
      { gu: 'તમારા ખાસ દિવસ માટે', en: 'for your special day' },
    ],
    sub: {
      gu: 'પોલકી, કુંદન અને પન્નાથી સજેલા દુલ્હન સેટ — પેઢીઓ સુધી સાચવવા માટે ઘડાયેલા.',
      en: 'Bridal sets in polki, kundan and emerald — crafted to be treasured for generations.',
    },
    image: models.emeraldBride,
    caption: { gu: 'કુંદન ચોકર', en: 'Kundan Choker' },
    priceFrom: ['wedding-festive', 'bridal-sets'],
    to: '/collections/wedding-festive/bridal-sets',
    cta: { gu: 'દુલ્હન સેટ જુઓ', en: 'View bridal sets' },
  },
  {
    key: 'heritage',
    label: { gu: 'વારસો', en: 'Heritage' },
    eyebrow: { gu: 'BIS હોલમાર્ક • ૨૨ કેરેટ', en: 'BIS Hallmarked • 22K Gold' },
    title: [
      { gu: 'પરંપરાની ચમક,', en: 'Heritage that shines,' },
      { gu: 'દરેક પેઢી માટે', en: 'for every generation' },
    ],
    sub: {
      gu: 'નકશીદાર હાર, ચોકર અને રાણી હાર — હાથથી ઘડાયેલું શુદ્ધ સોનું.',
      en: 'Sculpted necklaces, chokers and haars — handcrafted in pure gold.',
    },
    image: models.haarBride,
    caption: { gu: 'મંદિર આભૂષણ', en: 'Temple Jewellery' },
    priceFrom: ['gold', 'necklaces'],
    to: '/collections/gold/necklaces',
    cta: { gu: 'સોનાના હાર જુઓ', en: 'Shop gold necklaces' },
  },
  {
    key: 'festive',
    label: { gu: 'તહેવાર', en: 'Festive' },
    eyebrow: { gu: 'તહેવારોની ઉજવણી', en: 'The Festive Edit' },
    title: [
      { gu: 'દરેક તહેવાર,', en: 'Every festival,' },
      { gu: 'એક નવી ચમક', en: 'a new radiance' },
    ],
    sub: {
      gu: 'દિવાળી, નવરાત્રી અને ધનતેરસ માટે ખાસ પસંદ કરેલા સોના-ચાંદીના આભૂષણો.',
      en: 'Handpicked gold and silver for Diwali, Navratri and Dhanteras.',
    },
    image: models.veilBride,
    caption: { gu: 'તહેવારના ઝુમખાં', en: 'Festive Jhumkas' },
    priceFrom: ['wedding-festive', 'diwali'],
    to: '/collections/wedding-festive/diwali',
    cta: { gu: 'તહેવાર સંગ્રહ જુઓ', en: 'Shop the festive edit' },
  },
]

const INTERVAL = 6000

export function HeroShowcase() {
  const { tx, t, lang } = useLang()
  const rates = useRates()
  const reduce = useReducedMotion() || isLowEnd
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = SLIDES[index]
  const ref = useRef<HTMLElement>(null)

  // ---- scroll-linked motion: copy lifts away, panels drift at different speeds, photos zoom
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Full-strength on desktop, gentler on phones, none for reduced motion.
  const k = reduce ? 0 : typeof window !== 'undefined' && window.innerWidth < 900 ? 0.35 : 1
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120 * k])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0])
  const panelY = [
    useTransform(scrollYProgress, [0, 1], [0, 30 * k]),
    useTransform(scrollYProgress, [0, 1], [0, 110 * k]),
    useTransform(scrollYProgress, [0, 1], [0, 190 * k]),
  ]
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.18 * k])

  // ---- cursor parallax on the photos
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 })
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -26)
    my.set(((e.clientY - r.top) / r.height - 0.5) * -18)
  }
  const onLeavePanels = () => {
    mx.set(0)
    my.set(0)
  }

  const go = useCallback((i: number) => setIndex((i + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused || reduce) return
    const id = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(id)
  }, [index, paused, reduce, go])

  const prices = useMemo(
    () =>
      SLIDES.map((s) => {
        const list = productsIn(s.priceFrom[0], s.priceFrom[1])
        return list.length ? Math.min(...list.map((p) => priceOf(p, rates).total)) : 0
      }),
    [rates],
  )

  const pad = (n: number) => num(n, lang).padStart(2, lang === 'gu' ? '૦' : '0')
  const textT = { duration: reduce ? 0.01 : 0.6, ease: ease.smooth }

  return (
    <section ref={ref} className="hx" onMouseLeave={() => setPaused(false)} aria-roledescription="carousel">
      <div className="hx__inner">
        {/* ------------------------------------------------ copy */}
        <m.div className="hx__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={slide.key} exit={{ opacity: 0, y: -8, transition: { duration: reduce ? 0.01 : 0.22 } }}>
              <m.p className="hx__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={textT}>
                {tx(slide.eyebrow)}
              </m.p>
              <h1 className="hx__title">
                {slide.title.map((line, i) => (
                  <span key={i} className={`hx__mask ${i === 1 ? 'hx__mask--accent' : ''}`} data-shimmer={i === 1 && !reduce ? 'on' : undefined}>
                    <m.span
                      className="hx__line"
                      initial={{ y: reduce ? 0 : '108%' }}
                      animate={{ y: 0 }}
                      transition={{ ...textT, duration: reduce ? 0.01 : 0.9, delay: 0.05 + i * 0.1 }}
                    >
                      {tx(line)}
                    </m.span>
                  </span>
                ))}
              </h1>
              <m.p
                className="hx__sub"
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...textT, delay: 0.3 }}
              >
                {tx(slide.sub)}
              </m.p>
              <m.div
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...textT, delay: 0.4 }}
                className="hx__ctas"
              >
                <Link to={slide.to} className="btn">
                  {tx(slide.cta)} <ArrowRight size={16} />
                </Link>
              </m.div>
            </m.div>
          </AnimatePresence>

          <div className="hx__foot">
            <div className="hx__count" aria-hidden="true">
              <span className="hx__count-now">{pad(index + 1)}</span>
              <span className="hx__count-bar">
                <span
                  key={index}
                  className="hx__count-fill"
                  style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused || reduce ? 'paused' : 'running' }}
                />
              </span>
              <span>{pad(SLIDES.length)}</span>
            </div>
            <Link to="/collections/gold" className="hx__rate">
              <span className="hx__rate-dot" />
              {t('rates.gold22')} <strong>{inr(rates.gold22, lang)}</strong>
              <small>{t('rates.perGram')}</small>
            </Link>
          </div>
        </m.div>

        {/* ------------------------------------------------ expanding panels */}
        <div className="hx__panels" role="tablist" aria-label="Collections" onMouseMove={onMove} onMouseLeave={onLeavePanels}>
          {SLIDES.map((s, i) => {
            const active = i === index
            return (
              <m.div
                key={s.key}
                className={`hx__panel ${active ? 'is-active' : ''}`}
                style={{ y: panelY[i] }}
                initial={{ clipPath: reduce ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: reduce ? 0 : 1.15, ease: ease.smooth, delay: 0.15 + i * 0.14 }}
              >
              <Link
                to={s.to}
                role="tab"
                aria-selected={active}
                aria-label={`${tx(s.label)} — ${tx(s.caption)}`}
                className="hx__panel-link"
                onMouseEnter={() => {
                  setPaused(true)
                  go(i)
                }}
                onFocus={() => {
                  setPaused(true)
                  go(i)
                }}
              >
                <m.span className="hx__panel-media" style={{ scale: photoScale, x: sx, y: sy }}>
                  <SmartImage
                    id={s.image}
                    alt={tx(s.caption)}
                    priority={i === 0}
                    ratio={1.35}
                    widths={[480, 720, 960, 1200]}
                    sizes="(max-width: 900px) 70vw, 40vw"
                    className="hx__panel-img"
                  />
                </m.span>
                <span className="hx__panel-shade" aria-hidden="true" />

                <span className="hx__panel-tag" aria-hidden="true">
                  <span className="hx__panel-num">{pad(i + 1)}</span>
                  <span className="hx__panel-label">{tx(s.label)}</span>
                </span>

                <span className="hx__panel-info" aria-hidden={!active}>
                  <span>
                    <span className="hx__panel-cap">{tx(s.caption)}</span>
                    {prices[i] > 0 && (
                      <span className="hx__panel-price">
                        {lang === 'gu' ? 'શરૂઆત' : 'from'} {inr(prices[i], lang)}
                      </span>
                    )}
                  </span>
                  <span className="hx__panel-go">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </Link>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
