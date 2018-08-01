const merge = require('webpack-merge');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const config = require('./webpack.config.js');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: './dist',
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
            test: /\.twig$/,
            loader: 'twig-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './app/index.twig.js',
            filename: 'index.html'
        })
    ]
};

module.exports = merge(config, devConfig);
