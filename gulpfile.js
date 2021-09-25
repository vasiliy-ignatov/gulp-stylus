'use-strict'

const { src, dest, watch, parallel, series } = require('gulp')
const del = require('del')
const browsersync = require('browser-sync').create()
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')
const concat = require('gulp-concat')
const babel = require('gulp-babel')

// const PATHS = {
// 	MODULES:'./src/modules',
// 	VENDOR: './src/vendor',
// 	IN: './src',
// 	OUT: './htdocs',
// 	ASSETS: './src/assets'
// }
const config = {
	in: {
		src: './src',
		assets: './src/assets',
		modules: './src/modules'
	},
	out: {
		htdocs: './htdocs',
		assets: './htdocs/assets'
	}
}

function clean () {
	return del(
		config.out.htdocs
	)
}

function browserSync () {
	browsersync.init({
		server: {
			baseDir: './htdocs/',
			open: true
		}
	})

	watch(config.out.assets  + '/css/*.css').on('change', browsersync.reload)
}

function css() {
	return src(config.in.modules + '/*.styl')
		.pipe(stylus())
		.pipe(concat('main.css'))
		.pipe(dest(config.out.assets + '/css'))
}


function js() {
	return src(config.in.src + '/**/*.js')
		.pipe(concat('main.js'))
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(dest(config.out.assets + '/js'))
}

function html() {
	return src(config.in.src + '/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(dest(config.out.htdocs))
}

function jquery() {
	return src('node_modules/jquery/dist/jquery.min.js')
		.pipe(dest(config.out.assets + '/js'))
}

function fonts() {
	return src(config.in.assets + '/fonts/*.*')
		.pipe(dest(config.out.assets + '/fonts/'));
}

function img() {
	return src(config.in.assets + '/img/**/*.*')
		.pipe(dest(config.out.assets + '/img/'));
}

function vendorJs() {
	return src(config.in.assets + '/**/*.js')
		.pipe(concat('vendor.js'))
		.pipe(dest(config.out.assets + '/js'))
}

function vedorCss() {
	return src([config.in.assets + '/vendor/css/normalize.css', config.in.assets + '/vendor/**/*.css'])
		.pipe(concat('vendor.css'))
		.pipe(dest(config.out.assets + '/css'))
}


function watchFiles() {
	watch(config.in.src  + '/**/*.pug', html)
	watch(config.in.src  + '/**/*.styl', css)
	watch(config.in.src  + '/**/*.js', js)
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
