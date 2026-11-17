import type { L, Product, Purity } from './types'
import { categories } from './categories'
import { pools } from './images'

/**
 * Mock catalogue, generated deterministically so it looks real and stays
 * stable between reloads. When the backend arrives, replace `products` with
 * data from `GET /products` — the Product shape in types.ts is the contract.
 */

// Deterministic PRNG (mulberry32)
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const prefixes: L[] = [
  { gu: 'રાણી', en: 'Rani' },
  { gu: 'કુંદન', en: 'Kundan' },
  { gu: 'લક્ષ્મી', en: 'Lakshmi' },
  { gu: 'મીનાકારી', en: 'Meenakari' },
  { gu: 'મોર', en: 'Mor' },
  { gu: 'કમળ', en: 'Kamal' },
  { gu: 'જાળી', en: 'Jaali' },
  { gu: 'મંદિર', en: 'Mandir' },
  { gu: 'નકશી', en: 'Nakshi' },
  { gu: 'પોલકી', en: 'Polki' },
  { gu: 'શૃંગાર', en: 'Shringar' },
  { gu: 'ચંદ્રિકા', en: 'Chandrika' },
  { gu: 'પટોળા', en: 'Patola' },
  { gu: 'રજવાડી', en: 'Rajwadi' },
  { gu: 'પુષ્પ', en: 'Pushp' },
  { gu: 'સાંજ', en: 'Saanj' },
]

interface Spec {
  nouns: L[]
  weight: [number, number]
  making: [number, number]
  purity: Purity[]
  count: number
  occasions: string[]
  sizes?: string[]
  stones?: boolean
}

const RING_SIZES = ['8', '10', '12', '14', '16', '18', '20']
const BANGLE_SIZES = ['2.2', '2.4', '2.6', '2.8']

