'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    minifyCss = require('gulp-minify-css'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path');

gulp.task('default', ['sass', 'watch', 'browser-sync', 'html', 'js','postcss']);

gulp.task('sass', function () {
    gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('postcss', function(){
    gulp.src('css/style.css')
        .pipe(autoprefixer('last 3 versions'))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('css/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('html', function () {
    gulp.src('./')
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js', function () {
    gulp.src('js.*.js')
        .pipe(reload({
            stream: true
        }));
});
gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('css/**/*.css', ['postcss']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('./*.html', ['html']);
});


gulp.task('svg', function(){
    return gulp
        .src('img/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('img/'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./",
        },
        open: false
    });
});