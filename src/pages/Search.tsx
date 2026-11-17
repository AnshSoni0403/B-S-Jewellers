import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories } from '@/data/categories'
import { searchProducts } from '@/data/products'
import { useLang } from '@/i18n/LangContext'
import { num } from '@/lib/format'
import { Breadcrumbs } from '@/components/ui'
import { ProductGrid } from '@/components/ProductCard'
import './pages.css'

export default function Search() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const { t, tx, lang } = useLang()
  const results = useMemo(() => searchProducts(q), [q])

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('search.title') }]} />
      <h1 className="page__title">
        {t('search.for')} “{q}” <small>({num(results.length, lang)})</small>
      </h1>
      {results.length === 0 ? (
        <div className="empty">
          <p>{t('search.none')}</p>
          <div className="chips">
            {categories.flatMap((c) =>
              c.children.slice(0, 3).map((s) => (
                <Link key={s.slug} to={`/collections/${c.slug}/${s.slug}`} className="chip">
                  {tx(s.name)}
                </Link>
              )),
            )}
          </div>
        </div>
      ) : (
        <ProductGrid items={results.slice(0, 48)} />
      )}
    </div>
  )
}
