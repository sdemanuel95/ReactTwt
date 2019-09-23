const cssModules = 'modules$importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
	resolve : {
		extensions : ['.js', '.jsx','.css']
	},
	entry: ['./src/index.jsx'],
	output: {
		filename: 'app.js',
		path : __dirname + '/build',
		publicPath : '/'
	},
	module : {
		rules : [
		{ test: /(\.js|jsx)$/, exclude : /node_modules/, loaders: ['babel-loader'] } ,
		{ test: /\.css$/, 
			loader: 'style-loader'},
		{ 	test: /\.css$/,
			loader: 'css-loader',
			options: {
				modules: {
					mode: 'local',
					localIdentName: '[name]__[local]__[hash:base64:5]',
				},
				importLoaders: true,
			}
		},
		]
},


	devServer : {
		host : '0.0.0.0',
		port:8080,
		inline: true
	},
	
	plugins : [
		new HtmlWebPackPlugin({ template : './src/assets/index.html' }),
		new ExtractTextPlugin('style.css', { allChunks:true})
	]
}