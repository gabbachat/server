var gulp  = require('gulp'),
    mocha = require('gulp-mocha'),
    cover = require('gulp-coverage'),
    $     = require('gulp-load-plugins')();

// RUN TESTS

gulp.task('test', function () {
    gulp.src(['tests/**/*.js'], { read: false })
        .pipe($.blanket({
            instrument:['mime/mime.js'],
            captureFile: 'coverage.html',
            reporter: 'html-cov'
        }));
});


gulp.task('testy', ['test', 'watch']);

gulp.task('test', function (cb) {
  return gulp.src('tests/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
        .pipe($.exit());
});


gulp.task('watch', function (cb) {
    gulp.watch('tests/**/*.js', ['test']);
});



// NODEMON
gulp.task('default', function (cb) {

  var called = false;
  return $.nodemon({
    script: 'server.js',
    ext: 'js, jade, hbs, nj, styl, sass, less, css',
    ignore: ['README.md', 'node_modules', '.DS_Store'],
    'execMap': {
      'js': 'iojs'
    }
  }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  });
});
