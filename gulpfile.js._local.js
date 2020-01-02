const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const watch = require('gulp-watch');


gulp.task('styles', () => {
    return gulp.src('sass/**/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('./css/'));
});

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));

function stream() {
	gulp.watch('styles/*.scss', styles)
}

exports.stream = stream;

gulp.task('stream1', function () {
    // Endless stream mode
    return watch('scss/**/*.scss') // , { ignoreInitial: false }
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('./css/'));
});

gulp.task('callback', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('css/**/*.css', function () {
        gulp.src('css/**/*.css')
            .pipe(gulp.dest('build'));
    });
});


