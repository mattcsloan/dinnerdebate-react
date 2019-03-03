var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');

gulp.task('default', ['templates'], function() {
  // place code for your default task here
  console.log('gulp process completed');
});

gulp.task('templates', function() {
  // convert jade files to html
  var YOUR_LOCALS = {};

});