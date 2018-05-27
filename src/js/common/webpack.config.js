var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//压缩图片
const ImageminPlugin = require('imagemin-webpack-plugin').default;
module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: ['css-loader'] })
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }

    ]
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

      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"production"'
          }
      }),

      new ExtractTextPlugin('style.css'),
      new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } },
          canPrint: true
      }),
      new CopyWebpackPlugin([
          {
              from: './static',
              to: './static'
          },

      ]),
      new ImageminPlugin({
          disable: false,
          pngquant: {
              quality: '60'
          }
      }),
  ]
}

