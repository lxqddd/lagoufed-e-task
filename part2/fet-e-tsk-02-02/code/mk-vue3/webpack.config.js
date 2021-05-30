const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  mode: 'development', // 开发模式
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: '3000',
    publicPath: '/',
    hot: true
  },
  optimization: {
    usedExports: true, // 不导出未使用的模块
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cleanCssMinify
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  entry: path.resolve(__dirname, './src/main.js'), // 打包入口
  output: {
    // 打包完成后输出的输出内容
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[contenthash:8].bundle.js'
  },
  module: {
    rules: [
      {
        // js兼容转换
        test: /\.js$/i,
        exclude: '/node_modules',
        loader: 'babel-loader'
      },
      {
        // 处理.vue文件
        test: /\.vue$/i,
        use: 'vue-loader'
      },
      {
        // 处理css预处理语言less
        test: /\.(css|less)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        // 处理图片
        test: /\.(png|jpg|jpeg|gif)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      title: 'webpack搭建vue3开发环境'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new CssMinimizerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/*',
          to: path.resolve(__dirname, './dist')
        }
      ]
    })
  ]
}

module.exports = config
