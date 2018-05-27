
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const commonConfig = require('./base.js')
module.exports = (env) => {
  return webpackMerge(commonConfig, {
    plugins: [
      new CleanWebpackPlugin(['../dist']),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new UglifyJSPlugin({
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
      new CopyWebpackPlugin([
        {
          from: './static',
          to: './static'
        }

      ]),
      new ImageminPlugin({
        disable: false,
        pngquant: {
          quality: '60'
        }
      })
    ]
  })
}
