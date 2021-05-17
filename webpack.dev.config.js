const path = require('path');
//const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        // filename: 'dev-bundle.[contenthash].js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    context: path.resolve(__dirname, 'src'),
    // plugins: [
    //     new HTMLWebpackPlugin({
    //         template: './index.html'
    //     })

    // ],

    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        port: 8100,
        hot: true,
        writeToDisk: true,

    }

};