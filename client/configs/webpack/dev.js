// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');

const PORT = 8000;

module.exports = merge(commonConfig, {
	mode: 'development',
	entry: [
		'react-hot-loader/patch', // activate HMR for React
		`webpack-dev-server/client?http://localhost:${PORT}`,// bundle the client for webpack-dev-server and connect to the provided endpoint
		'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
		'./index.tsx' // the entry point of our app
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true,
		hot: true, // enable HMR on the server,
		port: PORT
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // enable HMR globally
		new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
	]
});
