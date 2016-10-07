var
    gulp = require('gulp'),
    tsc = require("gulp-typescript"),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    header = require('gulp-header'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    pkg = require('./package.json'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tslint = require('gulp-tslint'),
    bundle = require('gulp-bundle-assets');

var
    source = 'src/',
    tsProject = tsc.createProject('tsconfig.json');

gulp.task('css:clean', function () {
    del(source + 'css/**/*.css')
});

// Compile LESS files from /less into /css
gulp.task('css:less', ['css:clean'], function () {

    return gulp.src(source + 'less/**/**.less')
        .pipe(less())
        .pipe(gulp.dest(source + 'css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('ts:lint', function () {
    return gulp
        .src(source + 'ts/**/**.ts')
        .pipe(tslint({ formatter: 'verbose' }))
        .pipe(tslint.report());
});

gulp.task('ts:compile', ['ts:lint'], function () {
    var tsResult = gulp
        .src(source + 'ts/**/**.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    tsResult.dts.pipe(gulp.dest(source + 'js'));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(source + 'js'));
});

gulp.task('build:clean', ['css:less', 'ts:compile'], function() {
    del('./dist/**/**');
});

gulp.task('build:bundle', ['build:clean'], function () {

    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('./dist'));

});

// Run everything
gulp.task('default', ['vendor:copy', 'build:bundle']);

// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: '/src'
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'css:minify', 'ts:bundle'], function () {
    gulp.watch(source + 'less/**/**.less', ['css:minify']);
    gulp.watch(source + 'ts/**/**.ts', ['ts:bundle']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch(source + '**.html', browserSync.reload);
    gulp.watch(source + 'js/**/**.js', browserSync.reload);
});
