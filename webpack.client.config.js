const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BaseConf = require('./webpack.config');



module.exports = BaseConf.mergeConf({
    entry: {
        client:"./src/app/index.tsx",
        vendor: [
            'react',
            'react-dom',
            'styled-components'
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },

    devServer: {
        port: 8081,
        host: '0.0.0.0',
        inline: true,
        hot: true,
        contentBase: 'dist/',
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: 'src/', from: '**/*.html'},
            { context: 'src/', from: '**/*.css'}
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin(['vendor']),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.

});