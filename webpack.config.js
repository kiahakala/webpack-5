const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	//mode defined here so no need for that in package.json
	mode: 'development',
	//make an object of entry for multiple entries. Name will be used in output
	entry: {
		bundle: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true,
		assetModuleFilename: '[name][ext]'
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true
	},
	devtool: 'source-map', 
	//set up loaders
	//any file with the named file extension uses the loaders in the array
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						]
					}
				}
			},
			{
				//i means case sensitive
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack 5',
			filename: 'index.html',
			template: 'src/template.html'
		}),
		new BundleAnalyzerPlugin(),
	]
}