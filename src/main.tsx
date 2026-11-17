// Global styles first so component/page CSS can override them.
import './styles/tokens.css'
import './styles/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { LangProvider } from './i18n/LangContext'
import { RatesProvider, ShopProvider } from './store/ShopContext'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <RatesProvider>
          <ShopProvider>
            {/* LazyMotion + `m` components keep the animation bundle small. */}
            <LazyMotion features={domAnimation} strict>
              <MotionConfig reducedMotion="user">
                <App />
              </MotionConfig>
            </LazyMotion>
          </ShopProvider>
        </RatesProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
)
