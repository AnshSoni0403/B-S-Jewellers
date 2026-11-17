import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { ChevronDown, Gem, Heart, Landmark, Menu, MapPin, Search, ShoppingBag, Sparkles, TrendingDown, TrendingUp, X } from 'lucide-react'
import { LiquidNavbar, type LiquidNavItem, type NimbusFx } from './ui/liquid-glass-navbar'
import { categories } from '@/data/categories'
import type { Category } from '@/data/types'
import { useLang } from '@/i18n/LangContext'
import { useRates, useShop } from '@/store/ShopContext'
import { inr, time } from '@/lib/format'
import { ease } from '@/lib/motion'
import { LangToggle, Logo, SmartImage } from './ui'
import './Header.css'

/* ---------------------------------------------------------------- Rate bar */

function RateBar() {
  const { t, lang } = useLang()
  const r = useRates()
  const items = [
    { k: t('rates.gold24'), v: r.gold24 },
    { k: t('rates.gold22'), v: r.gold22, d: r.change.gold22 },
    { k: t('rates.gold18'), v: r.gold18 },
    { k: t('rates.silver'), v: r.silver, d: r.change.silver },
  ]
  const list = (hidden?: boolean) => (
    <ul className="ratebar__list" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it.k}>
          <span className="ratebar__k">{it.k}</span>
          <strong>
            {inr(it.v, lang)}
            <small>{t('rates.perGram')}</small>
          </strong>
          {it.d !== undefined && (
            <span className={`ratebar__d ${it.d >= 0 ? 'up' : 'down'}`}>
              {it.d >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
  return (
    <div className="ratebar">
      <div className="container ratebar__inner">
        <span className="ratebar__title">
          <span className="ratebar__dot" aria-hidden="true" />
          {t('rates.title')}
          <span className="ratebar__time">
            · {t('rates.updated')} {time(r.updatedAt, lang)}
          </span>
        </span>
        <div className="ratebar__track">
          <div className="ratebar__marquee">
            {list()}
            {list(true)}
          </div>
        </div>
        <Link to="/stores" className="ratebar__link">
          <MapPin size={13} /> {t('nav.stores')}
        </Link>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Mega menu */

function MegaMenu({ cat, onClose }: { cat: Category; onClose: () => void }) {
  const { tx, t } = useLang()
  const bySlug = new Map(cat.children.map((c) => [c.slug, c]))
  return (
    <m.div
      className={`mega mega--${cat.tone}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: ease.smooth }}
    >
      <div className="container mega__inner">
        {cat.groups.map((g) => (
          <div key={g.title.en} className="mega__col">
            <p className="mega__title">{tx(g.title)}</p>
            <ul>
              {g.slugs.map((s) => {
                const sub = bySlug.get(s)
                if (!sub) return null
                return (
                  <li key={s}>
                    <Link to={`/collections/${cat.slug}/${s}`} onClick={onClose} className="mega__link">
                      <span className="mega__thumb">
                        <SmartImage id={sub.image} alt="" ratio={1} widths={[80, 120]} sizes="40px" />
                      </span>
                      {tx(sub.name)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <Link to={`/collections/${cat.slug}`} onClick={onClose} className="mega__feature">
          <SmartImage id={cat.hero} alt={tx(cat.name)} ratio={1.1} widths={[360, 540]} sizes="300px" />
          <span className="mega__feature-cap">
            <span className="eyebrow">{t('nav.featured')}</span>
            <strong>{tx(cat.name)}</strong>
            <span>{tx(cat.tagline)}</span>
          </span>
        </Link>
      </div>
    </m.div>
  )
}

/* ---------------------------------------------------------------- Search overlay */

const POPULAR = [
  { gu: 'મંગળસૂત્ર', en: 'Mangalsutra' },
  { gu: 'ઝુમખાં', en: 'Jhumkas' },
  { gu: 'પાયલ', en: 'Payal' },
  { gu: 'કુંદન', en: 'Kundan' },
  { gu: 'બંગડી', en: 'Bangles' },
  { gu: 'સિક્કો', en: 'Coin' },
]

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { t, tx } = useLang()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const go = (term: string) => {
    if (!term.trim()) return
    navigate(`/search?q=${encodeURIComponent(term.trim())}`)
    onClose()
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    go(q)
  }

  return (
    <m.div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t('common.search')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <m.div
        className="search-panel"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.3, ease: ease.smooth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container">
          <form onSubmit={submit} className="search-form" role="search">
            <Search size={22} strokeWidth={1.5} aria-hidden="true" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('search.placeholder')}
              aria-label={t('search.placeholder')}
              enterKeyHint="search"
            />
            <button type="button" onClick={onClose} aria-label={t('common.close')} className="icon-btn">
              <X size={22} strokeWidth={1.5} />
            </button>
          </form>
          <p className="search-popular-title">{t('search.popular')}</p>
          <div className="chips">
            {POPULAR.map((p) => (
              <button key={p.en} type="button" className="chip" onClick={() => go(tx(p))}>
                {tx(p)}
              </button>
            ))}
          </div>
        </div>
      </m.div>
    </m.div>
  )
}

/* ---------------------------------------------------------------- Mobile drawer */

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const { t, tx } = useLang()
  const [open, setOpen] = useState<string | null>(categories[0].slug)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <m.div className="drawer-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <m.aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t('common.menu')}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.38, ease: ease.smooth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer__head">
          <Logo compact />
          <button className="icon-btn" onClick={onClose} aria-label={t('common.close')}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <div className="drawer__lang">
          <LangToggle />
        </div>
        <nav className="drawer__nav">
          {categories.map((c) => {
            const isOpen = open === c.slug
            return (
              <div key={c.slug} className="drawer__group">
                <button
                  className="drawer__toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : c.slug)}
                >
                  {tx(c.name)}
                  <ChevronDown size={18} className={isOpen ? 'rot' : ''} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.ul
                      className="drawer__subs"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: ease.smooth }}
                    >
                      <li>
                        <Link to={`/collections/${c.slug}`} onClick={onClose} className="drawer__all">
                          {t('common.viewAll')} →
                        </Link>
                      </li>
                      {c.children.map((s) => (
                        <li key={s.slug}>
                          <Link to={`/collections/${c.slug}/${s.slug}`} onClick={onClose}>
                            <span className="drawer__thumb">
                              <SmartImage id={s.image} alt="" ratio={1} widths={[80, 120]} sizes="36px" />
                            </span>
                            {tx(s.name)}
                          </Link>
                        </li>
                      ))}
                    </m.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
          <Link to="/about" onClick={onClose} className="drawer__plain">
            {t('nav.about')}
          </Link>
          <Link to="/stores" onClick={onClose} className="drawer__plain">
            {t('nav.stores')}
          </Link>
          <Link to="/wishlist" onClick={onClose} className="drawer__plain">
            {t('common.wishlist')}
          </Link>
        </nav>
      </m.aside>
    </m.div>
  )
}

/* ---------------------------------------------------------------- Header */

const NAV_ROUTES = ['/collections/gold', '/collections/silver', '/collections/wedding-festive', '/about', '/stores']
const NAV_ICONS = [
  <Gem key="g" size={17} strokeWidth={1.6} />,
  <Sparkles key="s" size={17} strokeWidth={1.6} />,
  <Heart key="w" size={17} strokeWidth={1.6} />,
  <Landmark key="a" size={17} strokeWidth={1.6} />,
  <MapPin key="m" size={17} strokeWidth={1.6} />,
]
const NAV_FX: NimbusFx[] = ['spin', 'pop', 'wave', 'glow', 'drop']

export function Header() {
  const { t, tx } = useLang()
  const { cartCount, wishlist } = useShop()
  const { pathname } = useLocation()
  const [mega, setMega] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation
  useEffect(() => {
    setMega(null)
    setDrawerOpen(false)
  }, [pathname])

  const openMega = (slug: string) => {
    window.clearTimeout(closeTimer.current)
    setMega(slug)
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(null), 140)
  }
  const activeCat = categories.find((c) => c.slug === mega)

  // Liquid navbar: Gold · Silver · Wedding & Festive · About · Stores
  const navigate = useNavigate()
  const activeNav = NAV_ROUTES.findIndex((r) => pathname === r || pathname.startsWith(r + '/'))
  const navItems: LiquidNavItem[] = [
    ...categories.map((c, i) => ({ label: tx(c.name), icon: NAV_ICONS[i], fx: NAV_FX[i] })),
    { label: t('nav.about'), icon: NAV_ICONS[3], fx: NAV_FX[3] },
    { label: t('nav.stores'), icon: NAV_ICONS[4], fx: NAV_FX[4] },
  ]

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <RateBar />
        <div className="masthead">
          <div className="container masthead__inner">
            <div className="masthead__left">
              <button className="icon-btn only-mobile" onClick={() => setDrawerOpen(true)} aria-label={t('common.menu')}>
                <Menu size={22} strokeWidth={1.5} />
              </button>
              <button className="search-trigger" onClick={() => setSearchOpen(true)} aria-label={t('common.search')}>
                <Search size={18} strokeWidth={1.5} />
                <span className="only-desktop">{t('search.placeholder')}</span>
              </button>
            </div>
            <Logo />
            <div className="masthead__right">
              <LangToggle className="only-desktop-flex" />
              <Link to="/wishlist" className="icon-btn" aria-label={t('common.wishlist')}>
                <Heart size={21} strokeWidth={1.5} />
                {wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
              </Link>
              <Link to="/cart" className="icon-btn" aria-label={t('common.bag')}>
                <ShoppingBag size={21} strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <m.span
                      key={cartCount}
                      className="count"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                    >
                      {cartCount}
                    </m.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </div>
          <div className="mobile-lang only-mobile">
            <LangToggle />
          </div>
        </div>

        <div className="mainnav" onMouseLeave={scheduleClose}>
          <div className="container mainnav__bar">
            <LiquidNavbar
              ariaLabel="Primary"
              tone="light"
              active={activeNav}
              items={navItems}
              onChange={(i) => {
                setMega(null)
                navigate(NAV_ROUTES[i])
              }}
              onItemHover={(i) => {
                if (i !== null && i < categories.length) openMega(categories[i].slug)
                else scheduleClose()
              }}
            />
          </div>
          <div onMouseEnter={() => mega && openMega(mega)}>
            <AnimatePresence mode="wait">
              {activeCat && <MegaMenu key={activeCat.slug} cat={activeCat} onClose={() => setMega(null)} />}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
      <AnimatePresence mode="wait">{drawerOpen && <MobileDrawer onClose={() => setDrawerOpen(false)} />}</AnimatePresence>
    </>
  )
}
