import browserSync from 'browser-sync';
import config from '../config';

const server = (callback) => {
	browserSync.create().init({
		server: {
			baseDir: config.dest.root,
		},
		open: false,
		notify: false,
		files: [
			`${config.dest.html}/*.html`,
			`${config.dest.css}/*.css`,
			`${config.dest.js}/*.js`,
			{
				match: `${config.dest.img}/**/*`,
				fn() {
					this.reload();
				}
			}
		]
	});

	callback();
};

export default server;
