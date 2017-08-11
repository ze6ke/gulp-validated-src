# Gulp Validated src

Gulp is nice, but I don't like the fact that there's no easy way to confirm that src found at least one file.

This package adds srcN(glob, min=0, max=Infinity, isError=true) to the gulp package.  The glob argument is passed to gulp.src.  A stream reader
is attached to the resulting stream.  This reader counts the number of files on the stream (objects, technically) and, just before the stream closes,
verifies that the number of objects is between min and max (inclusive).  If the number of files read is not between min and max, either a note is displayed
on the console, if isError is false, or an error is added to the stream.



## Example

    const gulp = require('gulp')
    require('gulp-validated-src')(gulp)

    //This example wants to see at least 1 file and the glob won't 
    //find one.  srcN will throw an error onto the stream.  This 
    //is the most common use case
    gulp.task('copy exactly one file', function () {
      return gulp.srcN('find 0 files', 1)
      .pipe(gulp.dest('target/'))
    })


## License

This library is available under the MIT license.
