'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const log = require('gulplog')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const merge = require('merge-stream')
const clean = require('gulp-clean')

gulp.task('clean', function () {
  return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task('copy-resources', function () {
  return merge([
    gulp.src('./webfonts/*').pipe(gulp.dest('./dist/webfonts')),
    gulp.src('./css/all.min.css').pipe(gulp.dest('./dist/css')),
    gulp.src('./images/*').pipe(gulp.dest('./dist/images')),
    gulp.src('./browser-polyfill.min.js').pipe(gulp.dest('./dist')),
    gulp.src('./item.js').pipe(gulp.dest('./dist')),
    gulp.src('./manifest.json').pipe(gulp.dest('./dist')),
    gulp.src('./model.js').pipe(gulp.dest('./dist')),
    gulp.src('./popup.html').pipe(gulp.dest('./dist'))
  ])
})

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './popup.js',
    debug: true
  })

  return b.bundle()
    .pipe(source('popup-bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
  // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function () {
  return gulp.src('style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.parallel('copy-resources', 'javascript', 'sass'))

gulp.task('rebuild', gulp.series('clean', 'build'))

gulp.task('default', gulp.series('build'))
