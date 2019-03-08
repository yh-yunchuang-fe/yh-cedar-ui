const path = require('path')
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let cssLoader = [
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

getCssEntryArray = (dir) => {
    
    let entryArr = {}
    let files = fs.readdirSync(dir)

    if (files) {
        result = files.map((file) => {
            let filePath = path.join(dir, file);
            if(file.indexOf('.') == 0){ 
                return
            }
            if (fs.statSync(filePath).isDirectory()) {
                let lessPath = path.resolve(dir, file + '/index.less')
            
                if(fs.existsSync(lessPath)) {
                    entryArr[file] = lessPath
                }
            }
        });
    }
    console.log(entryArr)
    return entryArr
}

getJSEntryArray = (dir) => {
    
    let entryArr = {}
    let files = fs.readdirSync(dir)

    if (files) {
        result = files.map((file) => {
            let filePath = path.join(dir, file);
            if(file.indexOf('.') == 0){ 
                return
            }
            if (fs.statSync(filePath).isDirectory()) {
                let jsPath = path.resolve(dir, file + '/index.js')

                if(fs.existsSync(jsPath)) {
                    entryArr[file] = jsPath
                }
            } else {
                let fileName = file.split('.')[0]
                entryArr[fileName] = path.resolve(dir, fileName)
            }
        });
    }
    console.log(entryArr)
    return entryArr
}

module.exports = [{
    entry: getCssEntryArray('components'),
    output: {
        path: path.join(__dirname, '../', 'dists/'),
        filename: '[name]/index.css',
    },

    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: lessLoader
                })
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 8192,
            //         name: `./img/[name].[hash:4].[ext]`
            //     }
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'file-loader',
            //     options: {
            //         limit: 8192,
            //         name: `./img/[name].[hash:4].[ext]`
            //     }
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dists']
        }),
        new ExtractTextPlugin("[name]/index.css")
    ]
}, {
    entry: getJSEntryArray('components'),
    output: {
        path: path.join(__dirname, '../', 'dists/'),
        filename: '[name]/index.js',
    },

    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.join(__dirname, '..', 'node_modules'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'babel-preset-react', 'babel-preset-stage-0']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: cssLoader
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: lessLoader
                })
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
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: ['dists']
        // }),
        new ExtractTextPlugin("[name]/index.css")
    ]
}]