import path from 'path';
import webpack from 'webpack';
import BabiliPlugin from 'babili-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const publicPath = path.join(__dirname, '../dist');
const entryFile = path.join(__dirname, '../src/client/core/renderer.js');

export default {
	devtool: 'source-map',

	target: 'electron-renderer',

	entry: entryFile,

	output: {
		path: publicPath,
		publicPath: __dirname,
		filename: 'renderer.prod.js'
	},

	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					plugins: [
						'babel-plugin-root-import',
						'transform-object-rest-spread',
						'transform-private-underscore'
					],
					presets: [
						'react',
						['env', {
							'modules': false,
							'targets': {
								'browsers': ['last 2 versions']
							}
						}]
					]
				}
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.css$/, loader: 'style-loader!css-loader'
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
		new BabiliPlugin(),
		/**
		 * Copies individual files or entire directories to the build directory.
		 * https://github.com/webpack-contrib/copy-webpack-plugin
		 */
		new CopyWebpackPlugin(
			[
				{
					from: path.join(__dirname, '../src/client/core/index.html'),
					to: publicPath
				}
			]
		)
	],
	node: {
		__dirname: true,
		__filename: true
	}
};
