const srcPath = 'src'
const destPath = 'htdocs'

const config = {
	src: {
		root: srcPath,
		pug: `${srcPath}/pug`,
		modules: `${srcPath}/modules`,
		fonts: `${srcPath}/assests/fonts`,
		img: `${srcPath}/assests/img`,
	},
	dest: {
		root: destPath,
		html: destPath,
		css: `${destPath}/css`,
		js: `${destPath}/js`,
		fonts: `${destPath}/fonts`,
		img: `${destPath}/img`,
	},
	setEnv() {
		this.isProd = process.argv.includes('--prod');
		this.isDev = !this.isProd;
	}
}

export default config

