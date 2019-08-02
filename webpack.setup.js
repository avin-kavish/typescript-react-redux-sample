const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const resolve = () => ({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
        'react-dom': '@hot-loader/react-dom',
    }
})

const styleLoader = ({extract = false} = {}) => (
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            extract ? require('mini-css-extract-plugin').loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            {
                loader: 'sass-loader',
                options: {
                    includePaths: ['node_modules'],
                },
            },
        ],
    })

const preSourceMapLoader = () => ({
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader"
})

const tsJsLoaders = () => ([
    {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!react-spring)/,
        use: {
            loader: 'babel-loader',
        },
    },
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        }
    }
])

const imageLoaders = () => ({
    test: /\.(png|svg|jpe?g|gif)$/,
    use: [
        'file-loader'
    ]
})

const clean = () => new CleanWebpackPlugin()

const tsCheck = (options) => new ForkTsCheckerWebpackPlugin({
    memoryLimit: 4096,
    ...options
})

module.exports = {
    resolve,
    styleLoader,
    tsJsLoaders,
    preSourceMapLoader,
    clean,
    tsCheck,
    imageLoaders
}
