import {series, parallel} from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import {scriptsBuild, scriptsWatch} from './gulp/tasks/scripts';
import {pugBuild, pugWatch} from './gulp/tasks/pug';

config.setEnv();


export const build = series(
	clean,
	parallel(
		scriptsBuild,
		pugBuild
	)
);

export const watch = series(
	build,
	server,
	parallel(scriptsWatch, pugWatch)
);
