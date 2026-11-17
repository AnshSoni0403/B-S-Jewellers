/**
 * Image registry. All stock photos come from Unsplash (free licence) and are
 * placeholders — replace the IDs/URLs with your own product photography later.
 * Keeping every photo here means the swap is a one-file change.
 *
 * An entry can be:
 *  - an Unsplash photo id ("1601121141418-c1caa10a2a0b" or "flagged/photo-…")
 *  - any absolute URL (e.g. your CDN / server uploads) — used as-is.
 */

const BASE = 'https://images.unsplash.com/'

/** Build a CDN URL at a given width (Unsplash/Pexels resize and compress on the fly). */
export function img(id: string, w = 600, h?: number): string {
  if (/^https?:\/\//.test(id)) return id
  if (id.startsWith('px:')) {
    const n = id.slice(3)
    const size = h ? `&w=${w}&h=${h}&fit=crop` : `&w=${w}`
    return `https://images.pexels.com/photos/${n}/pexels-photo-${n}.jpeg?auto=compress&cs=tinysrgb${size}`
  }
  const path = BASE + (id.startsWith('flagged/') ? id : `photo-${id}`)
  const size = h ? `&w=${w}&h=${h}` : `&w=${w}`
  return `${path}?auto=format&fit=crop${size}&q=70`
}

/** Responsive srcset for <img>. `ratio` = height / width for a fixed crop. */
export function srcSet(id: string, widths: number[], ratio?: number): string | undefined {
  if (/^https?:\/\//.test(id)) return undefined
  return widths.map((w) => `${img(id, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ')
}

// ---------- Lifestyle / model photography ----------
// Clean, jewellery-led studio-style shots (Pexels / Unsplash, free licence).
export const models = {
  // hero panels
  emeraldBride: 'px:17298688', // kundan choker with emerald, neutral background
  haarBride: 'px:1162983', // ivory-gold kasavu saree, temple jewellery, gajra
  veilBride: 'px:14825057', // jhumka + gajra, side profile
  // supporting
  redLehenga: 'px:12726134', // smiling, green silk saree, full gold set
  kundanBride: 'px:19647000', // floral necklace on white top
  navyBride: 'px:8886975', // gold bangles in hand
  navyBride2: 'px:19647000',
  silkSaree: 'px:27575174', // orange silk saree, poised portrait
  tikkaPortrait: 'px:14051004',
  orangeLehenga: 'px:13530465', // minimal pendant
  softChain: 'px:6153885', // fine chain on ivory chiffon
  // legacy aliases
  heroBride: 'px:17298688',
  brideRed: '1768341395956-fed92f537228',
  brideNath: 'px:14051004',
  twoModels: 'px:14051004',
  goldSaree: 'px:6153885',
  mehndiHands: 'flagged/photo-1557695742-6ddd2cd63a5d',
  mehndiRings: '1770346279037-89853a3e8c60',
  coupleHands: '1770823218239-996df9afcff0',
  garba: '1605029271330-95970e826af3',
  durga: '1602997097326-3e1684978f87',
  diya: '1605378400585-ae0030add9dd',
  goldBangles: '1617191880362-aac615de3c26',
  templeNecklace: '1601121141461-9d6647bca1ed',
  layeredChains: '1590548784585-643d2b9f2925',
  pendantModel: '1601821765780-754fa98637c1',
  hoopModel: '1600721391776-b5cd0e0048f9',
  necklaceModel: '1611652022419-a9419f74343d',
  chainModel: '1633810542706-90e5ff7557be',
  ringModel: '1620656798579-1984d9e87df7',
  silverMix: '1606760227091-3dd870d97f1d',
  silverPendant: '1598560917505-59a3ad559071',
} as const

// ---------- Product photography pools (per sub-category slug) ----------
export const pools: Record<string, string[]> = {
  necklaces: ['1601121141418-c1caa10a2a0b', '1768341395956-fed92f537228', '1601121141461-9d6647bca1ed', 'px:17298688', '1768341395956-fed92f537228', '1599459183200-59c7687a0275'],
  earrings: ['1617038220319-276d3cfab638', '1626784215021-2e39ccf971cd', '1617038260897-41a1f14a8ca0', '1629224316810-9d8805b95e76', '1535556116002-6281ff3e9f36', '1603974372039-adc49044b6bd'],
  bangles: ['1617191880362-aac615de3c26', '1586878340506-af074f2ee999', '1611591437281-460bfbe1220a'],
  rings: ['1543294001-f7cd5d7fb516', '1611955167811-4711904bb9f8', '1608042314453-ae338d80c427', '1631982690223-8aa4be0a2497', '1603561591411-07134e71a2a9', '1622398925373-3f91b1e275f5'],
  chains: ['1590548784585-643d2b9f2925', '1633810542706-90e5ff7557be', '1611085583191-a3b181a88401', '1610694955371-d4a3e0ce4b52'],
  mangalsutra: ['1599643478518-a784e5dc4c8f', '1610694955371-d4a3e0ce4b52', '1611085583191-a3b181a88401'],
  pendants: ['1601821765780-754fa98637c1', '1599643478518-a784e5dc4c8f', '1620656798579-1984d9e87df7'],
  bracelets: ['1602173574767-37ac01994b2a', '1596944924616-7b38e7cfac36', '1611591437281-460bfbe1220a'],
  nosepins: ['px:14051004', '1626784215021-2e39ccf971cd'],
  coins: ['1586878340506-af074f2ee999', '1622398925373-3f91b1e275f5'],

  'silver-payal': ['1573408301185-9146fe634ad0', '1619119069152-a2b331eb392a', '1606760227091-3dd870d97f1d'],
  'silver-toe-rings': ['1627293509201-cd0c780043e6', '1605100804763-247f67b3557e'],
  'silver-rings': ['1605100804763-247f67b3557e', '1602751584552-8ba73aad10e1', '1627293509201-cd0c780043e6'],
  'silver-earrings': ['1588444650733-d0767b753fc8', '1535632066927-ab7c9ab60908', '1630019852942-f89202989a59'],
  'silver-pendants': ['1588444837495-c6cfeb53f32d', '1598560917505-59a3ad559071', '1589128777073-263566ae5e4d', '1636103952204-0b738c225264', '1506630448388-4e683c67ddb0'],
  'silver-bracelets': ['1619119069152-a2b331eb392a', '1573408301185-9146fe634ad0'],
  'silver-pooja': ['1605378400585-ae0030add9dd', '1606760227091-3dd870d97f1d'],
  'silver-coins': ['1606760227091-3dd870d97f1d', '1515562141207-7a88fb7ce338'],
  'silver-gifting': ['1515562141207-7a88fb7ce338', '1636103952204-0b738c225264', '1589128777073-263566ae5e4d'],

  'bridal-sets': ['px:19647000', 'px:17298688', 'px:14825057', '1768341395956-fed92f537228', '1768341395956-fed92f537228', 'px:8886975'],
  groom: ['1543294001-f7cd5d7fb516', '1586878340506-af074f2ee999', '1633810542706-90e5ff7557be'],
  'mehndi-haldi': ['1770346279037-89853a3e8c60', 'flagged/photo-1557695742-6ddd2cd63a5d', '1617191880362-aac615de3c26'],
  diwali: ['1601121141418-c1caa10a2a0b', '1617191880362-aac615de3c26', '1626784215021-2e39ccf971cd'],
  navratri: ['1630019852942-f89202989a59', '1603974372039-adc49044b6bd', '1573408301185-9146fe634ad0'],
  'akshaya-tritiya': ['1586878340506-af074f2ee999', '1601121141461-9d6647bca1ed', '1599643478518-a784e5dc4c8f'],
  dhanteras: ['1622398925373-3f91b1e275f5', '1606760227091-3dd870d97f1d', '1611955167811-4711904bb9f8'],
  'raksha-bandhan': ['1602173574767-37ac01994b2a', '1596944924616-7b38e7cfac36', '1636103952204-0b738c225264'],
  'karva-chauth': ['px:13530465', '1599643478518-a784e5dc4c8f', '1608042314453-ae338d80c427'],
}
