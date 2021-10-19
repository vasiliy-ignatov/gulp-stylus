// import fs from 'fs';
import {gulp, watch, dest} from 'gulp';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import gulpif from 'gulp-if';
import config from '../config';

export const scriptsBuild = () => {
	browserify(`${config.src.modules}/main.js`, { debug: true })
		.transform('babelify', { presets: ['@babel/preset-env'] })
		.bundle()
		.on('error', function browseryfyError(error){
			console.log(error.stack);
			this.emmit('end');
		})
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(gulpif(config.isDev, sourcemaps.init({ loadMaps: true })))
		.pipe(gulpif(config.isProd, uglify()))
		.pipe(gulpif(config.isDev, sourcemaps.write()))
		.pipe(dest(config.dest.js))
		// .pipe(fs.createWriteStream(`${config.dest.js}/main.js`));
}

export const scriptsWatch = () => watch(`${config.src.modules}/**/*.js`, scriptsBuild)
