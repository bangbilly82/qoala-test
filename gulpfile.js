var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');

const SRC = './src/styles/**/**/**/*.scss';
const DIST = './src/';

gulp.task('sass', function(){
    gulp.src(SRC)
      .pipe(sass())
      .pipe(csso())
      .pipe(gulp.dest(DIST))
})

gulp.task('default',['sass'], function(){
    gulp.watch(SRC, ['sass']);
    gulp.watch('src/static/js/**/*.js'); 
})