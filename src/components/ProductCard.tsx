import { memo } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import { Heart, Star } from 'lucide-react'
import type { Product } from '@/data/types'
import { useLang } from '@/i18n/LangContext'
import { useRates, useShop } from '@/store/ShopContext'
import { priceOf } from '@/data/rates'
import { digits, grams, num } from '@/lib/format'
import { Price, SmartImage } from './ui'

function ProductCardBase({ p, priority }: { p: Product; priority?: boolean }) {
  const { t, tx, lang } = useLang()
  const rates = useRates()
  const { isWished, toggleWish } = useShop()
  const wished = isWished(p.id)
  const price = priceOf(p, rates)
  const name = tx(p.name)

  return (
    <article className="pcard">
      <Link to={`/product/${p.slug}`} className="pcard__media" aria-label={name}>
        <SmartImage
          id={p.images[0]}
          alt={name}
          ratio={1.15}
          widths={[300, 460, 640]}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="pcard__img"
        />
        {p.images[1] && (
          <SmartImage
            id={p.images[1]}
            alt=""
            ratio={1.15}
            widths={[300, 460, 640]}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="pcard__img pcard__img--alt"
          />
        )}
        {p.badge && <span className={`pcard__badge pcard__badge--${p.badge}`}>{t(`badge.${p.badge}`)}</span>}
      </Link>

      <m.button
        type="button"
        className={`pcard__wish ${wished ? 'is-active' : ''}`}
        onClick={() => toggleWish(p.id)}
        aria-pressed={wished}
        aria-label={wished ? t('product.wishlisted') : t('product.wishlist')}
        whileTap={{ scale: 0.85 }}
      >
        <Heart size={18} strokeWidth={1.6} fill={wished ? 'currentColor' : 'none'} />
      </m.button>

      <Link to={`/product/${p.slug}`} className="pcard__body">
        <span className="pcard__meta">
          <span className={`pcard__purity pcard__purity--${p.metal}`}>{digits(p.purity, lang)}</span>
          <span>{grams(p.weightG, lang)}</span>
          <span className="pcard__rating">
            <Star size={11} fill="currentColor" strokeWidth={0} /> {num(p.rating, lang, 1)}
          </span>
        </span>
        <h3 className="pcard__name">{name}</h3>
        <Price value={price.total} className="pcard__price" />
      </Link>
    </article>
  )
}

export const ProductCard = memo(ProductCardBase)

export function ProductGrid({ items, eager = 0 }: { items: Product[]; eager?: number }) {
  return (
    <div className="pgrid">
      {items.map((p, i) => (
        <ProductCard key={p.id} p={p} priority={i < eager} />
      ))}
    </div>
  )
}