const specs: Record<string, Spec> = {
  // ---- gold
  necklaces: { nouns: [{ gu: 'હાર', en: 'Necklace' }, { gu: 'ચોકર', en: 'Choker' }, { gu: 'રાણી હાર', en: 'Rani Haar' }], weight: [18, 62], making: [10, 16], purity: ['22K'], count: 10, occasions: ['wedding', 'festive'], stones: true },
  earrings: { nouns: [{ gu: 'ઝુમખાં', en: 'Jhumkas' }, { gu: 'ટોપ્સ', en: 'Studs' }, { gu: 'લટકણ', en: 'Drops' }, { gu: 'બાલી', en: 'Hoops' }], weight: [3, 14], making: [12, 18], purity: ['22K', '18K'], count: 10, occasions: ['daily', 'festive', 'office'] },
  bangles: { nouns: [{ gu: 'બંગડી', en: 'Bangles' }, { gu: 'કડું', en: 'Kada' }, { gu: 'પાટલા', en: 'Patla' }], weight: [12, 46], making: [9, 14], purity: ['22K'], count: 8, occasions: ['wedding', 'festive', 'daily'], sizes: BANGLE_SIZES },
  rings: { nouns: [{ gu: 'વીંટી', en: 'Ring' }, { gu: 'બેન્ડ', en: 'Band' }, { gu: 'સગાઈ વીંટી', en: 'Engagement Ring' }], weight: [2, 8], making: [12, 18], purity: ['22K', '18K'], count: 10, occasions: ['daily', 'office', 'gifting', 'wedding'], sizes: RING_SIZES },
  chains: { nouns: [{ gu: 'ચેઈન', en: 'Chain' }, { gu: 'રોપ ચેઈન', en: 'Rope Chain' }, { gu: 'લેયર્ડ ચેઈન', en: 'Layered Chain' }], weight: [6, 24], making: [8, 12], purity: ['22K'], count: 8, occasions: ['daily', 'office', 'gifting'] },
  mangalsutra: { nouns: [{ gu: 'મંગળસૂત્ર', en: 'Mangalsutra' }], weight: [6, 18], making: [11, 15], purity: ['22K', '18K'], count: 8, occasions: ['wedding', 'daily'] },
  pendants: { nouns: [{ gu: 'પેન્ડન્ટ', en: 'Pendant' }, { gu: 'લોકેટ', en: 'Locket' }], weight: [2, 7], making: [12, 18], purity: ['22K', '18K'], count: 8, occasions: ['daily', 'gifting', 'office'] },
  bracelets: { nouns: [{ gu: 'બ્રેસલેટ', en: 'Bracelet' }, { gu: 'લૂઝ કડું', en: 'Loose Kada' }], weight: [5, 16], making: [10, 15], purity: ['22K', '18K'], count: 8, occasions: ['daily', 'office', 'gifting'] },
  nosepins: { nouns: [{ gu: 'નથ', en: 'Nath' }, { gu: 'ચૂંક', en: 'Nose Pin' }], weight: [0.6, 4], making: [14, 20], purity: ['22K', '18K'], count: 6, occasions: ['wedding', 'daily'] },
  coins: { nouns: [{ gu: 'સોનાનો સિક્કો', en: 'Gold Coin' }], weight: [1, 10], making: [3, 5], purity: ['24K'], count: 6, occasions: ['gifting', 'festive'] },

  // ---- silver
  'silver-payal': { nouns: [{ gu: 'પાયલ', en: 'Payal' }, { gu: 'ઝાંઝર', en: 'Jhanjhar' }], weight: [30, 120], making: [14, 22], purity: ['925'], count: 8, occasions: ['wedding', 'daily', 'festive'] },
  'silver-toe-rings': { nouns: [{ gu: 'વીંછિયા', en: 'Toe Rings' }], weight: [4, 12], making: [16, 24], purity: ['925'], count: 6, occasions: ['wedding', 'daily'] },
  'silver-rings': { nouns: [{ gu: 'વીંટી', en: 'Ring' }, { gu: 'બેન્ડ', en: 'Band' }], weight: [3, 9], making: [18, 26], purity: ['925'], count: 6, occasions: ['daily', 'gifting'], sizes: RING_SIZES },
  'silver-earrings': { nouns: [{ gu: 'ઝુમખાં', en: 'Jhumkas' }, { gu: 'ટોપ્સ', en: 'Studs' }], weight: [4, 16], making: [18, 26], purity: ['925'], count: 6, occasions: ['daily', 'festive', 'office'] },
  'silver-pendants': { nouns: [{ gu: 'પેન્ડન્ટ', en: 'Pendant' }, { gu: 'ચેઈન', en: 'Chain' }], weight: [4, 18], making: [16, 24], purity: ['925'], count: 6, occasions: ['daily', 'gifting'] },
  'silver-bracelets': { nouns: [{ gu: 'કડું', en: 'Kada' }, { gu: 'બ્રેસલેટ', en: 'Bracelet' }], weight: [12, 40], making: [14, 20], purity: ['925'], count: 6, occasions: ['daily', 'gifting'] },
  'silver-pooja': { nouns: [{ gu: 'પૂજા થાળી', en: 'Pooja Thali' }, { gu: 'દીવો', en: 'Diya' }, { gu: 'કળશ', en: 'Kalash' }], weight: [60, 320], making: [10, 16], purity: ['999', '925'], count: 6, occasions: ['festive', 'gifting'] },
  'silver-coins': { nouns: [{ gu: 'લક્ષ્મી સિક્કો', en: 'Lakshmi Coin' }, { gu: 'ગણેશ સિક્કો', en: 'Ganesh Coin' }], weight: [10, 50], making: [4, 8], purity: ['999'], count: 6, occasions: ['festive', 'gifting'] },
  'silver-gifting': { nouns: [{ gu: 'ભેટ સેટ', en: 'Gift Set' }, { gu: 'મોતી હાર', en: 'Pearl Strand' }], weight: [10, 60], making: [14, 22], purity: ['925'], count: 6, occasions: ['gifting'] },

  // ---- wedding & festive
  'bridal-sets': { nouns: [{ gu: 'દુલ્હન સેટ', en: 'Bridal Set' }, { gu: 'હાર સેટ', en: 'Haar Set' }], weight: [55, 140], making: [12, 18], purity: ['22K'], count: 8, occasions: ['wedding'], stones: true },
  groom: { nouns: [{ gu: 'કડું', en: 'Kada' }, { gu: 'વીંટી', en: 'Ring' }, { gu: 'ચેઈન', en: 'Chain' }], weight: [8, 40], making: [9, 13], purity: ['22K'], count: 6, occasions: ['wedding'] },
  'mehndi-haldi': { nouns: [{ gu: 'હાથફૂલ', en: 'Haathphool' }, { gu: 'બંગડી સેટ', en: 'Bangle Set' }], weight: [8, 30], making: [12, 18], purity: ['22K', '18K'], count: 6, occasions: ['wedding', 'festive'] },
  diwali: { nouns: [{ gu: 'હાર', en: 'Necklace' }, { gu: 'ઝુમખાં', en: 'Jhumkas' }, { gu: 'કડું', en: 'Kada' }], weight: [6, 40], making: [10, 15], purity: ['22K'], count: 6, occasions: ['festive', 'gifting'] },
  navratri: { nouns: [{ gu: 'ઓક્સિડાઇઝ્ડ ઝુમખાં', en: 'Oxidised Jhumkas' }, { gu: 'કમરબંધ', en: 'Kamarbandh' }, { gu: 'પાયલ', en: 'Payal' }], weight: [10, 70], making: [16, 24], purity: ['925'], count: 6, occasions: ['festive'] },
  dhanteras: { nouns: [{ gu: 'સોનાનો સિક્કો', en: 'Gold Coin' }, { gu: 'ચાંદીનો સિક્કો', en: 'Silver Coin' }, { gu: 'વીંટી', en: 'Ring' }], weight: [2, 20], making: [3, 10], purity: ['24K', '999', '22K'], count: 6, occasions: ['festive', 'gifting'] },
  'akshaya-tritiya': { nouns: [{ gu: 'કડું', en: 'Kada' }, { gu: 'હાર', en: 'Necklace' }, { gu: 'મંગળસૂત્ર', en: 'Mangalsutra' }], weight: [8, 45], making: [9, 14], purity: ['22K'], count: 6, occasions: ['festive', 'wedding'] },
  'raksha-bandhan': { nouns: [{ gu: 'રાખડી', en: 'Rakhi' }, { gu: 'બ્રેસલેટ', en: 'Bracelet' }], weight: [3, 14], making: [14, 22], purity: ['925', '18K'], count: 6, occasions: ['festive', 'gifting'] },
  'karva-chauth': { nouns: [{ gu: 'મંગળસૂત્ર', en: 'Mangalsutra' }, { gu: 'વીંટી', en: 'Ring' }, { gu: 'બ્રેસલેટ', en: 'Bracelet' }], weight: [3, 16], making: [11, 16], purity: ['22K', '18K'], count: 6, occasions: ['festive', 'gifting'] },
}

