/**
 * @author zhangyi
 * @date 2018/8/24
 */
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseWebpackConfig, {
    mode: 'development',

    devtool: "#source-map",

    // entry: [
    //     `webpack-dev-server/client?http://0.0.0.0:${port}`,
    //     'webpack/hot/dev-server',
    //     `./src/${name}/index.js`
    // ],

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})