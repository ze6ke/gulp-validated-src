const {Transform} = require('stream')

/**
 * this is a simple transform stream that counts the number of objects passed through the stream and then calls a 
 * callback function right before the stream is closed
 */
class CountFilesInStream extends Transform {
  constructor(options) {
    super(options)
    this.fileCount = 0
    this.callback = options.callback
  }

  _transform(data, encoding, cb) {
    this.fileCount ++
    this.push(data)
    cb()
  }

  _flush(cb) {
    let cbRetval = this.callback(this.fileCount)
    cb(cbRetval)
  }
}

const formatError = (min, max, glob) => (
  `File glob did not match the correct number of files (${min}-${max}):\n--${glob}`
)

const addSrcN = (gulp) => {

  const srcN = (glob, min = 0, max=Infinity, isError=true) => {

    const callAfterCount = (numFiles) => { //this function validates that the number of files SRCed is valid
      //it will be used as the callback in CountfilesInStream
      if(numFiles < min || numFiles > max) {
        //there was a problem and we need to hand back an error
        if(isError) {
          return new Error(formatError(min, max, glob)) //push an error into the stream
        } else {
          console.log(formatError(min, max, glob)) //notify the user on the console
        }
      }
    }

    const myCountStream = new CountFilesInStream({
      callback: callAfterCount,  
      objectMode: true
    })

    const rawStream = gulp.src(glob)

    return rawStream.pipe(myCountStream)
  }

  //store the new validated src function onto the original gulp object
  gulp.srcN = srcN
}

module.exports = addSrcN
