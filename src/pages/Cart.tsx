import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { getProduct } from '@/data/products'
import { priceOf } from '@/data/rates'
import type { ReactNode } from 'react'
import type { Product } from '@/data/types'
import { useLang } from '@/i18n/LangContext'
import { useRates, useShop } from '@/store/ShopContext'
import { digits, grams, inr, num } from '@/lib/format'
import { Breadcrumbs, SmartImage } from '@/components/ui'
import './pages.css'

export function useCartLines() {
  const { cart } = useShop()
  const rates = useRates()
  const lines = cart
    .map((l) => ({ ...l, p: getProduct(l.id) }))
    .filter((l): l is typeof l & { p: Product } => !!l.p)
    .map((l) => ({ ...l, unit: priceOf(l.p, rates).total }))
  const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0)
  return { lines, subtotal }
}

export function OrderSummary({ subtotal, children }: { subtotal: number; children?: ReactNode }) {
  const { t, lang } = useLang()
  return (
    <aside className="summary">
      <h2>{t('co.summary')}</h2>
      <dl>
        <div>
          <dt>{t('cart.subtotal')}</dt>
          <dd>{inr(subtotal, lang)}</dd>
        </div>
        <div>
          <dt>{t('cart.shipping')}</dt>
          <dd className="summary__free">{t('cart.free')}</dd>
        </div>
        <div className="summary__total">
          <dt>{t('cart.total')}</dt>
          <dd>{inr(subtotal, lang)}</dd>
        </div>
      </dl>
      {children}
      <p className="summary__note">{t('cart.note')}</p>
    </aside>
  )
}

export default function Cart() {
  const { t, tx, lang } = useLang()
  const { setQty, removeFromCart } = useShop()
  const { lines, subtotal } = useCartLines()

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('cart.title') }]} />
      <h1 className="page__title">
        {t('cart.title')} {lines.length > 0 && <small>({num(lines.length, lang)} {t('cart.items')})</small>}
      </h1>

      {lines.length === 0 ? (
        <div className="empty empty--page">
          <ShoppingBag size={44} strokeWidth={1} />
          <h2>{t('cart.empty')}</h2>
          <p>{t('cart.emptyBody')}</p>
          <Link to="/collections/gold" className="btn">
            {t('cart.start')}
          </Link>
        </div>
      ) : (
        <div className="cart">
          <ul className="cart__lines">
            <AnimatePresence mode="popLayout" initial={false}>
              {lines.map((l) => (
                <m.li
                  key={l.id + (l.size ?? '')}
                  className="line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link to={`/product/${l.p.slug}`} className="line__img">
                    <SmartImage id={l.p.images[0]} alt={tx(l.p.name)} ratio={1} widths={[160, 240]} sizes="120px" />
                  </Link>
                  <div className="line__info">
                    <Link to={`/product/${l.p.slug}`} className="line__name">
                      {tx(l.p.name)}
                    </Link>
                    <p className="line__meta">
                      {digits(l.p.purity, lang)} · {grams(l.p.weightG, lang)}
                      {l.size && ` · ${t('product.sizeShort')} ${digits(l.size, lang)}`}
                    </p>
                    <div className="qty" aria-label={t('cart.qty')}>
                      <button onClick={() => setQty(l.id, l.size, l.qty - 1)} disabled={l.qty <= 1} aria-label="-">
                        <Minus size={14} />
                      </button>
                      <span>{num(l.qty, lang)}</span>
                      <button onClick={() => setQty(l.id, l.size, l.qty + 1)} aria-label="+">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="line__right">
                    <strong>{inr(l.unit * l.qty, lang)}</strong>
                    <button className="text-btn" onClick={() => removeFromCart(l.id, l.size)}>
                      <X size={14} /> {t('cart.remove')}
                    </button>
                  </div>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
          <OrderSummary subtotal={subtotal}>
            <Link to="/checkout" className="btn btn--block">
              {t('cart.checkout')}
            </Link>
          </OrderSummary>
        </div>
      )}
    </div>
  )
}
