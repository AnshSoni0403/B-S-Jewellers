/** Shared domain types. Mirror these on the server when the backend is added. */

export type Lang = 'gu' | 'en'

/** A bilingual string. Every user-facing data field uses this shape. */
export type L = { gu: string; en: string }

export type Metal = 'gold' | 'silver'
export type Purity = '24K' | '22K' | '18K' | '999' | '925'
export type Badge = 'new' | 'bestseller' | 'handcrafted'

export interface SubCategory {
  slug: string
  name: L
  image: string
  /** Optional short note, e.g. festival season. */
  note?: L
}

export interface Category {
  slug: string
  name: L
  tagline: L
  hero: string
  /** Visual accent used for the category banner. */
  tone: 'gold' | 'silver' | 'emerald'
  children: SubCategory[]
  /** Column groupings for the mega menu. */
  groups: { title: L; slugs: string[] }[]
}

export interface Product {
  id: string
  slug: string
  name: L
  category: string
  sub: string
  metal: Metal
  purity: Purity
  weightG: number
  makingPct: number
  stonePrice: number
  images: string[]
  occasions: string[]
  badge?: Badge
  rating: number
  reviews: number
  sizes?: string[]
  /** Higher = newer. Replace with a real date from the backend. */
  addedOrder: number
}

export interface Rates {
  gold24: number
  gold22: number
  gold18: number
  silver: number
  /** Day-over-day change in ₹/g, for the ticker arrows. */
  change: { gold22: number; silver: number }
  updatedAt: string
}

export interface Store {
  id: string
  name: L
  address: L
  city: L
  phone: string
  hours: L
  mapQuery: string
  image: string
}

export interface CartLine {
  id: string
  qty: number
  size?: string
}
