/**
 * @author zhangyi
 * @date 2018/8/24
 */
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const devMode = process.env.NODE_ENV === 'development'
let cssLoader = [
    { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
    { loader: 'css-loader' },
    {
        loader: 'px2rem-loader',
        options: {
            remUnit: 37.5,
            remPrecision: 8
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: path.join(__dirname, '../build/postcss.config.js')
            }
        }
    }
]
const lessLoader = cssLoader.concat({ loader: 'less-loader'})


module.exports = {

    entry: {
        'app': ['./src/index.js'],
        'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'prop-types'
        ]
    },

    output: {
        path: resolve('dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [resolve('src'), resolve('components'), resolve('sample')],
                exclude: resolve('nodeModules'),
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: resolve('nodeModules'),
                use: cssLoader
            },
            {
                test: /\.less$/,
                exclude: resolve('nodeModules'),
                use: lessLoader
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: `./img/[name].[hash:4].[ext]`
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: `./img/[name].[hash:4].[ext]`
                }
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: `./img/[name].[hash:4].[ext]`
                }
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].[hash:4].css`,
            chunkFilename: `[id].[hash:4].css`,
        }),
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: 'index.html'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],

    optimization: {
        minimizer: devMode ? [] : [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    }
}
