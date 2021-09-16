'use-strict'

const { src, dest, watch, parallel, series } = require('gulp')
const del = require('del')
const browsersync = require('browser-sync').create()
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')
const concat = require('gulp-concat')
const babel = require('gulp-babel')

const PATHS = {
	MODULES:'./src/modules',
	VENDOR: './src/vendor',
	IN: './src',
	OUT: './htdocs'
}

function clean () {
	return del(
		PATHS.OUT
	)
}

function browserSync () {
	browsersync.init({
		server: {
			baseDir: './htdocs/',
			open: true
		}
	})

	watch(PATHS.OUT  + '/css/*.css').on('change', browsersync.reload)
}

function css() {
	return src(PATHS.MODULES + '/*.styl')
		.pipe(stylus())
		.pipe(concat('main.css'))
		.pipe(dest(PATHS.OUT + '/css'))
}


function js() {
	return src(PATHS.MODULES + '/**/*.js')
		.pipe(concat('main.js'))
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(dest(PATHS.OUT + '/js'))
}

function html() {
	return src(PATHS.IN + '/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(dest(PATHS.OUT))
}

function jquery() {
	return src('node_modules/jquery/dist/jquery.min.js')
		.pipe(dest(PATHS.OUT + '/js'))
}

function fonts() {
	return src(PATHS.IN + '/fonts/*.*')
		.pipe(dest(PATHS.OUT + '/fonts/'));
}

function img() {
	return src(PATHS.IN + '/img/**/*.*')
		.pipe(dest(PATHS.OUT + '/img/'));
}

function vendorJs() {
	return src(PATHS.VENDOR + '/**/*.js')
		.pipe(concat('vendor.js'))
		.pipe(dest(PATHS.OUT + '/js'))
}

function vedorCss() {
	return src([PATHS.VENDOR + '/css/normalize.css', PATHS.VENDOR + '/**/*.css'])
		.pipe(concat('vendor.css'))
		.pipe(dest(PATHS.OUT + '/css'))
}


function watchFiles() {
	watch(PATHS.IN  + '/**/*.pug', html)
	watch(PATHS.MODULES  + '/**/*.styl', css)
	watch(PATHS.MODULES  + '/**/*.js', js)
}

const vendor = series(vendorJs, vedorCss)
const build = series(clean, parallel(css, js, html, fonts, img, jquery, vendor))

exports.default = parallel(browserSync, watchFiles)
exports.css = css
exports.js = js
exports.img = img
exports.fonts = fonts
exports.vendor = vendor
exports.jquery = jquery
exports.build = build
exports.html = html
exports.browserSync = browserSync
exports.clean = clean