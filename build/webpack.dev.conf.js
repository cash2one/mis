var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var pageConfig = require('../pageconfig.json')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var extendWebpackConfig = {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
}
extendWebpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html'
  })
);

pageConfig.pages.forEach((page) => {
  // https://github.com/ampedandwired/html-webpack-plugin
  extendWebpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: page.name + '.html',
      template: page.template,
      inject: true,
      chunks: [page.name]
    })
  );
})

module.exports = merge(baseWebpackConfig, extendWebpackConfig);
