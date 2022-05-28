import * as colors from './src/index.js'
import chroma from 'chroma-js'
import './styles.css'

const $ = document.querySelector.bind(document)

function* range(min, max, step = 1){
  if (max === undefined){
    max = min
    min = 0
  }
  for (let i = min; i < max; i += step){
    yield i
  }
}

const $create = (cls) => {
  const div = document.createElement('div')
  div.className = cls
  return div
}

function createLayout(colors, el) {
  el.appendChild(
    Object.entries(colors).filter(c => c[1].hex).reduce((wrap, [name, color]) => {
      const div = $create('c')
      div.style.setProperty('--color', color)
      div.addEventListener('click', () => {
        navigator.clipboard
          .writeText(color.hex())
          .catch(console.error)
      })
      div.innerHTML = `
      <p>
      ${name}<br>
      (${color.get('lch.h').toFixed(1)})<br>
      ${color.hex()}
      </p>`
      wrap.appendChild(div)
      return wrap
    }, $create('colors'))
  )
}

function createPalette(palette, title) {
  const light = $create('light')
  light.style.backgroundColor = colors.all.light
  createLayout(palette, light)
  const dark = $create('dark')
  dark.style.backgroundColor = colors.all.dark
  createLayout(palette, dark)
  const el = $create('palette')
  el.appendChild(light)
  el.appendChild(dark)
  el.setAttribute('data-title', title)
  $('.palettes').appendChild(el)
}

//https://css.land/lch/

const mapValues = (obj, fn) => Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [k, fn(v, k, obj)])
)

createPalette(colors.hues, 'hues')
createPalette(colors.neutrals, 'neutrals')
createPalette(colors.status, 'status')
createPalette(colors.roygbv, 'roygbv')
createPalette(colors.pastels, 'pastels')

createPalette(colors.obvious, 'obvious')

createPalette(
  Object.fromEntries(
    chroma.scale([colors.all.dark, colors.all.light])
      .colors(11)
      .map(c => chroma(c))
      .map((c, i) => [i, c])
  ),
  'Dark to light'
)

createPalette(
  Object.fromEntries(
    chroma.bezier([colors.roygbv.red, colors.roygbv.green, colors.roygbv.blue])
      .scale()
      .colors(11)
      .map(c => chroma(c))
      .map((c, i) => [i, c])
  ),
  'Bezier scale'
)

createPalette(
  Object.fromEntries(
    chroma.bezier([colors.all.tomato, colors.all.seafoam, colors.all.blue])
      .scale()
      .colors(11)
      .map(c => chroma(c))
      .map((c, i) => [i, c])
  ),
  'Bezier scale light'
)

createPalette(
  mapValues(colors.hues, c => colors.matchWith(c, colors.all.red)),
  'Match to red'
)

createPalette(
  mapValues(colors.hues, c => colors.matchWith(c, colors.all.blue)),
  'Match to blue'
)


for (let l = 40; l < 100; l += 20){
  createPalette(
    mapValues(colors.hues, c => c.set('lch.l', l)),
    'Lightness: ' + l
  )
}

for (const [name, color] of Object.entries(colors.all)){
  createPalette(
    Object.fromEntries(
      Array.from(range(10, 110, 10)).map(l => ['lum: ' + l, color.set('lch.l', l)])
    ),
    name
  )
}
