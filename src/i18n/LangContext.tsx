import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L, Lang } from '@/data/types'
import { strings, type StringKey } from './strings'

const STORAGE_KEY = 'bks-lang'
const DEFAULT_LANG: Lang = 'gu'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  /** Translate a UI key. */
  t: (key: StringKey) => string
  /** Pick the current language from a bilingual data value. */
  tx: (value: L | undefined) => string
}

const Ctx = createContext<LangCtx | null>(null)

function readStored(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'en' || v === 'gu' ? v : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title =
      lang === 'gu' ? 'ભરતકુમાર એન્ડ સન્સ જ્વેલર્સ' : 'Bharatkumar & Sons Jewellers'
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* private mode — ignore */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'gu' ? 'en' : 'gu')), [])
  const t = useCallback((key: StringKey) => strings[key][lang], [lang])
  const tx = useCallback((v: L | undefined) => (v ? v[lang] : ''), [lang])

  const value = useMemo(() => ({ lang, setLang, toggle, t, tx }), [lang, setLang, toggle, t, tx])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLang(): LangCtx {
  const v = useContext(Ctx)
  if (!v) throw new Error('useLang must be used inside <LangProvider>')
  return v
}
