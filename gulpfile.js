const 	gulp = require("gulp"),
	    sass = require("gulp-sass"),
	    postcss = require("gulp-postcss"),
	    autoprefixer = require("autoprefixer"),
	    cssnano = require("cssnano"),
	    sourcemaps = require("gulp-sourcemaps"),
        uglify = require('gulp-uglify');

const paths = {
    styles: {
        src: 'src/_sass/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: ['src/_scripts/main.js','src/_scripts/plugins.js'],
        dest: 'dist/js/'
    },
    files: {
        src: ['src/**/*.*', '!src/_*/**/*'],
        dest: 'dist/'
    },
    sourcemaps: '../../maps'
};

function moveFiles() {
    return (
        gulp.src(paths.files.src)
            .pipe(gulp.dest(paths.files.dest))
    );
}
exports.moveFiles = moveFiles;

function style() {
    return (
        gulp.src(paths.styles.src)
 			.pipe(sourcemaps.init())
            .pipe(sass())
            	.on("error", sass.logError)
            // .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write(paths.sourcemaps))
            .pipe(gulp.dest(paths.styles.dest))
    );
}
exports.style = style;

function script() {
    return (
        gulp.src(paths.scripts.src)
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write(paths.sourcemaps))
            .pipe(gulp.dest(paths.scripts.dest))

    );
}
exports.script = script;

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
