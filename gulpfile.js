const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function goSass() {
	return gulp
		.src('app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
}

function goAutoprefixer() {
	return gulp
		.src('app/css/*.css')
		.pipe(
			autoprefixer({
				// overrideBrowserslist: [ 'last 2 versions' ],
				cascade: false
			})
		)
		.pipe(gulp.dest('app/autoprefix-css'));
	// .pipe(browserSync.stream());
}

function goServer() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch('app/scss/**/*.scss', goSass);
	gulp.watch('app/css/*.css', goAutoprefixer);
	gulp.watch([ 'app/*.html', 'app/js/**/*.js' ]).on('change', browserSync.reload);
}

// exports.goSass = goSass;
exports.go = goServer;
