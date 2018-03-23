import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const root = path.resolve(__dirname, '../../..');
const publicPath = path.join(root, 'dist');
const entryFile = path.join(root, 'src/renderer/renderer.js');

export default {
	entry: entryFile,

	output: {
		path: publicPath,
		publicPath: __dirname,
		filename: 'renderer.prod.js'
	},

	mode: 'production',

	target: 'electron-renderer',

	devtool: 'source-map',

	node: {
		__dirname: true,
		__filename: true
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					plugins: [
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
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new CopyWebpackPlugin([
			{
				from: path.join(root, 'src/main/index.html'),
				to: publicPath
			},
			{
				from: path.join(root, 'package.json'),
				to: publicPath
			},
			{
				from: path.join(root, 'data'),
				to: path.join(publicPath, 'data')
			}
		])
	]
};
