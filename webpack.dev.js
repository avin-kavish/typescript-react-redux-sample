const {
    resolve,
    tsJsLoaders,
    preSourceMapLoader,
    clean,
    tsCheck,
    styleLoader,
    imageLoaders
} = require('./webpack.setup')
const {HotModuleReplacementPlugin} = require('webpack')
const speedMeasurer = new (require("speed-measure-webpack-plugin"))()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


const devel = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.js',
    resolve: resolve(),
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `[name].js`,
    },
    module: {
        rules: [
            ...tsJsLoaders(),
            styleLoader(),
            imageLoaders()
        ],
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        public: 'http://localhost:8080',
        historyApiFallback: true,
        overlay: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'src/index.html'}),
        clean(),
        tsCheck({async: true}),
        new HotModuleReplacementPlugin()
    ]
}

module.exports = speedMeasurer.wrap(devel)

