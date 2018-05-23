var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StringReplacePlugin = require('string-replace-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
            extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [
            {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({use:['css-loader']})
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
            // ,
            // {
            //     test: /semantic-ui-css\.css$/,
            //     loader: StringReplacePlugin.replace({
            //         replacements: [{
            //             pattern: /https\:\/\/fonts\.googleapis\.com[^\']+/ig,
            //             replacement: function (match, p1, offset, string) {
            //                 return 'data:text/css,*{}'
            //             }
            //         }]
            //     })
            // }

        ],
    },
    devtool: 'source-map',
    plugins: [
        // 加入 html 模板任务
        new HtmlWebpackPlugin({
            // 模板文件
            template: 'src/index.html',
            // 打包后文件名称，会自动放到 output 指定的 dist 目录
            filename: 'index.html'
        }),

        new ExtractTextPlugin('common.css'),
    ]
}
