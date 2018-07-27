import { resolve } from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import commons from './commons'
import config from './config'

const commonsConfig = commons(config)

const devConfig = {
  output: {
    publicPath: `http://${config.devServer.host}:${config.devServer.port}/`,
    filename: '[name].[hash].js',
  },
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    ...config.devServer,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

const prodConfig = {
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
  // https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        common: {
          name: 'commons',
          minChunks: 2,
          chunks: 'async',
          reuseExistingChunk: true,
          enforce: true,
          priority: 10,
        },
      },
    },
  },
}

export default (env) => {
  if (env && env.production) {
    return merge(commonsConfig, prodConfig)
  }
  return merge(commonsConfig, devConfig)
}
