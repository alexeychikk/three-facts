// shared config (dev and prod)
const { join, resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = resolve(__dirname, '../../src');
const sharedDir = resolve(srcDir, '../../shared');

module.exports = {
	resolve: {
		alias: {
			'@components': join(srcDir, 'components'),
			'@modules': join(srcDir, 'modules'),
			'@store': join(srcDir, 'store'),
			'@shared': sharedDir
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	context: srcDir,
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader', 'source-map-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'awesome-typescript-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }]
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'sass-loader'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
				]
			}
		]
	},
	plugins: [
		new CheckerPlugin(),
		new HtmlWebpackPlugin({ template: 'index.html.ejs' })
	],
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	performance: {
		hints: false
	}
};
