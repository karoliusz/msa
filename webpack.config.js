var path = require('path');
var webpack = require('webpack');
var prod = process.argv.indexOf('-p') >= 0;

module.exports = {
    entry: './src/index_webpack.mjs',
    output: {
        path: __dirname,
        filename: 'dist/msa.js'
    },
    module: {
        rules: [
            {   test: /(\.js)|(\.mjs)$/,
                loader: 'babel-loader'
            },
            { test: /\.css$/,
                loader: "style-loader!css-loader" 
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            MSA_VERSION: JSON.stringify(require("./package.json").version)
        }),
    ],
    // require other ES6 files (experimental)
    resolve: {
      modules: [
        "node_modules",
        path.resolve(__dirname),
      ],
      alias: {
        "bio.io": 'node_modules/bio.io/src/index'
      }
    },
};

var w = module.exports;

// only executed with -p
if (prod) {
    w.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                collapse_vars: true,
                drop_console: true
            },
            sourceMap: true
        })
    );
}
