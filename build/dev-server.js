/**
 * @author zhangyi
 * @date 2018/8/24
 */
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const devWebpackConfig = require('./webpack.dev.config')

const port = 3003;
const options = {
    host: '0.0.0.0',
    stats: { colors: true },
    hot: true,
    noInfo: false,
}

webpackDevServer.addDevServerEntrypoints(devWebpackConfig, options)
// devWebpackConfig.entry.app.unshift("webpack-dev-server/client?http://0.0.0.0:"+ port +"/", "webpack/hot/dev-server")

const compiler = webpack(devWebpackConfig)
const server = new webpackDevServer(compiler, options)

server.listen(port, '0.0.0.0', function (err) {
    console.log('listen')
})

module.exports = server
