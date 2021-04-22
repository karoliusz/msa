var path = require('path');
var mkdirp = require('mkdirp-then');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');

var buildDir = "dist";

gulp.task('init', function () {
  return mkdirp(buildDir)
});

gulp.task('css', gulp.series('init', function () {
  return gulp.src(path.join('css', '*.css'))
    .pipe(concat('msa.css'))
    .pipe(gulp.dest(buildDir));
}));

gulp.task('build-gzip-js', function () {
   return gulp.src(path.join(buildDir, "msa.js"))
     .pipe(gzip({append: false, gzipOptions: { level: 9 }}))
     .pipe(rename("msa.min.gz.js"))
     .pipe(gulp.dest(buildDir));
});

gulp.task('min-css', gulp.series('css', function () {
  return gulp.src(path.join(buildDir,"msa.css"))
    .pipe(rename('msa.min.css'))
    .pipe(gulp.dest(buildDir));
}));

gulp.task('build-gzip-css', gulp.series('min-css', function () {
  return gulp.src(path.join(buildDir, "msa.min.css"))
    .pipe(gzip({append: false, gzipOptions: { level: 9 }}))
    .pipe(rename("msa.min.gz.css"))
    .pipe(gulp.dest(buildDir));
}));

gulp.task('build-gzip', gulp.series('build-gzip-js', 'build-gzip-css'));
gulp.task('build', gulp.series('min-css', 'build-gzip'));
gulp.task('default', gulp.series('build'));
