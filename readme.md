# Gulp Validated src

Gulp is nice, but I don't like the fact that there's no easy way to confirm that src found at least one file.

This package adds srcN(glob, min, max, isError) to the gulp package.  The glob argument is passed to gulp.src.  A stream reader
is attached to the resulting stream.  This reader counts the number of files on the stream (objects, technically) and, just before the stream closes,
verifies that the number of objects is between min and max (inclusive).  If the number of files read is not between min and max, either a note is displayed
on the console, if isError is false, or an error is added to the stream.

## Example

    const gulp = require('gulp')
    require('gulp-validated-src')(gulp)

    gulp.task('copy exactly one file', function () {
      return gulp.srcN('no file here', 1, 1)
      .pipe(gulp.dest('dist/out.file'))
    })


## License

This library is available under the MIT license.
