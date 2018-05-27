const webpackMerge = require('webpack-merge')
const commonConfig = require('./base.js')
module.exports = (env) => {
  return webpackMerge(commonConfig, {
    devtool: 'source-map'
  })
}
