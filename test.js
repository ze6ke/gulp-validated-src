/*global describe, it*/
const {expect} = require('chai')

const gulp = require('gulp')
const addSrcN = require('./index.js')

addSrcN(gulp)

describe('srcN', function () {
  const globs = [['no matching file'], ['one matching file', 'test.js'], ['many matching files', '*']]
  const minMax = [[0,0], [0,Infinity], [1, Infinity], [2, Infinity]]
  const isErrors = [true, false, undefined]

  globs.map((glob, globPosition) => {
    minMax.map((minMax) => {
      isErrors.map((isError) => {
        //globPosition lines up with the number of files it will match (0, 1, or 2+)
        const shouldGiveError = (globPosition < minMax[0] || globPosition > minMax[1])
          && isError !== false

        const description = (shouldGiveError ? 'does give an ' : 'does not give an ') + 
          `error on ${glob[0]}, min=${minMax[0]}, max=${minMax[1]}, and isError=${isError}`
        it(description, (done) => {
          let threwError = false
          let theStream = gulp.srcN(glob, minMax[0], minMax[1], isError)

          theStream.on('error', () => {
            threwError = true
          })
            .on('finish', () => {
              expect(threwError).to.equal(shouldGiveError)
              done()
            })
        })
      })
    })
  })
})


