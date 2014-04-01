var gulp              = require('gulp');
var concat            = require('gulp-concat');
var continuousConcat  = require('gulp-continuous-concat');
var transpiler        = require('gulp-es6-module-transpiler');
var handlebars        = require('gulp-ember-handlebars');
var stylus            = require('gulp-stylus');
var watch             = require('gulp-watch');
var qunit             = require('gulp-qunit');

var paths = {
  tmp: './tmp',
  dest: './dist'
};

var errorCode = 0;

// Compile templates (currently only global)
// TODO: change to AMD, gulp-ember-handlebar's AMD exports seem incorrect
gulp.task('compile-templates', function() {
  gulp.src('./lib/templates/*.hbs')
    .pipe(handlebars({
      outputType: 'browser'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.tmp));
});

// Compile components
gulp.task('compile-components', function() {
  gulp.src('./lib/components/*.js')
    .pipe(transpiler({
       type: 'amd'
    }))
    .pipe(concat('components.js'))
    .pipe(gulp.dest(paths.tmp));
});

// Compile Initializer
gulp.task('compile-initializer', function() {
  gulp.src('./lib/initializer.js')
    .pipe(transpiler({
       type: 'globals',
       imports: {
         ember: 'Ember'
       }
    }))
    .pipe(gulp.dest(paths.tmp));
});

// Compile stylesheets
gulp.task('compile-stylesheets', function () {
  gulp.src('./lib/stylesheets/*.styl')
    .pipe(stylus({
      use: ['nib'],
      import: ['nib']
    }))
    .pipe(gulp.dest(paths.dest));
});

// Compile all
gulp.task('compile-all', ['compile-components', 'compile-templates', 'compile-stylesheets', 'compile-initializer']);

// Bundle
gulp.task('bundle', ['compile-all'], function() {
  // Concat Scripts
  // TODO: change to "paths.tmp + '/*.js"
  // until templates can be exported as AMD, order matters
  gulp.src([
      paths.tmp + '/templates.js',
      paths.tmp + '/components.js',
      paths.tmp + '/initializer.js'
    ])
    .pipe(concat('carousel.js'))
    .pipe(gulp.dest(paths.dest));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('./lib/**/*.*', ['compile-all']);

  gulp.src([
      paths.tmp + '/templates.js',
      paths.tmp + '/components.js',
      paths.tmp + '/initializer.js'
    ])
    .pipe(watch())
    .pipe(continuousConcat('carousel.js'))
    .pipe(gulp.dest(paths.dest));
});

// Testing
gulp.task('test', function() {
  return gulp.src('./tests/tests.html')
    .pipe(qunit())
    .on('error', function(err) {
      errorCode = 1;
      process.emit('exit');
    });
});

process.on('exit', function() {
  process.exit(errorCode);
});

gulp.task('default', ['bundle', 'watch']);
