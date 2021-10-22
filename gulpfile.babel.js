import {series, parallel} from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import {scriptsBuild, scriptsWatch} from './gulp/tasks/scripts';
import {pugBuild, pugWatch} from './gulp/tasks/pug';
import {cssBuild, cssWatch} from './gulp/tasks/stylus';

config.setEnv();


export const build = series(
	clean,
	parallel(
		scriptsBuild,
		pugBuild,
		cssBuild
	)
);

export const watch = series(
	build,
	server,
	parallel(
		scriptsWatch,
		pugWatch,
		cssWatch
	)
);

exports.css = cssBuild;
