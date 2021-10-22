import {src, watch, dest} from 'gulp';
import gulpif from 'gulp-if';
import config from '../config';
import stylus from 'gulp-stylus';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';


export const cssBuild = () => (
	src(`${config.src.modules}/*.styl`)
		.pipe(plumber())
		.pipe(gulpif(config.isDev, sourcemaps.init()))
		.pipe(stylus())
		.pipe(gulpif(config.isProd, autoprefixer()))
		.pipe(gulpif(config.isProd, cleanCSS()))
		.pipe(gulpif(config.isDev, sourcemaps.write()))
		.pipe(dest(config.dest.css))
);

export const cssWatch = () => watch(`${config.src.modules}/**/*.styl`, cssBuild);
