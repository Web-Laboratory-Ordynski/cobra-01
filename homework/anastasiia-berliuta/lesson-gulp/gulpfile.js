var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');

gulp.task('pug', function() {
    return gulp.src("src/*.pug")
    // это нашла в интернете, вообще не понимаю, почему, но именно так у меня получилось компилировать паг в хтмл красиво
        .pipe(pug({pretty: '\t'}))
        .pipe(gulp.dest("build/"))
  });

gulp.task('style', function(){
  return gulp.src('src/style/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('build/style'))
});

gulp.task('images', function(){
  return gulp.src('src/img/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'))
});


gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
    .pipe(gulp.dest('build/fonts'))
  })
