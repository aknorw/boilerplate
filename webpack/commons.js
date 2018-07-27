import { join, resolve } from 'path'
import { DefinePlugin } from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'

export default config => ({
  entry: {
    main: './src',
  },
  context: resolve(__dirname, '..'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: '[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      join(__dirname, '../node_modules'),
      join(__dirname, '../src'),
    ],
  },
  /*
  optimization: {
   // @TODO: Check manifest in Webpack docs
    runtimeCheck: 'manifest',
  },
  */
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      APP_NAME: JSON.stringify(config.appName),
      APP_VERSION: JSON.stringify(config.appVersion),
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../src/index.template.html'),
      title: config.appName,
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
})
