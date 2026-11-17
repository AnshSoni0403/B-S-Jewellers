import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartLine, Rates } from '@/data/types'
import { fetchRates, mockRates } from '@/data/rates'

/* ---------------------------------------------------------------- rates */

const RatesCtx = createContext<Rates>(mockRates)

export function RatesProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<Rates>(mockRates)
  useEffect(() => {
    const ac = new AbortController()
    fetchRates(ac.signal).then(setRates).catch(() => {})
    return () => ac.abort()
  }, [])
  return <RatesCtx.Provider value={rates}>{children}</RatesCtx.Provider>
}

export const useRates = () => useContext(RatesCtx)

/* ---------------------------------------------------------------- shop (cart + wishlist) */

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore quota / private mode */
    }
  }, [key, value])
  return [value, setValue] as const
}

interface ShopCtx {
  cart: CartLine[]
  wishlist: string[]
  cartCount: number
  addToCart: (id: string, size?: string) => void
  setQty: (id: string, size: string | undefined, qty: number) => void
  removeFromCart: (id: string, size?: string) => void
  clearCart: () => void
  toggleWish: (id: string) => void
  isWished: (id: string) => boolean
}

const ShopContext = createContext<ShopCtx | null>(null)

const same = (l: CartLine, id: string, size?: string) => l.id === id && (l.size ?? '') === (size ?? '')

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersisted<CartLine[]>('bks-cart', [])
  const [wishlist, setWishlist] = usePersisted<string[]>('bks-wishlist', [])

  const addToCart = useCallback(
    (id: string, size?: string) =>
      setCart((c) =>
        c.some((l) => same(l, id, size))
          ? c.map((l) => (same(l, id, size) ? { ...l, qty: Math.min(l.qty + 1, 10) } : l))
          : [...c, { id, qty: 1, size }],
      ),
    [setCart],
  )
  const setQty = useCallback(
    (id: string, size: string | undefined, qty: number) =>
      setCart((c) => c.map((l) => (same(l, id, size) ? { ...l, qty: Math.max(1, Math.min(qty, 10)) } : l))),
    [setCart],
  )
  const removeFromCart = useCallback(
    (id: string, size?: string) => setCart((c) => c.filter((l) => !same(l, id, size))),
    [setCart],
  )
  const clearCart = useCallback(() => setCart([]), [setCart])
  const toggleWish = useCallback(
    (id: string) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    [setWishlist],
  )
  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWish,
      isWished,
    }),
    [cart, wishlist, addToCart, setQty, removeFromCart, clearCart, toggleWish, isWished],
  )
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop(): ShopCtx {
  const v = useContext(ShopContext)
  if (!v) throw new Error('useShop must be used inside <ShopProvider>')
  return v
}
