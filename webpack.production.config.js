var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/client/main",

  output: {
    path: __dirname + "/built",
    filename: "app.js"
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.(png|svg|ico|jpg)$/, loader: 'url-loader?limit=10000' },
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: ['node_modules', 'src'],
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
