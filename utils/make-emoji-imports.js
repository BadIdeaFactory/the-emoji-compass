const symbols = require('../src/symbols.json')

// Path to emoji assets should be relative to Emoji.js
// Webpack will import each named file during compile time
const BASE_PATH = '../../node_modules/emojione-assets/png/128/'

/**
 * Given the unicode symbol of an emoji, e.g. '1f479', return an import
 * expression with a placeholder variable name and asset path
 *
 * @param {string} title - name of symbol
 * @param {string} code - unicode number
 */
function makeImportString (title, code) {
  const path = '\'' + BASE_PATH + code + '.png\''

  // Codes are strings that begin with numbers but variables do not like
  // beginning with numbers so we prefix it with 'Unicode_'
  return `import Unicode_${code} from ${path}`
}

const imports = symbols.reduce((accumulator, symbol) => {
  if (!symbol.code) return accumulator

  accumulator.push(makeImportString(symbol.title, symbol.code))

  return accumulator
}, [])

// Output all the import statements
console.log(imports.join('\n'))

// Now make statements where all the imports are attached to an object
// (make sure `images` is defined in the code! we don't output it here)
// This makes it possible to dynamically look up the reference to the
// imported image
symbols.forEach((symbol) => {
  if (symbol.code) {
    console.log(`images['${symbol.code}'] = Unicode_${symbol.code}`)
  }
})
