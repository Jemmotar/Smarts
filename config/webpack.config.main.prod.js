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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		new BabiliPlugin()
	],

	node: {
		__dirname: false,
		__filename: false
	}
};
