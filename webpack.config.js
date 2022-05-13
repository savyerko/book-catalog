const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = 'development') => {

	const {development, production} = env;

	const getloader = () => {
		return [development ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'];
	}

	const getplugs = () => {
		let arr = [
			new HtmlWebpackPlugin({
				title: 'Каталог книг',
				template: 'index.html'
			})
		];

		if (production) {
			arr.push(new MiniCssExtractPlugin({
			filename: 'main-[hash:8].css'
		}));	
		}

		return arr;
	}

	return {
		mode: development ? 'development' : production && 'production',

		module: {
			rules: [
				{
					test: /\.js$/i,
					exclude: '/node_modules/',
					loader: 'babel-loader'
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					loader: 'file-loader',
					options: {
						outputPath: 'images',
						name: '[name]-[sha1:hash:7].[ext]'
					}
				},
				{
					test: /\.css$/i,
					use: getloader()
				}
			]
		},

		plugins: getplugs(),

		devServer: {
			open: true,
		}
	};
};