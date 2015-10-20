'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    csscomb = require('gulp-csscomb'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    minifyCss = require('gulp-minify-css'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    clean = require('gulp-clean'),
    copy = require('gulp-copy'),
    changed = require('gulp-changed'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    path = require('path');

gulp.task('default', ['sass', 'watch', 'browser-sync', 'change', 'js']);


gulp.task('sass', function () {
    gulp.src('source/sass/style.scss')
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: ['last 3 versions']
        })]))
        .pipe(csscomb())
        .pipe(gulp.dest('build/css/'))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('change', function () {
    return gulp.src('source/*.html')
        .pipe(changed('build'))
        .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
    return gulp.src('source/js/*.js')
        .pipe(changed('build'))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('minify', function () {
    return gulp.src('build/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('build', function () {
    runSequence('clean', ['sass', 'html'],
        'minify',
        'copy',
        'image');
});

gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('source/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('build/'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('clean', function () {
    return gulp.src('build', {
            read: false
        })
        .pipe(clean());
});

gulp.task('copy', function () {
    return gulp
        .src('source/fonts/*.*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('image', function () {
    return gulp.src('source/img/**/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});



gulp.task('watch', function () {
    gulp.watch('source/sass/**/*.scss', ['sass']);
    gulp.watch('source/*.html', ['change']);
    gulp.watch('source/js/*.js', ['js']);
});


gulp.task('svg', function () {
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
            };
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('img/'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './build'
        },
        open: false
    });
});
