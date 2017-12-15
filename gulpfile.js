/**
 * Gulpfile Setup for Building project
 * Following tutorial at: https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const jshint = require('gulp-jshint');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const pump = require('pump');

// The default task when the 'gulp' command is executed
gulp.task('default', ['watch']);

// Add a new task to copy HTML from source folder to distribution folder
gulp.task('copy-html', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Check JavaScript for errors
gulp.task('jshint', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Concat and minify JS
gulp.task('build-js', (callback) => {
    pump([
        gulp.src('src/js/**/*.js'),
        concat('bundle.js'),
        gutil.env.type === 'production' ? uglify() : gutil.noop(),
        gulp.dest('dist/js')
    ],
        callback
    );
});

// Process SASS files
gulp.task('build-css', (callback) => {
    pump([
        gulp.src('src/scss/**/*.scss'),
        sass(),
        gutil.env.type === 'production' ? cleancss(): gutil.noop(),
        gulp.dest('dist/css')
    ],
        callback
    );

});

// Watch files for changes
gulp.task('watch', () => {
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/js/**/*.js', ['jshint']);
    gulp.watch('src/scss/**/*.scss', ['build-css']);
    gulp.watch('src/js/**/*.js', ['build-js']);
});

