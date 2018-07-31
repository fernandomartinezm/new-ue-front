const merge = require('webpack-merge');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const config = require('./webpack.config.js');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode: 'production',
    plugins: [
        new cleanWebpackPlugin('dist', {watch: false}),
        new HtmlWebPackPlugin({
            template: './app/index.html',
            filename: 'index.html'}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
};

module.exports = merge(config, prodConfig);
