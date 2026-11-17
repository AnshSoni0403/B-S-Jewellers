import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { SlidersHorizontal, X } from 'lucide-react'
import { getCategory, occasions } from '@/data/categories'
import { productsIn } from '@/data/products'
import { priceOf } from '@/data/rates'
import type { Category, Product, Purity } from '@/data/types'
import { useLang } from '@/i18n/LangContext'
import { useRates } from '@/store/ShopContext'
import { digits, inr, num } from '@/lib/format'
import { ease } from '@/lib/motion'
import { Breadcrumbs, SmartImage } from '@/components/ui'
import { ProductGrid } from '@/components/ProductCard'
import NotFound from './NotFound'
import './pages.css'

const PAGE = 12

const PRICE_BUCKETS: { key: string; min: number; max: number }[] = [
  { key: 'u25', min: 0, max: 25000 },
  { key: '25-75', min: 25000, max: 75000 },
  { key: '75-150', min: 75000, max: 150000 },
  { key: '150-300', min: 150000, max: 300000 },
  { key: 'o300', min: 300000, max: Infinity },
]

type SortKey = 'featured' | 'priceLow' | 'priceHigh' | 'new'

function useListParam(params: URLSearchParams, key: string) {
  return useMemo(() => (params.get(key) ? params.get(key)!.split(',') : []), [params, key])
}

/* ---------------------------------------------------------------- Filter panel */

