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

// The default task when the 'gulp' command is executed
gulp.task('default', ['watch']);

// Add a new task to copy HTML from source folder to distribution folder
gulp.task('copyHTML', () => {
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
gulp.task('build-js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest('dist/js'));
});

// Process SASS files
gulp.task('build-css', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest('dist/css'));
});

// Watch files for changes
gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', ['jshint']);
    gulp.watch('src/scss/**/*.js', ['build-css']);
});

