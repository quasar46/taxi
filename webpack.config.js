const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = {
	cache: false,
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		assetModuleFilename: path.join('images', '[name][ext]'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|gif|mp4)$/i,
				type: 'asset/resource',
				generator: {
					filename: path.join('assets/images', '[name][ext]'),
				},
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: path.join('assets/icons', '[name][ext]'),
				},
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]'
				}
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pug/index.pug'),
			filename: 'index.html',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pug/catalog.pug'),
			filename: 'catalog.html',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pug/news.pug'),
			filename: 'news.html',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pug/new.pug'),
			filename: 'new.html',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pug/about.pug'),
			filename: 'about.html',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pug/franshiza.pug'),
			filename: 'franshiza.html',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pug/contacts.pug'),
			filename: 'contacts.html',
		}),
		new FileManagerPlugin({
			events: {
				onStart: {
					delete: ['dist'],
				},
				onEnd: {
					copy: [
						{
							source: path.join('src', 'static'),
							destination: 'dist',
						},
					],
				},
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	devServer: {
		watchFiles: path.join(__dirname, 'src'),
		port: 9009,
	},
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							['svgo', { name: 'preset-default' }],
						],
					},
				},
			}),
		],
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
};