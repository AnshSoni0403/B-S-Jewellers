import type { Product, Rates } from './types'

/**
 * Metal rates. `fetchRates` calls `${VITE_API_URL}/rates` when an API URL is
 * configured (see .env.example) and falls back to these mock values otherwise.
 * MOCK VALUES — not live market prices.
 */
export const mockRates: Rates = {
  gold24: 13120,
  gold22: 12025,
  gold18: 9840,
  silver: 165,
  change: { gold22: 45, silver: -2 },
  updatedAt: new Date().toISOString(),
}

export async function fetchRates(signal?: AbortSignal): Promise<Rates> {
  const api = import.meta.env.VITE_API_URL as string | undefined
  if (!api) return mockRates
  try {
    const res = await fetch(`${api.replace(/\/$/, '')}/rates`, { signal })
    if (!res.ok) throw new Error(`rates ${res.status}`)
    return (await res.json()) as Rates
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err
    console.warn('[rates] falling back to mock rates:', err)
    return mockRates
  }
}

export const GST_RATE = 0.03

export function ratePerGram(p: Pick<Product, 'purity'>, r: Rates): number {
  switch (p.purity) {
    case '24K':
      return r.gold24
    case '22K':
      return r.gold22
    case '18K':
      return r.gold18
    case '999':
      return r.silver
    case '925':
      return Math.round(r.silver * 0.925 * 100) / 100
  }
}

export interface PriceBreakup {
  metal: number
  making: number
  stones: number
  gst: number
  total: number
}

/** Price = metal value + making + stones, plus 3% GST. Rounded to the rupee. */
export function priceOf(p: Product, r: Rates): PriceBreakup {
  const metal = Math.round(p.weightG * ratePerGram(p, r))
  const making = Math.round((metal * p.makingPct) / 100)
  const stones = p.stonePrice
  const gst = Math.round((metal + making + stones) * GST_RATE)
  return { metal, making, stones, gst, total: metal + making + stones + gst }
}
