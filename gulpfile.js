const 	gulp = require("gulp"),
	    sass = require("gulp-sass"),
	    postcss = require("gulp-postcss"),
	    autoprefixer = require("autoprefixer"),
	    cssnano = require("cssnano"),
	    sourcemaps = require("gulp-sourcemaps"),
        uglify = require('gulp-uglify'),
        gulpif = require('gulp-if'),
        readlineSync = require('readline-sync');

const paths = {
    styles: {
        src: 'src/_sass/*.scss',
        dest: 'build/css/',
        release: 'dist/css/'
    },
    scripts: {
        src: ['src/_scripts/main.js','src/_scripts/plugins.js'],
        dest: 'build/js/',
        release: 'dist/js/'
    },
    files: {
        src: ['src/**/*.*', '!src/_*/**/*'],
        dest: 'build/',
        release: 'dist/'
    },
    sourcemaps: '../../maps'
};

function moveFiles(release = false) {
    const dest = (release == true) ? paths.files.release: paths.files.dest;
    return (
        gulp.src(paths.files.src)
            .pipe(gulp.dest(dest))
    );
}
exports.moveFiles = moveFiles;

function style(release = false) {
    const dest = (release == true) ? paths.styles.release: paths.styles.dest;
    return (
        gulp.src(paths.styles.src)
 			.pipe(sourcemaps.init())
            .pipe(sass())
            	.on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(gulpif(release!=release,sourcemaps.write(paths.sourcemaps)))
            .pipe(gulp.dest(dest))
    );
}
exports.style = style;

function script(release = false) {
    const dest = (release == true) ? paths.scripts.release: paths.scripts.dest;
    return (
        gulp.src(paths.scripts.src)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(gulpif(release!=release,sourcemaps.write(paths.sourcemaps)))
            .pipe(gulp.dest(dest))

    );
}
exports.script = script;

// Standard functions

function watch(){
    gulp.watch(paths.files.src, moveFiles);
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.scripts.src, script);
}
exports.watch = watch

function build(cb){
    moveFiles();
    script();
    style();
    cb();
}
exports.build = build

// Release functions
function confirmRelease(cb) {
    if (readlineSync.keyInYN('Are you sure you want to release?')) {
      return cb();
    }
    console.log('Ok, not releasing.');
    process.exit(1);
}

function release(cb) {
    console.log('////////////////////');
    console.log('// RELEASING CODE //');
    console.log('////////////////////');
    moveFiles(true);
    script(true);
    style(true);
    cb();
}

exports.release = gulp.series(confirmRelease, release);
