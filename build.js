import * as colors from './src/index.js'
import { writeFile } from 'fs/promises'

async function writeCss(){
  let cssVars = ''
  cssVars += Object.entries(colors.all).map(([name, color]) => {
    return `--ml-color-${name}: ${color.hex()};`
  }).join('\n') + '\n'

  cssVars += Object.entries(colors.roygbv).filter(c => c[1].hex).map(([name, color]) => {
    return `--ml-color-roygbv-${name}: ${color.hex()};`
  }).join('\n') + '\n'

  cssVars += Object.entries(colors.dark).map(([name, color]) => {
    return `--ml-dark-${name}: ${color.hex()};`
  }).join('\n') + '\n'

  cssVars += Object.entries(colors.light).map(([name, color]) => {
    return `--ml-light-${name}: ${color.hex()};`
  }).join('\n') + '\n'

  cssVars += Object.entries(colors.status).map(([name, color]) => {
    return `--ml-status-${name}: ${color.hex()};`
  }).join('\n') + '\n'

  const variables = `/*** Autogenerated from build script ***/\n:root {\n${cssVars}}`
  await writeFile('./styles/variables.css', variables)
}

await writeCss()