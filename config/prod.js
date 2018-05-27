const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const commonConfig = require('./base.js')
module.exports = (env) => {
  return webpackMerge(commonConfig, {
    plugins: [
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
      new ImageminPlugin({
        disable: false,
        pngquant: {
          quality: '95'
        }
      })
    ]
  })
}
