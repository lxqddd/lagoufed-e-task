const path = require('path')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// const { HardSourceLevelDbSerializerPlugin } = require('hard-source-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new HardSourceWebpackPlugin({
        cacheDirectory: path.resolve(__dirname, './.cache/hard-source'),
        // Clean up large, old caches automatically.
        cachePrune: {
          // Caches younger than `maxAge` are not considered for deletion. They must
          // be at least this (default: 2 days) old in milliseconds.
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // All caches together must be larger than `sizeThreshold` before any
          // caches will be deleted. Together they must be at least this
          // (default: 50 MB) big in bytes.
          sizeThreshold: 50 * 1024 * 1024
        }
      })
    ]
  }
}
