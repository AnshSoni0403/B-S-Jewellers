import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { m } from 'motion/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageLoader, ScrollToTop } from './ui'
import { ease } from '@/lib/motion'
import './components.css'

export function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          {/* Enter-only fade keeps navigation feeling instant (no exit wait). */}
          <m.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: ease.smooth }}>
            <Outlet />
          </m.div>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
