const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WithoutComments = require('./src/plugins/WithoutComments')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name]-[contenthash:8].bundle.js',
    path: path.join(__dirname, './dist')
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, './dist'),
    publicPath: '/',
    hot: true,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello world',
      template: path.join(__dirname, 'index.html')
    }),
    new CleanWebpackPlugin(),
    new WithoutComments(),
    new HotModuleReplacementPlugin()
  ]
}
