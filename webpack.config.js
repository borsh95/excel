/* eslint-disable max-len */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production';
	const isDev = !isProd;

	const filename = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

	const jsLoaders = () => {
		const loaders = [
			{
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins: ['@babel/plugin-proposal-class-properties']
				}
			}
		];

		return loaders;
	};

	const plugins = () => {
		const base = [
			new HtmlWebpackPlugin({
				template: './index.html'
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'src/assets'),
						to: path.resolve(__dirname, 'dist/assets')
					}
				],
			}),
			new MiniCssExtractPlugin({
				filename: filename('css'),
			})
		];

		if (isDev) {
			base.push(new ESLintPlugin());
		}

		return base;
	};

	return {
		context: path.resolve(__dirname, 'src'),
		mode: 'development',
		entry: {
			main: './assets/js/index.js',
		},

		resolve: {
			extensions: ['.js'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@core': path.resolve(__dirname, 'src', 'core'),
			}
		},

		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: filename('js'),
			clean: true,
		},

		devServer: {
			contentBase: path.join(__dirname, 'src'),
			hot: true,
			port: 3000,
			open: true,
			watchContentBase: true,
		},

		plugins: plugins(),
		devtool: isDev ? 'source-map' : false,
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {}
						},
						'css-loader',
						'sass-loader'
					],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: jsLoaders()
				}
			]
		}
	};
};
