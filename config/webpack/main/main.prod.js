import path from 'path';
import webpack from 'webpack';

const root = path.resolve(__dirname, '../../..');
const publicPath = path.join(root, 'dist');
const entryFile = path.join(root, 'src/main/main.js');

export default {
	entry: entryFile,

	output: {
		path: publicPath,
		filename: 'main.bundle.js'
	},

	mode: 'production',

	target: 'electron-main',

	devtool: 'source-map',

	node: {
		__dirname: false,
		__filename: false
	},

	module: {
		rules: [
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
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
};
