// Updated gulpfile for the following article: https://www.smashingmagazine.com/2018/07/pattern-library-first-css/

'use strict';

const gulp = require('gulp');
const fractal = require('./fractal.config.js');
const logger = fractal.cli.console;
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const clean = require('gulp-clean');
const fs = require('fs');
const newfile = require('gulp-file');
const tap = require('gulp-tap');

function cleanjs(done) {
  return gulp.src('public', { allowEmpty: true }).pipe(
    tap(function (file) {
      var fileName = 'bundle.js';
      var contents = '';
      return newfile(fileName, contents).pipe(gulp.dest('public/assets/js/'));
    })
  );
  done();
}

function js(cb) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join('\n')));
      }
      resolve();
    });
  });
}

function copy(done) {
  return gulp
    .src(['src/data/**/*', 'src/assets/images/**/*'], {
      base: 'src',
    })
    .pipe(gulp.dest('public'));
  done();
}

function scss(done) {
  return gulp
    .src(['src/assets/scss/**/*.scss'])
    .pipe(customPlumber('Error running Sass'))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('public/assets/css'));
  done();
}

function watch(done) {
  gulp.watch(['src/assets/images/**/*'], gulp.series(copy));
  gulp.watch(['ui/**/*.scss', 'src/assets/scss/**/*.scss'], gulp.series(scss));
  gulp.watch(['ui/**/*.js', 'src/assets/js/**/*.js'], gulp.series(cleanjs, js));
  done();
}

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || 'Error running Gulp',
      message: 'Error: <%= error.message %>',
    }),
  });
}

function fractal_start(done) {
  const server = fractal.web.server({
    sync: true,
  });
  server.on('error', (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
  done();
}

gulp.task(
  'default',
  gulp.series(cleanjs, copy, fractal_start, scss, js, watch)
);
