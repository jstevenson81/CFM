var gulp = require('gulp'),
    less = require('gulp-less'),
    sourceMaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    flatten = require('gulp-flatten');

gulp.task('less', function () {

    // run a task that compiles less
    return gulp.src(['**/*.less', '!./node_modules/**', '!./src/assets/less/mixins.less', '!./src/assets/less/variables.less'])
        .pipe(less())
        .pipe(sourceMaps.init())
        .pipe(cleanCss())
        .pipe(flatten())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./src/assets/css'));
});

// setup a default task to compile less
gulp.task('default', ['less'], function () {
    gulp.watch('**/*.less', ['less']);
});