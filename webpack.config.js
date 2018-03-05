


var webpack = require('webpack');



module.exports = {
	entry : [
		'./src/stella.js'
	],
	output : {
		path : __dirname,
		filename : 'stella.min.js'
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				exclude : /node_modules/,
				loader : 'babel-loader',
				options : {
					presets : ['es2015']
				}
			}
		]
	}
};
