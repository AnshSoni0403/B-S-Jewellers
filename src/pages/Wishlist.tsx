import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { getProduct } from '@/data/products'
import type { Product } from '@/data/types'
import { useLang } from '@/i18n/LangContext'
import { useShop } from '@/store/ShopContext'
import { Breadcrumbs } from '@/components/ui'
import { ProductGrid } from '@/components/ProductCard'
import './pages.css'

export default function Wishlist() {
  const { t } = useLang()
  const { wishlist } = useShop()
  const items = wishlist.map(getProduct).filter((p): p is Product => !!p)

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('wish.title') }]} />
      <h1 className="page__title">{t('wish.title')}</h1>
      {items.length === 0 ? (
        <div className="empty empty--page">
          <Heart size={44} strokeWidth={1} />
          <h2>{t('wish.empty')}</h2>
          <p>{t('wish.emptyBody')}</p>
          <Link to="/collections/gold" className="btn">
            {t('cart.start')}
          </Link>
        </div>
      ) : (
        <ProductGrid items={items} />
      )}
    </div>
  )
}