function build(): Product[] {
  const out: Product[] = []
  let order = 0
  for (const cat of categories) {
    for (const sub of cat.children) {
      const spec = specs[sub.slug]
      const pool = pools[sub.slug] ?? [sub.image]
      if (!spec) continue
      const r = rng(sub.slug.length * 7919 + sub.slug.charCodeAt(0) * 104729)
      for (let i = 0; i < spec.count; i++) {
        const prefix = prefixes[Math.floor(r() * prefixes.length)]
        const noun = spec.nouns[i % spec.nouns.length]
        const purity = spec.purity[Math.floor(r() * spec.purity.length)]
        const metal = purity === '925' || purity === '999' ? 'silver' : 'gold'
        const weightG = Math.round((spec.weight[0] + r() * (spec.weight[1] - spec.weight[0])) * 100) / 100
        const makingPct = Math.round(spec.making[0] + r() * (spec.making[1] - spec.making[0]))
        const hasStones = spec.stones || prefix.en === 'Kundan' || prefix.en === 'Polki' || prefix.en === 'Meenakari'
        const stonePrice = hasStones && metal === 'gold' ? Math.round((2000 + r() * 18000) / 100) * 100 : 0
        const id = `${sub.slug}-${String(i + 1).padStart(2, '0')}`
        const badgeRoll = r()
        out.push({
          id,
          slug: `${prefix.en}-${noun.en}`.toLowerCase().replace(/\s+/g, '-') + `-${id}`,
          name: { gu: `${prefix.gu} ${noun.gu}`, en: `${prefix.en} ${noun.en}` },
          category: cat.slug,
          sub: sub.slug,
          metal,
          purity,
          weightG,
          makingPct,
          stonePrice,
          images: [pool[i % pool.length], pool[(i + 1) % pool.length], pool[(i + 2) % pool.length]].filter(
            (v, idx, arr) => arr.indexOf(v) === idx,
          ),
          occasions: spec.occasions.filter((_, k) => k === 0 || r() > 0.4),
          badge: badgeRoll < 0.16 ? 'bestseller' : badgeRoll < 0.28 ? 'new' : badgeRoll < 0.36 ? 'handcrafted' : undefined,
          rating: Math.round((4.2 + r() * 0.8) * 10) / 10,
          reviews: Math.floor(8 + r() * 240),
          sizes: spec.sizes,
          addedOrder: order++,
        })
      }
    }
  }
  return out
}

export const products: Product[] = build()

const byId = new Map(products.map((p) => [p.id, p]))
const bySlug = new Map(products.map((p) => [p.slug, p]))

export const getProduct = (id: string) => byId.get(id)
export const getProductBySlug = (slug: string) => bySlug.get(slug)

export function productsIn(category?: string, sub?: string): Product[] {
  return products.filter((p) => (!category || p.category === category) && (!sub || p.sub === sub))
}

export function related(p: Product, n = 8): Product[] {
  const same = products.filter((x) => x.sub === p.sub && x.id !== p.id)
  const cat = products.filter((x) => x.category === p.category && x.sub !== p.sub)
  return [...same, ...cat].slice(0, n)
}

export function searchProducts(q: string): Product[] {
  const needle = q.trim().toLowerCase()
  if (!needle) return []
  const subNames = new Map<string, string>()
  for (const c of categories)
    for (const s of c.children) subNames.set(s.slug, `${s.name.en} ${s.name.gu} ${c.name.en} ${c.name.gu}`.toLowerCase())
  return products.filter((p) =>
    `${p.name.en} ${p.name.gu} ${p.purity} ${subNames.get(p.sub) ?? ''}`.toLowerCase().includes(needle),
  )
}
