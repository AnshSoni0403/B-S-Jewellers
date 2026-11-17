import type { Lang } from '@/data/types'

// Gujarati mode renders numbers in Gujarati digits (૧૨,૦૨૫) — a small touch that matters.
const locale = (lang: Lang) => (lang === 'gu' ? 'gu-IN-u-nu-gujr' : 'en-IN')

const cache = new Map<string, Intl.NumberFormat>()
function nf(lang: Lang, opts: Intl.NumberFormatOptions) {
  const key = lang + JSON.stringify(opts)
  let f = cache.get(key)
  if (!f) {
    f = new Intl.NumberFormat(locale(lang), opts)
    cache.set(key, f)
  }
  return f
}

export function inr(n: number, lang: Lang): string {
  return nf(lang, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

export function num(n: number, lang: Lang, digits = 0): string {
  return nf(lang, { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(n)
}

export function grams(n: number, lang: Lang): string {
  return `${num(n, lang, 2)} ${lang === 'gu' ? 'ગ્રામ' : 'g'}`
}

/** Convert any ASCII digits inside a string (e.g. "22K") to Gujarati digits in gu mode. */
export function digits(s: string, lang: Lang): string {
  if (lang !== 'gu') return s
  return s.replace(/[0-9]/g, (d) => '૦૧૨૩૪૫૬૭૮૯'[Number(d)])
}

export function time(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'gu' ? 'gu-IN-u-nu-gujr' : 'en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}
