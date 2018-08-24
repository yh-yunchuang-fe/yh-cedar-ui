/**
 * @author zhangyi
 * @date 2018/8/24
 */
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseWebpackConfig, {
    mode: 'production',

    devtool: 'none',

    // entry: [
    //     `./src/${name}/index.js`
    // ]
})