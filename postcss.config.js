/**
 * @author zhangyi
 * @date 2018/5/25
 */
module.exports = {
    plugins: [
        require('postcss-import'),
        require('autoprefixer')({browsers:["last 2 versions", "ie 8", "ie 9", "> 1%"]})
        // require('autoprefixer')({ browsers: ['last 2 versions'] })
    ]
};
