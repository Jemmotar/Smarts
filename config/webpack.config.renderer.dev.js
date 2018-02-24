import path from 'path';
import { spawn } from 'child_process';
import webpack from 'webpack';

const port = process.env.PORT || 8080;
const publicPath = `http://localhost:${port}/dist`;
const entryFile = path.join(__dirname, '../src/client/core/renderer.js');

export default {
	/**
	 * Configure what type of source map should be generated.
	 * Source mapping is a way to map a combined/minified file back to an unbuilt state.
	 * When you query a certain line and column number in your generated JavaScript
	 * you can do a lookup in the source map which returns the original location.
	 * https://webpack.js.org/configuration/devtool/
	 */
	devtool: 'inline-source-map',
	/**
	 * Compile against electron renderer process.
	 * https://webpack.js.org/concepts/targets/
	 */
	target: 'electron-renderer',
	/**
	 * Entry points for compilation with hot reload and patching for react.
	 * https://webpack.js.org/concepts/entry-points/
	 */
	entry: [
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://localhost:${port}/`,
		'webpack/hot/only-dev-server',
		entryFile
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: publicPath,
		filename: 'renderer.dev.js'
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
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					cacheDirectory: true,
					plugins: [
						'react-hot-loader/babel',
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
		 * Enables Hot Module Replacement, otherwise known as HMR.
		 * https://webpack.js.org/plugins/hot-module-replacement-plugin/
		 */
		new webpack.HotModuleReplacementPlugin(),
		/**
		 * This plugin will cause the relative path of the module to be displayed when HMR is enabled.
		 * https://webpack.js.org/plugins/named-modules-plugin/
		 */
		new webpack.NamedModulesPlugin(),
		/**
		 * Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling.
		 * This ensures that no assets are emitted that include errors.
		 * https://webpack.js.org/plugins/no-emit-on-errors-plugin/
		 */
		new webpack.NoEmitOnErrorsPlugin(),
		/**
		 * The DefinePlugin allows you to create global constants which can be configured at compile time.
		 * https://webpack.js.org/plugins/define-plugin/
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		})
	],
	/**
	 * Serves a webpack app. Updates the browser on changes.
	 * This should be used for development only.
	 * https://github.com/webpack/webpack-dev-server
	 */
	devServer: {
		port: port,
		publicPath: publicPath,
		/**
		 * Serving options like gzip compression and hot reload.
		 * https://webpack.js.org/configuration/dev-server/
		 */
		compress: true,
		inline: true,
		hot: true,
		lazy: false,
		/**
		 * With noInfo enabled, messages like the webpack bundle information that are
		 * shown when starting up and after each save, will be hidden.
		 * Errors and warnings will still be shown.
		 */
		noInfo: true,
		/**
		 * The stats option lets you precisely control what bundle information gets displayed.
		 * In this case we care only about errors.
		 * https://webpack.js.org/configuration/stats/
		 */
		stats: 'errors-only',
		/**
		 * HTTP headers allow the client and the server to pass additional information with the request or the response.
		 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
		 */
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		/**
		 * Entry point from witch files should be served.
		 * By default serves index.html file.
		 */
		contentBase: path.join(__dirname, 'dist'),
		/**
		 * Control options related to watching the files.
		 * https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
		 */
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 300,
			poll: 100
		},
		/**
		 * When using the HTML5 History API, the index.html page will be served in place of any 404 responses.
		 * https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
		 */
		historyApiFallback: {
			verbose: true,
			disableDotRule: false
		},
		/**
		 * Provides the ability to execute custom middleware prior to all other middleware internally within the server.
		 * In this case spawns Electron main process if START_MAIN is enabled, see package.json for more details.
		 * https://webpack.js.org/configuration/dev-server/#devserver-before
		 */
		before () {
			if (process.env.START_MAIN) {
				console.log('Staring Main process in dev mode...');
				const proc = spawn(
					'npm',
					[ 'run', 'start-main-dev' ],
					{ shell: true, env: process.env, stdio: 'inherit' }
				);

				// Listen for close and error events
				proc.on('close', (code) => process.exit(code));
				proc.on('error', (spawnError) => console.error(spawnError));
			}
		}
	},
	node: {
		__dirname: true,
		__filename: true
	}
};
