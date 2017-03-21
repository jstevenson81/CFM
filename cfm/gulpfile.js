var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function () {

    // run a task that compiles less
    return gulp.src(['**/*.less', '!./node_modules/**', '!./src/assets/less/mixins.less', '!./src/assets/less/variables.less'])
        .pipe(less())
        .pipe(gulp.dest('.'));
});

// setup a default task to compile less
gulp.task('default', ['less'], function() {
    gulp.watch('**/*.less', ['less']);
});