function Filters({
  cat,
  subSlug,
  base,
  params,
  setParams,
}: {
  cat: Category
  subSlug?: string
  base: Product[]
  params: URLSearchParams
  setParams: (p: URLSearchParams) => void
}) {
  const { t, tx, lang } = useLang()
  const types = useListParam(params, 'type')
  const purities = useListParam(params, 'purity')
  const occ = useListParam(params, 'occ')
  const price = params.get('price')

  const toggle = (key: string, value: string, list: string[]) => {
    const next = new URLSearchParams(params)
    const v = list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
    if (v.length) next.set(key, v.join(','))
    else next.delete(key)
    setParams(next)
  }
  const setSingle = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value && params.get(key) !== value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const availablePurity = Array.from(new Set(base.map((p) => p.purity))) as Purity[]
  const availableOcc = occasions.filter((o) => base.some((p) => p.occasions.includes(o.slug)))
  const priceLabel = (b: (typeof PRICE_BUCKETS)[number]) => {
    if (b.min === 0) return lang === 'gu' ? `${inr(b.max, lang)} ${t('price.under')}` : `${t('price.under')} ${inr(b.max, lang)}`
    if (b.max === Infinity) return lang === 'gu' ? `${inr(b.min, lang)} ${t('price.above')}` : `${t('price.above')} ${inr(b.min, lang)}`
    return `${inr(b.min, lang)} – ${inr(b.max, lang)}`
  }

  return (
    <div className="filters">
      {!subSlug && (
        <fieldset>
          <legend>{t('filter.type')}</legend>
          {cat.children.map((s) => (
            <label key={s.slug} className="check">
              <input type="checkbox" checked={types.includes(s.slug)} onChange={() => toggle('type', s.slug, types)} />
              <span>{tx(s.name)}</span>
            </label>
          ))}
        </fieldset>
      )}
      {availablePurity.length > 1 && (
        <fieldset>
          <legend>{t('filter.purity')}</legend>
          <div className="pill-row">
            {availablePurity.map((p) => (
              <button
                type="button"
                key={p}
                className={`chip ${purities.includes(p) ? 'is-active' : ''}`}
                aria-pressed={purities.includes(p)}
                onClick={() => toggle('purity', p, purities)}
              >
                {digits(p, lang)}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <fieldset>
        <legend>{t('filter.price')}</legend>
        {PRICE_BUCKETS.map((b) => (
          <label key={b.key} className="check check--radio">
            <input type="radio" name="price" checked={price === b.key} onChange={() => setSingle('price', b.key)} onClick={() => price === b.key && setSingle('price', null)} />
            <span>{priceLabel(b)}</span>
          </label>
        ))}
      </fieldset>
      {availableOcc.length > 1 && (
        <fieldset>
          <legend>{t('filter.occasion')}</legend>
          <div className="pill-row">
            {availableOcc.map((o) => (
              <button
                type="button"
                key={o.slug}
                className={`chip ${occ.includes(o.slug) ? 'is-active' : ''}`}
                aria-pressed={occ.includes(o.slug)}
                onClick={() => toggle('occ', o.slug, occ)}
              >
                {tx(o.name)}
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- Page */

export default function Collection() {
  const { cat: catSlug, sub: subSlug } = useParams()
  const [params, setParams] = useSearchParams()
  const { t, tx, lang } = useLang()
  const rates = useRates()
  const [limit, setLimit] = useState(PAGE)
  const [drawer, setDrawer] = useState(false)

  const cat = getCategory(catSlug)
  const sub = cat?.children.find((s) => s.slug === subSlug)

  const base = useMemo(() => (cat ? productsIn(cat.slug, sub?.slug) : []), [cat, sub])
  const types = useListParam(params, 'type')
  const purities = useListParam(params, 'purity')
  const occ = useListParam(params, 'occ')
  const priceKey = params.get('price')
  const sort = (params.get('sort') as SortKey) || 'featured'

  const results = useMemo(() => {
    const bucket = PRICE_BUCKETS.find((b) => b.key === priceKey)
    const withPrice = base.map((p) => ({ p, price: priceOf(p, rates).total }))
    const filtered = withPrice.filter(
      ({ p, price }) =>
        (!types.length || types.includes(p.sub)) &&
        (!purities.length || purities.includes(p.purity)) &&
        (!occ.length || occ.some((o) => p.occasions.includes(o))) &&
        (!bucket || (price >= bucket.min && price < bucket.max)),
    )
    const score = (p: Product) => (p.badge === 'bestseller' ? 2 : p.badge ? 1 : 0) + p.rating / 10
    filtered.sort((a, b) => {
      switch (sort) {
        case 'priceLow':
          return a.price - b.price
        case 'priceHigh':
          return b.price - a.price
        case 'new':
          return b.p.addedOrder - a.p.addedOrder
        default:
          return score(b.p) - score(a.p)
      }
    })
    return filtered.map((x) => x.p)
  }, [base, types, purities, occ, priceKey, sort, rates])

  // Reset pagination when the result set changes
  useEffect(() => setLimit(PAGE), [catSlug, subSlug, params])

  useEffect(() => {
    if (!drawer) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [drawer])

  if (!cat || (subSlug && !sub)) return <NotFound />

  const activeCount = types.length + purities.length + occ.length + (priceKey ? 1 : 0)
  const clearAll = () => {
    const next = new URLSearchParams()
    if (params.get('sort')) next.set('sort', params.get('sort')!)
    setParams(next)
  }
  const setSort = (v: string) => {
    const next = new URLSearchParams(params)
    if (v === 'featured') next.delete('sort')
    else next.set('sort', v)
    setParams(next, { replace: true })
  }
  const title = sub ? tx(sub.name) : tx(cat.name)

  return (
    <>
      <section className={`col-hero col-hero--${cat.tone}`}>
        <div className="container col-hero__inner">
          <div className="col-hero__copy">
            <Breadcrumbs items={sub ? [{ label: tx(cat.name), to: `/collections/${cat.slug}` }, { label: title }] : [{ label: title }]} />
            <m.h1 key={title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease.smooth }}>
              {title}
            </m.h1>
            <p>{sub?.note ? `${tx(sub.note)} · ${tx(cat.tagline)}` : tx(cat.tagline)}</p>
          </div>
          <div className="col-hero__img arch">
            <SmartImage id={sub?.image ?? cat.hero} alt="" ratio={1.25} widths={[280, 420, 560]} sizes="260px" priority />
          </div>
        </div>
      </section>

      <div className="container">
        <nav className="subnav h-scroll" aria-label={tx(cat.name)}>
          <Link to={`/collections/${cat.slug}`} className={`subnav__item ${!sub ? 'is-active' : ''}`}>
            {t('col.all')}
          </Link>
          {cat.children.map((s) => (
            <Link key={s.slug} to={`/collections/${cat.slug}/${s.slug}`} className={`subnav__item ${sub?.slug === s.slug ? 'is-active' : ''}`}>
              <span className="subnav__thumb">
                <SmartImage id={s.image} alt="" ratio={1} widths={[80, 120]} sizes="32px" />
              </span>
              {tx(s.name)}
            </Link>
          ))}
        </nav>

        <div className="col-toolbar">
          <button className="btn btn--ghost col-toolbar__filter" onClick={() => setDrawer(true)}>
            <SlidersHorizontal size={16} /> {t('col.filters')}
            {activeCount > 0 && <span className="badge-dot">{num(activeCount, lang)}</span>}
          </button>
          <p className="col-toolbar__count">
            {num(results.length, lang)} {t('common.designs')}
          </p>
          <label className="col-toolbar__sort">
            <span>{t('col.sort')}</span>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">{t('sort.featured')}</option>
              <option value="priceLow">{t('sort.priceLow')}</option>
              <option value="priceHigh">{t('sort.priceHigh')}</option>
              <option value="new">{t('sort.new')}</option>
            </select>
          </label>
        </div>

        <div className="col-layout">
          <aside className="col-sidebar" aria-label={t('col.filters')}>
            <div className="col-sidebar__head">
              <strong>{t('col.filters')}</strong>
              {activeCount > 0 && (
                <button className="text-btn" onClick={clearAll}>
                  {t('filter.clear')}
                </button>
              )}
            </div>
            <Filters cat={cat} subSlug={sub?.slug} base={base} params={params} setParams={(p) => setParams(p, { replace: true })} />
          </aside>

          <div className="col-results">
            {results.length === 0 ? (
              <div className="empty">
                <p>{t('col.empty')}</p>
                <button className="btn btn--ghost" onClick={clearAll}>
                  {t('filter.clear')}
                </button>
              </div>
            ) : (
              <>
                <ProductGrid items={results.slice(0, limit)} eager={4} />
                <div className="load-more">
                  <p>
                    {t('col.showing')} {num(Math.min(limit, results.length), lang)} {t('col.of')} {num(results.length, lang)}
                  </p>
                  <div className="load-more__bar">
                    <span style={{ transform: `scaleX(${Math.min(limit, results.length) / results.length})` }} />
                  </div>
                  {limit < results.length && (
                    <button className="btn btn--ghost" onClick={() => setLimit((l) => l + PAGE)}>
                      {t('col.loadMore')}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {drawer && (
          <m.div className="drawer-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)}>
            <m.div
              className="filter-sheet"
              role="dialog"
              aria-modal="true"
              aria-label={t('col.filters')}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.38, ease: ease.smooth }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="filter-sheet__head">
                <strong>{t('col.filters')}</strong>
                <button className="icon-btn" onClick={() => setDrawer(false)} aria-label={t('common.close')}>
                  <X size={20} />
                </button>
              </div>
              <div className="filter-sheet__body">
                <Filters cat={cat} subSlug={sub?.slug} base={base} params={params} setParams={(p) => setParams(p, { replace: true })} />
              </div>
              <div className="filter-sheet__foot">
                <button className="btn btn--ghost" onClick={clearAll}>
                  {t('filter.clear')}
                </button>
                <button className="btn" onClick={() => setDrawer(false)}>
                  {t('filter.show')} ({num(results.length, lang)})
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
