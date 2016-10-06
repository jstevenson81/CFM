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
    browserify = require('browserify'),
    transform = require('vinyl-source-stream');

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

// Minify compiled CSS
gulp.task('css:minify', ['css:less'], function () {
    return gulp.src(source + 'css/**/**.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(source + 'css'))
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

gulp.task('ts:bundle', ['ts:compile'], function () {

    

});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('vendor:copy', function () {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest(source + 'vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(source + 'vendor/jquery'))

    gulp.src(['node_modules/magnific-popup/dist/*'])
        .pipe(gulp.dest(source + 'vendor/magnific-popup'))

    gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest(source + 'vendor/scrollreveal'))

    gulp.src(['node_modules/animate.css/*.css'])
        .pipe(gulp.dest(source + 'vendor/animatecss'));

    gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest(source + 'vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['css:minify', 'ts:bundle', 'vendor:copy']);

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
