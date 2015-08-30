var gulp = require('gulp'),
  del = require('del'),
  eslint = require('gulp-eslint'),
  ejs = require('gulp-ejs'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  assemble = require('assemble'),
  gulpAssemble = require('gulp-assemble'),
  extname = require('gulp-extname');


gulp.task('clean', function (done) {

  del(['./build'], done);
});

gulp.task('lint', function () {
  gulp
    .src(['./src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

assemble.data({site: {title: 'sandbox'}});
assemble.data(['./src/data/*.{json,yml}']);
assemble.layouts(['./src/layouts/*.hbs']);
assemble.partials(['./src/partials/*.hbs']);

gulp.task('template', function () {

  return gulp
    .src('./src/pages/*.hbs')
    .pipe(gulpAssemble(assemble, {
      layout: 'default'
    }))
    .pipe(extname())
    .pipe(gulp.dest('./build'));

//  return gulp
//    .src(['./src/templates/**/*.ejs', '!./src/templates/**/_*.ejs'])
//    .pipe(ejs({
//    }))
//    .pipe(gulp.dest('./build'))
});

gulp.task('serve', function () {

  runSequence('clean', 'lint', 'template', function () {
    browserSync.init({
      server: './build',
      open: false
    });
  });

  gulp
    .watch(['./build/*.html'])
    .on('change', browserSync.reload);

  gulp.watch(['./src/**/*.hbs'], ['template']);
});


gulp.task('default', ['clean', 'lint'], function () {
});
