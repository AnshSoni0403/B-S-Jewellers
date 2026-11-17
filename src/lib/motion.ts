/** Motion tokens — one source of truth for durations and easing. */
export const ease = {
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
}

export const dur = { fast: 0.18, normal: 0.35, slow: 0.7 }

/** Cheap low-end device check: shorten/disable heavier motion on weak hardware. */
export const isLowEnd: boolean = (() => {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { deviceMemory?: number }
  if (nav.deviceMemory !== undefined) return nav.deviceMemory <= 2
  return (nav.hardwareConcurrency ?? 8) <= 4
})()

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export const riseItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: dur.normal + 0.1, ease: ease.smooth } },
}
