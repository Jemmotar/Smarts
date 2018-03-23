import path from 'path';
import { spawn } from 'child_process';
import webpack from 'webpack';

const port = process.env.PORT || 8080;
const publicPath = `http://localhost:${port}/dist`;
const root = path.resolve(__dirname, '../../..');
const entryFile = path.join(root, 'src/renderer/renderer.js');

export default {
	entry: [
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://localhost:${port}/`,
		'webpack/hot/only-dev-server',
		entryFile
	],

	output: {
		path: path.join(root, 'dist'),
		publicPath: publicPath,
		filename: 'renderer.dev.js'
	},

	mode: 'development',

	target: 'electron-renderer',

	devtool: 'inline-source-map',

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
					cacheDirectory: true,
					plugins: [
						'react-hot-loader/babel',
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],

	devServer: {
		port: port,
		publicPath: publicPath,
		compress: true,
		inline: true,
		hot: true,
		lazy: false,
		noInfo: true,
		stats: 'errors-only',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		contentBase: path.join(__dirname, 'dist'),
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 300,
			poll: 100
		},
		historyApiFallback: {
			verbose: true,
			disableDotRule: false
		},
		before () {
			// Spawns Electron main process if START_MAIN is enabled, see package.json for more details.
			if (process.env.START_MAIN) {
				console.log('');
				console.log(' Staring Main process in dev mode...');
				const proc = spawn(
					'npm',
					[ 'run', 'dev-main' ],
					{ shell: true, env: process.env, stdio: 'inherit' }
				);

				// Listen for close and error events
				proc.on('close', (code) => process.exit(code));
				proc.on('error', (spawnError) => console.error(spawnError));
			}
		}
	}
};
