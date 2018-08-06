import { resolve } from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OfflinePlugin from 'offline-plugin'
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
    new webpack.NoEmitOnErrorsPlugin(),
    new OfflinePlugin({
      publicPath: '/',
      appShell: '/',
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    concatenateModules: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        uglifyOptions: {
          parse: {
            // we want uglify-js to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
      }),
    ],
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: {
      name: 'runtime',
    },
    // https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        common: {
          name: 'commons',
          minChunks: 2,
          chunks: 'all',
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
