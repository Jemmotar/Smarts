import path from 'path';
import webpack from 'webpack';
import BabiliPlugin from 'babili-webpack-plugin';

const publicPath = path.join(__dirname, '../dist');
const entryFile = path.join(__dirname, '../src/client/core/main.js');

export default {
	devtool: 'source-map',

	target: 'electron-main',

	entry: entryFile,

	output: {
		path: publicPath,
		filename: 'main.prod.js'
	},

	module: {
		loaders: [
			{
				/**
				 * Babel is a tool that helps you write code in the latest version of JavaScript.
				 * In this case it is also used to transpile JSX syntax to normal Javascript.
				 * Common settings are included in .babelrc file.
				 * https://github.com/babel/babel
				 * https://github.com/babel/babel-loader
				 */
				test: /\.(js)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						['env', {
							'modules': false,
							'targets': {
								'node': 'current'
							}
						}]
					]
				}
			}
		]
	},
	plugins: [
		/**
		 * The DefinePlugin allows you to create global constants which can be configured at compile time.
		 * https://webpack.js.org/plugins/define-plugin/
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		/**
		 * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
		 * https://github.com/webpack-contrib/babel-minify-webpack-plugin
		 */
		new BabiliPlugin()
	],

	/**
	* Disables webpack processing of __dirname and __filename.
	* If you run the bundle in node.js it falls back to these values of node.js.
	* https://github.com/webpack/webpack/issues/2010
	*/
	node: {
		__dirname: false,
		__filename: false
	}
};
