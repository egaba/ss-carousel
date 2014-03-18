var gulp = require('gulp');
var concat = require('gulp-concat');
var es6ModuleTranspiler = require('gulp-es6-module-transpiler');
var handlebars = require('gulp-ember-handlebars');
var stylus = require('gulp-stylus');

var paths = {
  tmp: './tmp',
  dest: './dist'
};

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
    .pipe(es6ModuleTranspiler({
       type: 'amd'
    }))
    .pipe(concat('components.js'))
    .pipe(gulp.dest(paths.tmp));
});

// Compile Initializer
gulp.task('compile-initializer', function() {
  gulp.src('./lib/initializer.js')
    .pipe(es6ModuleTranspiler({
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

// Consolidate
gulp.task('concat-scripts', ['compile-all'], function() {
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

// Bundle
gulp.task('bundle', ['compile-all', 'concat-scripts']);

// Watch
gulp.task('watch', function() {
  gulp.watch('./lib/**/*.*', ['bundle']);
});

gulp.task('default', ['bundle', 'watch']);
