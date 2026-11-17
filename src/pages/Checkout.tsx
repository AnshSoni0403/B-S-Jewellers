import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { m } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { useLang } from '@/i18n/LangContext'
import type { StringKey } from '@/i18n/strings'
import { useShop } from '@/store/ShopContext'
import { digits, inr, num } from '@/lib/format'
import { ease } from '@/lib/motion'
import { Breadcrumbs, SmartImage } from '@/components/ui'
import { OrderSummary, useCartLines } from './Cart'
import './pages.css'

type Fields = 'name' | 'phone' | 'email' | 'line1' | 'city' | 'state' | 'pin'

const FIELD_LABEL: Record<Fields, StringKey> = {
  name: 'co.name',
  phone: 'co.phone',
  email: 'co.email',
  line1: 'co.line1',
  city: 'co.city',
  state: 'co.state',
  pin: 'co.pin',
}

function validate(v: Record<Fields, string>): Partial<Record<Fields, StringKey>> {
  const e: Partial<Record<Fields, StringKey>> = {}
  if (!v.name.trim()) e.name = 'co.required'
  if (!/^[6-9]\d{9}$/.test(v.phone.replace(/\D/g, '').slice(-10))) e.phone = 'co.invalidPhone'
  if (!v.line1.trim()) e.line1 = 'co.required'
  if (!v.city.trim()) e.city = 'co.required'
  if (!v.state.trim()) e.state = 'co.required'
  if (!/^\d{6}$/.test(v.pin.trim())) e.pin = 'co.invalidPin'
  return e
}

export default function Checkout() {
  const { t, tx, lang } = useLang()
  const { clearCart } = useShop()
  const { lines, subtotal } = useCartLines()
  const [values, setValues] = useState<Record<Fields, string>>({
    name: '',
    phone: '',
    email: '',
    line1: '',
    city: '',
    state: lang === 'gu' ? 'ગુજરાત' : 'Gujarat',
    pin: '',
  })
  const [errors, setErrors] = useState<Partial<Record<Fields, StringKey>>>({})
  const [placed, setPlaced] = useState(false)

  if (placed) {
    return (
      <div className="container page">
        <m.div
          className="empty empty--page success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: ease.smooth }}
        >
          <CheckCircle2 size={56} strokeWidth={1.2} />
          <h1>{t('co.success')}</h1>
          <p>{t('co.successBody')}</p>
          <Link to="/" className="btn">
            {t('nf.cta')}
          </Link>
        </m.div>
      </div>
    )
  }

  if (lines.length === 0) return <Navigate to="/cart" replace />

  const set = (k: Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.querySelector<HTMLInputElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }
    // TODO(backend): POST /orders { customer: values, lines: cart }
    clearCart()
    setPlaced(true)
    window.scrollTo({ top: 0 })
  }

  const input = (k: Fields, opts: { type?: string; inputMode?: 'numeric' | 'tel' | 'email'; autoComplete?: string; full?: boolean } = {}) => (
    <div className={`field ${opts.full ? 'field--full' : ''}`}>
      <label htmlFor={`co-${k}`}>{t(FIELD_LABEL[k])}</label>
      <input
        id={`co-${k}`}
        name={k}
        className="input"
        type={opts.type ?? 'text'}
        inputMode={opts.inputMode}
        autoComplete={opts.autoComplete}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `co-${k}-err` : undefined}
      />
      {errors[k] && (
        <span className="field-error" id={`co-${k}-err`}>
          {t(errors[k]!)}
        </span>
      )}
    </div>
  )

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('cart.title'), to: '/cart' }, { label: t('co.title') }]} />
      <h1 className="page__title">{t('co.title')}</h1>
      <form className="checkout" onSubmit={submit} noValidate>
        <div className="checkout__form">
          <fieldset className="co-block">
            <legend>{t('co.contact')}</legend>
            <div className="form-grid">
              {input('name', { autoComplete: 'name', full: true })}
              {input('phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
              {input('email', { type: 'email', inputMode: 'email', autoComplete: 'email' })}
            </div>
          </fieldset>
          <fieldset className="co-block">
            <legend>{t('co.address')}</legend>
            <div className="form-grid">
              {input('line1', { autoComplete: 'street-address', full: true })}
              {input('city', { autoComplete: 'address-level2' })}
              {input('state', { autoComplete: 'address-level1' })}
              {input('pin', { inputMode: 'numeric', autoComplete: 'postal-code' })}
            </div>
          </fieldset>
          <fieldset className="co-block">
            <legend>{t('co.payment')}</legend>
            <label className="pay-opt is-active">
              <input type="radio" name="pay" defaultChecked />
              <span>{t('co.payStore')}</span>
            </label>
            <label className="pay-opt is-disabled">
              <input type="radio" name="pay" disabled />
              <span>{t('co.payOnline')}</span>
              <em>{t('co.soon')}</em>
            </label>
          </fieldset>
        </div>

        <OrderSummary subtotal={subtotal}>
          <ul className="summary__lines">
            {lines.map((l) => (
              <li key={l.id + (l.size ?? '')}>
                <span className="summary__img">
                  <SmartImage id={l.p.images[0]} alt="" ratio={1} widths={[96, 160]} sizes="56px" />
                  <b>{num(l.qty, lang)}</b>
                </span>
                <span className="summary__name">
                  {tx(l.p.name)}
                  <small>{digits(l.p.purity, lang)}</small>
                </span>
                <span>{inr(l.unit * l.qty, lang)}</span>
              </li>
            ))}
          </ul>
          <button type="submit" className="btn btn--block">
            {t('co.place')}
          </button>
        </OrderSummary>
      </form>
    </div>
  )
}
