import chroma from 'chroma-js'

export const sortByProp = (dict, p) => Object.fromEntries(
  Object.entries(dict)
    .sort((a, b) => a[1].get(p) - b[1].get(p))
)

export const sortByHue = d => sortByProp(d, 'lch.h')
export const sortByChroma = d => sortByProp(d, 'lch.c')
export const sortByLightness = d => sortByProp(d, 'lch.l')

export const matchWith = (color, target) => {
  const h = color.get('lch.h')
  const l = target.get('lch.l')
  const c = target.get('lch.c')
  return chroma.lch(l, c, h)
}

export const all = Object.freeze(sortByHue({
  dark: chroma.lch(9.30, 4.53, 279.70),
  light: chroma.lch(93.75, 3.16, 96.84),
  yellow: chroma.lch(89.63, 49.65, 102.76),
  cyan: chroma.lch(90.33, 50.59, 193.33),
  salmon: chroma.lch(69.36, 50.37, 22.45),
  blue: chroma.lch(70.39, 42.93, 262.58),
  seafoam: chroma.lch(70.06, 44.07, 180.07),
  gold: chroma.lch(69.42, 39.56, 94.10),
  orange: chroma.lch(59.51, 71.15, 68.30),
  tomato: chroma.lch(49.31, 65.84, 38.59),
  violet: chroma.lch(49.39, 77.22, 2.48),
  pine: chroma.lch(50.30, 31.66, 188.77),
  brown: chroma.lch(49.70, 31.40, 59.32),
  clay: chroma.lch(38.94, 14.15, 98.59),
  grey: chroma.lch(39.74, 5.49, 104.78),
  rust: chroma.lch(30.21, 19.63, 33.64),
  beige: chroma.lch(93.28, 11.81, 107.45),
  charcoal: chroma.lch(15.368, 4.6, 260.617),
  ivory: chroma.lch(99.43, 0.86, 55.60),
  red: chroma.lch(44.40, 84.36, 36.26),
}))

export const dark = Object.freeze({
  bg: all.dark,
  aside: all.dark.set('lch.l', 25),
  fg: all.beige,
  muted: all.beige.set('lch.l', 60),
})

export const light = Object.freeze({
  bg: all.light,
  aside: all.light.set('lch.l', 85),
  fg: all.charcoal,
  muted: all.charcoal.set('lch.l', 50),
})

export const status = Object.freeze({
  good: all.seafoam,
  warn: all.orange,
  bad: all.tomato,
  info: all.blue,
})

export const statusDark = Object.freeze({
  good: matchWith(all.seafoam, all.tomato),
  warn: matchWith(all.orange, all.tomato),
  bad: matchWith(all.tomato, all.tomato),
  info: matchWith(all.blue, all.tomato),
})

export const neutrals = Object.freeze(sortByLightness({
  dark: all.dark,
  light: all.light,
  grey: all.grey,
  beige: all.beige,
  ivory: all.ivory,
  charcoal: all.charcoal,
}))

export const hues = Object.fromEntries(
  Object.entries(all)
    .filter(([k]) => !(k in neutrals))
)

const _roygbv = sortByHue({
  red: matchWith(all.red, all.red),
  blue: matchWith(all.blue, all.red),
  violet: matchWith(all.violet, all.red),
  green: matchWith(all.seafoam, all.red),
  orange: matchWith(all.orange, all.red),
  yellow: matchWith(all.gold, all.red),
})

export const roygbv = Object.freeze({
  ..._roygbv,
  list: [
    _roygbv.red,
    _roygbv.orange,
    _roygbv.yellow,
    _roygbv.green,
    _roygbv.blue,
    _roygbv.violet
  ]
})

export const pastels = Object.freeze(sortByHue({
  tomato: all.tomato,
  blue: all.blue,
  violet: all.violet,
  seafoam: all.seafoam,
  yellow: all.yellow,
}))

export const obvious = Object.freeze({
  ...pastels,
  salmon: all.salmon,
  clay: all.clay,
  cyan: all.cyan,
})
