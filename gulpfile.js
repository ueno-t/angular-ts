'use strict'
var gulp = require('gulp');
var tsc  = require('gulp-typescript');
var del  = require('del');

/* common config */
var config = {
  paths: {
    src: './src',
    build: './build',
    release: './release'
  },
  files: {
    tsconfig: "./tsconfig.json"
  }
};

/* tasks */
gulp.task('clean', function(callback) {
  del(config.paths.release, callback);
});

gulp.task('compile', function() {
  var tsconf = require(config.files.tsconfig);
  gulp.src(tsconf.filesGlob)
    .pipe(tsc(tsconf.compilerOptions))
    .pipe(gulp.dest(config.paths.release));
});

gulp.task('watch', function() {
  var tsconf = require(config.files.tsconfig);
  gulp.watch(tsconf.filesGlob, ['compile']);
});
