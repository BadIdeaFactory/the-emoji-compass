const fs = require('fs')
const bs = require('browser-sync').create()
const sass = require('node-sass')

bs.init({
  server: './',
  files: [
    'index.html',
    'scripts.js',
    'styles.css',
    '*.png',
    {
      match: 'styles.scss',
      fn: function (event, file) {
        // windows systems has trouble reading edited scss files sometimes
        // this hack with setTimeout seems to work. see here:
        // https://github.com/sass/node-sass/issues/1894#issuecomment-309051121
        setTimeout(function () {
          sass.render({
            file: file,
            outFile: 'styles.css'
          }, function (err, result) {
            if (err) return console.error(err)
            fs.writeFile('styles.css', result.css, function (err) {
              if (err) return console.error(err)
            })
          })
        }, 100)
      }
    }
  ]
})
