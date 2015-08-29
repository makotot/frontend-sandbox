var gulp = require('gulp'),
  del = require('del'),
  eslint = require('gulp-eslint'),
  runSequence = require('run-sequence');


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

gulp.task('default', ['clean', 'lint'], function () {
});
