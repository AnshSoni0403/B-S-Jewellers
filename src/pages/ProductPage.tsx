import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { BadgeCheck, ChevronDown, Heart, MapPin, RefreshCcw, ShieldCheck, ShoppingBag, Star } from 'lucide-react'
import { getCategory, occasions } from '@/data/categories'
import { getProductBySlug, related } from '@/data/products'
import { priceOf, ratePerGram } from '@/data/rates'
import { useLang } from '@/i18n/LangContext'
import { useRates, useShop } from '@/store/ShopContext'
import { digits, grams, inr, num } from '@/lib/format'
import { ease } from '@/lib/motion'
import { Breadcrumbs, Price, Reveal, SectionHeading, SmartImage } from '@/components/ui'
import { ProductGrid } from '@/components/ProductCard'
import './pages.css'

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  useEffect(() => setActive(0), [images])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <div className="gallery">
      <div className="gallery__thumbs" role="tablist">
        {images.map((id, i) => (
          <button
            key={id}
            role="tab"
            aria-selected={i === active}
            className={`gallery__thumb ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <SmartImage id={id} alt="" ratio={1} widths={[96, 160]} sizes="80px" />
          </button>
        ))}
      </div>
      <div className="gallery__main" onMouseMove={onMove} onMouseLeave={() => setZoom(null)}>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={images[active]}
            className="gallery__frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            data-zoom={zoom ? 'on' : 'off'}
          >
            <SmartImage id={images[active]} alt={alt} ratio={1.1} widths={[480, 720, 960, 1200]} sizes="(max-width: 900px) 100vw, 50vw" priority />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Accordion({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="acc">
      <button className="acc__head" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {title}
        <ChevronDown size={18} className={open ? 'rot' : ''} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            className="acc__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.smooth }}
          >
            <div className="acc__inner">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductPage() {
  const { slug = '' } = useParams()
  const { t, tx, lang } = useLang()
  const rates = useRates()
  const { addToCart, toggleWish, isWished } = useShop()
  const p = getProductBySlug(slug)
  const [size, setSize] = useState<string | undefined>()
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setSize(undefined)
    setAdded(false)
    setSizeError(false)
  }, [slug])

  if (!p) {
    return (
      <div className="container empty empty--page">
        <h1>{t('product.notFound')}</h1>
        <Link to="/" className="btn">
          {t('nf.cta')}
        </Link>
      </div>
    )
  }

  const cat = getCategory(p.category)!
  const sub = cat.children.find((s) => s.slug === p.sub)!
  const price = priceOf(p, rates)
  const wished = isWished(p.id)
  const name = tx(p.name)

  const add = () => {
    if (p.sizes && !size) {
      setSizeError(true)
      return
    }
    addToCart(p.id, size)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  const rows: [string, string][] = [
    [t('product.code'), p.id.toUpperCase()],
    [t('product.metal'), t(`metal.${p.metal}`)],
    [t('product.purity'), digits(p.purity, lang)],
    [t('product.weight'), grams(p.weightG, lang)],
    [t('product.occasion'), p.occasions.map((o) => tx(occasions.find((x) => x.slug === o)?.name)).join(', ')],
  ]

  return (
    <>
      <div className="container pdp">
        <Breadcrumbs
          items={[
            { label: tx(cat.name), to: `/collections/${cat.slug}` },
            { label: tx(sub.name), to: `/collections/${cat.slug}/${sub.slug}` },
            { label: name },
          ]}
        />
        <div className="pdp__grid">
          <Gallery images={p.images} alt={name} />

          <div className="pdp__info">
            <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease.smooth }}>
              <div className="pdp__tags">
                <span className={`pcard__purity pcard__purity--${p.metal}`}>{digits(p.purity, lang)}</span>
                {p.badge && <span className="pdp__badge">{t(`badge.${p.badge}`)}</span>}
                <span className="pdp__rating">
                  <Star size={14} fill="currentColor" strokeWidth={0} /> {num(p.rating, lang, 1)} · {num(p.reviews, lang)} {t('product.reviews')}
                </span>
              </div>
              <h1 className="pdp__name">{name}</h1>
              <p className="pdp__sub">
                {tx(sub.name)} · {grams(p.weightG, lang)}
              </p>

              <div className="pdp__price">
                <Price value={price.total} />
                <small>{t('product.inclTax')}</small>
              </div>

              {p.sizes && (
                <div className="pdp__sizes">
                  <div className="pdp__sizes-head">
                    <span>{t('product.size')}</span>
                    <a href="#" className="text-btn">
                      {t('product.sizeGuide')}
                    </a>
                  </div>
                  <div className="pill-row">
                    {p.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`size-pill ${size === s ? 'is-active' : ''}`}
                        aria-pressed={size === s}
                        onClick={() => {
                          setSize(s)
                          setSizeError(false)
                        }}
                      >
                        {digits(s, lang)}
                      </button>
                    ))}
                  </div>
                  {sizeError && <p className="field-error">{t('product.sizeRequired')}</p>}
                </div>
              )}

              <div className="pdp__actions">
                <button className={`btn btn--block pdp__add ${added ? 'is-added' : ''}`} onClick={add}>
                  <ShoppingBag size={18} />
                  <AnimatePresence mode="wait" initial={false}>
                    <m.span key={added ? 'a' : 'b'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                      {added ? t('product.added') : t('product.addToCart')}
                    </m.span>
                  </AnimatePresence>
                </button>
                <button
                  className={`btn btn--ghost pdp__wish ${wished ? 'is-active' : ''}`}
                  onClick={() => toggleWish(p.id)}
                  aria-pressed={wished}
                  aria-label={wished ? t('product.wishlisted') : t('product.wishlist')}
                >
                  <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
                </button>
              </div>
              <Link to="/stores" className="pdp__store">
                <MapPin size={16} /> {t('product.tryStore')}
              </Link>

              <ul className="pdp__assure">
                <li>
                  <BadgeCheck size={18} strokeWidth={1.4} /> {t('trust.hallmark')}
                </li>
                <li>
                  <RefreshCcw size={18} strokeWidth={1.4} /> {t('trust.exchange')}
                </li>
                <li>
                  <ShieldCheck size={18} strokeWidth={1.4} /> {t('trust.certified')}
                </li>
              </ul>

              <Accordion title={t('product.priceBreakup')} defaultOpen>
                <table className="breakup">
                  <tbody>
                    <tr>
                      <td>
                        {t('product.metalValue')}
                        <small>
                          {grams(p.weightG, lang)} × {inr(ratePerGram(p, rates), lang)}
                        </small>
                      </td>
                      <td>{inr(price.metal, lang)}</td>
                    </tr>
                    <tr>
                      <td>
                        {t('product.making')}
                        <small>{num(p.makingPct, lang)}%</small>
                      </td>
                      <td>{inr(price.making, lang)}</td>
                    </tr>
                    {price.stones > 0 && (
                      <tr>
                        <td>{t('product.stones')}</td>
                        <td>{inr(price.stones, lang)}</td>
                      </tr>
                    )}
                    <tr>
                      <td>{t('product.gst')}</td>
                      <td>{inr(price.gst, lang)}</td>
                    </tr>
                    <tr className="breakup__total">
                      <td>{t('product.total')}</td>
                      <td>{inr(price.total, lang)}</td>
                    </tr>
                  </tbody>
                </table>
              </Accordion>
              <Accordion title={t('product.details')}>
                <dl className="specs">
                  {rows.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Accordion>
              <Accordion title={t('product.care')}>
                <p>{t('product.careText')}</p>
              </Accordion>
            </m.div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHeading title={t('product.related')} />
          <Reveal>
            <ProductGrid items={related(p, 4)} />
          </Reveal>
        </div>
      </section>

      {/* Mobile sticky buy bar */}
      <div className="buybar">
        <div>
          <Price value={price.total} />
          <small>{digits(p.purity, lang)} · {grams(p.weightG, lang)}</small>
        </div>
        <button className="btn" onClick={add}>
          {added ? t('product.added') : t('product.addToCart')}
        </button>
      </div>
    </>
  )
}
