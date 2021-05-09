const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WithoutComments = require('./src/plugins/WithoutComments')

module.exports = {
  devtool: false,
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name]-[hash:8]-bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      title: 'webpack源码分析'
    }),
    new WithoutComments()
  ]
}
