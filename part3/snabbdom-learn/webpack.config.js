const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js'
  },
  devtool: 'source-map',
  devServer: {
    port: '10086',
    hot: true
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      title: 'learn-snabbdom'
    })
  ]
}
