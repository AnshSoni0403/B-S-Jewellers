import type { Category, L } from './types'
import { models, pools } from './images'

/**
 * Category tree. To add a sub-category: add an entry to `children`, give it an
 * image pool in images.ts, and list its slug in one of the `groups`.
 * When the admin panel exists this file is replaced by an API call.
 */

const first = (slug: string) => pools[slug]?.[0] ?? models.heroBride

export const categories: Category[] = [
  {
    slug: 'gold',
    name: { gu: 'સોનું', en: 'Gold' },
    tagline: {
      gu: '૨૨ કેરેટ અને ૧૮ કેરેટ હોલમાર્ક સોનાના આભૂષણો',
      en: 'BIS hallmarked 22K and 18K gold jewellery',
    },
    hero: models.haarBride,
    tone: 'gold',
    children: [
      { slug: 'necklaces', name: { gu: 'હાર અને નેકલેસ', en: 'Necklaces' }, image: first('necklaces') },
      { slug: 'earrings', name: { gu: 'કાનની બુટ્ટી', en: 'Earrings' }, image: first('earrings') },
      { slug: 'bangles', name: { gu: 'બંગડી અને કડાં', en: 'Bangles & Kadas' }, image: first('bangles') },
      { slug: 'rings', name: { gu: 'વીંટી', en: 'Rings' }, image: first('rings') },
      { slug: 'chains', name: { gu: 'ચેઈન', en: 'Chains' }, image: models.layeredChains },
      { slug: 'mangalsutra', name: { gu: 'મંગળસૂત્ર', en: 'Mangalsutra' }, image: first('mangalsutra') },
      { slug: 'pendants', name: { gu: 'પેન્ડન્ટ', en: 'Pendants' }, image: first('pendants') },
      { slug: 'bracelets', name: { gu: 'બ્રેસલેટ', en: 'Bracelets' }, image: first('bracelets') },
      { slug: 'nosepins', name: { gu: 'નથ અને ચૂંક', en: 'Nose Pins & Nath' }, image: first('nosepins') },
      { slug: 'coins', name: { gu: 'સોનાના સિક્કા', en: 'Gold Coins' }, image: first('coins') },
    ],
    groups: [
      { title: { gu: 'આભૂષણો', en: 'Jewellery' }, slugs: ['necklaces', 'earrings', 'bangles', 'rings', 'chains'] },
      { title: { gu: 'વધુ', en: 'More' }, slugs: ['mangalsutra', 'pendants', 'bracelets', 'nosepins', 'coins'] },
    ],
  },
  {
    slug: 'silver',
    name: { gu: 'ચાંદી', en: 'Silver' },
    tagline: {
      gu: '૯૨.૫ સ્ટર્લિંગ ચાંદી — પાયલથી પૂજાના વાસણ સુધી',
      en: '92.5 sterling silver — from payal to pooja silverware',
    },
    hero: models.silverMix,
    tone: 'silver',
    children: [
      { slug: 'silver-payal', name: { gu: 'પાયલ અને ઝાંઝર', en: 'Payal & Anklets' }, image: first('silver-payal') },
      { slug: 'silver-toe-rings', name: { gu: 'વીંછિયા', en: 'Toe Rings' }, image: first('silver-toe-rings') },
      { slug: 'silver-rings', name: { gu: 'ચાંદીની વીંટી', en: 'Silver Rings' }, image: first('silver-rings') },
      { slug: 'silver-earrings', name: { gu: 'ચાંદીની બુટ્ટી', en: 'Silver Earrings' }, image: first('silver-earrings') },
      { slug: 'silver-pendants', name: { gu: 'પેન્ડન્ટ અને ચેઈન', en: 'Pendants & Chains' }, image: models.silverPendant },
      { slug: 'silver-bracelets', name: { gu: 'કડાં અને બ્રેસલેટ', en: 'Kadas & Bracelets' }, image: first('silver-bracelets') },
      { slug: 'silver-pooja', name: { gu: 'પૂજાની ચાંદી', en: 'Pooja Silverware' }, image: first('silver-pooja') },
      { slug: 'silver-coins', name: { gu: 'ચાંદીના સિક્કા', en: 'Silver Coins' }, image: first('silver-coins') },
      { slug: 'silver-gifting', name: { gu: 'ભેટ સોગાદ', en: 'Gifting' }, image: first('silver-gifting') },
    ],
    groups: [
      { title: { gu: 'આભૂષણો', en: 'Jewellery' }, slugs: ['silver-payal', 'silver-toe-rings', 'silver-rings', 'silver-earrings', 'silver-pendants'] },
      { title: { gu: 'ઘર અને ભેટ', en: 'Home & Gifting' }, slugs: ['silver-bracelets', 'silver-pooja', 'silver-coins', 'silver-gifting'] },
    ],
  },
  {
    slug: 'wedding-festive',
    name: { gu: 'લગ્ન અને તહેવાર', en: 'Wedding & Festive' },
    tagline: {
      gu: 'દુલ્હન સેટથી દિવાળીની ખરીદી સુધી — દરેક શુભ પ્રસંગ માટે',
      en: 'From bridal sets to Diwali shopping — for every auspicious occasion',
    },
    hero: models.veilBride,
    tone: 'emerald',
    children: [
      { slug: 'bridal-sets', name: { gu: 'દુલ્હન સેટ', en: 'Bridal Sets' }, image: models.kundanBride },
      { slug: 'groom', name: { gu: 'વરરાજા માટે', en: 'For the Groom' }, image: first('groom') },
      { slug: 'mehndi-haldi', name: { gu: 'મહેંદી અને પીઠી', en: 'Mehndi & Haldi' }, image: models.mehndiRings },
      { slug: 'diwali', name: { gu: 'દિવાળી', en: 'Diwali' }, image: models.diya, note: { gu: 'ઓક્ટોબર – નવેમ્બર', en: 'Oct – Nov' } },
      { slug: 'navratri', name: { gu: 'નવરાત્રી', en: 'Navratri' }, image: '1629224316810-9d8805b95e76', note: { gu: 'સપ્ટેમ્બર – ઓક્ટોબર', en: 'Sep – Oct' } },
      { slug: 'dhanteras', name: { gu: 'ધનતેરસ', en: 'Dhanteras' }, image: first('dhanteras'), note: { gu: 'દિવાળી પહેલાં', en: 'Before Diwali' } },
      { slug: 'akshaya-tritiya', name: { gu: 'અખાત્રીજ', en: 'Akshaya Tritiya' }, image: models.goldBangles, note: { gu: 'એપ્રિલ – મે', en: 'Apr – May' } },
      { slug: 'raksha-bandhan', name: { gu: 'રક્ષાબંધન', en: 'Raksha Bandhan' }, image: first('raksha-bandhan'), note: { gu: 'ઓગસ્ટ', en: 'August' } },
      { slug: 'karva-chauth', name: { gu: 'કરવા ચોથ', en: 'Karva Chauth' }, image: models.orangeLehenga, note: { gu: 'ઓક્ટોબર', en: 'October' } },
    ],
    groups: [
      { title: { gu: 'લગ્ન', en: 'Wedding' }, slugs: ['bridal-sets', 'groom', 'mehndi-haldi'] },
      { title: { gu: 'તહેવાર', en: 'Festivals' }, slugs: ['diwali', 'navratri', 'dhanteras', 'akshaya-tritiya', 'raksha-bandhan', 'karva-chauth'] },
    ],
  },
]

export const occasions: { slug: string; name: L }[] = [
  { slug: 'wedding', name: { gu: 'લગ્ન', en: 'Wedding' } },
  { slug: 'festive', name: { gu: 'તહેવાર', en: 'Festive' } },
  { slug: 'daily', name: { gu: 'રોજિંદા', en: 'Daily Wear' } },
  { slug: 'office', name: { gu: 'ઓફિસ', en: 'Office Wear' } },
  { slug: 'gifting', name: { gu: 'ભેટ', en: 'Gifting' } },
]

export function getCategory(slug?: string) {
  return categories.find((c) => c.slug === slug)
}

export function getSub(sub?: string) {
  for (const c of categories) {
    const s = c.children.find((x) => x.slug === sub)
    if (s) return { category: c, sub: s }
  }
  return undefined
}
