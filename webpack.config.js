const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const source_path = path.join(__dirname, "/assets/");
const destination_path = path.join(__dirname, "/dist/");
const plugins = [
    new copyWebpackPlugin([
        {
            context: `${destination_path}fonts/`,
            from: `${source_path}fonts`,
            to: `${destination_path}fonts/`,
        },
        {
            context: `${destination_path}images/`,
            from: `${source_path}images`,
            to: `${destination_path}images/`
        }
    ]),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
];

module.exports = {
    entry: {
        app: [
            './assets/js/index.js',
            './assets/css/index.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{ loader: "html-loader", options: { minimize: true } }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins
};