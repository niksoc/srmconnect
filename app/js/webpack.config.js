var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool:'cheap-module-source-map',
    entry: './main.js',
    output: { path: path.join(__dirname,'..','..','static','app','js'), filename: 'bundle.js'},
	/*plugins: [ 
	    new webpack.DefinePlugin({
		'process.env': {
		    'NODE_ENV': JSON.stringify('production')
		}
	    }),
	    new webpack.optimize.UglifyJsPlugin({
		compress: {
		    warnings: false
		}
	    })
	],*/ 
    
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
		    plugins: ['transform-object-rest-spread']
                }
            }
        ]
    }
};
