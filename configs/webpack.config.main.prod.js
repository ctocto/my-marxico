const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { dependencies } = require('../package.json')

module.exports = {
  devtool: 'source-map',

  mode: 'production',

  target: 'electron-main',

  context: path.resolve(__dirname, '../'),

  entry: './src/start.js',

  output: {
    path: path.join(__dirname, '../build/main'),
    filename: './[name].js',
    libraryTarget: 'commonjs2',
  },

  externals: [...Object.keys(dependencies || {})],

  resolve: {
    extensions: ['.js', '.json'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode:
    //     process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
    //   openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    // }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
    }),
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
}
