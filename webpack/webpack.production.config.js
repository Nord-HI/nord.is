var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/client/main",

  output: {
    path: path.join(__dirname, '../', '/built/'),
    publicPath: "/built/",
    filename: "app[chunkhash].js"
  },

  plugins: [
    new ExtractTextPlugin({filename: 'style[contenthash].css', allChunks: true }),
    new HtmlWebpackPlugin({ template: 'index.ejs' }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css/, // may apply this only for some modules
      options: { postcss: [require('autoprefixer'), require('postcss-nested')] },
     })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'})},
      { test: /\.(png|svg|ico|jpg)$/, loader: 'url-loader?limit=10000' },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
}
