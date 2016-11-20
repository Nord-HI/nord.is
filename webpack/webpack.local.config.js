var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: "eval",
  entry:  [
    "webpack-dev-server/client?http://localhost:9090",
    "webpack/hot/only-dev-server",
    "./src/client/main"
  ],
  output: {
    path: __dirname + "/built/",
    filename: "app.js",
    publicPath: "http://localhost:9090/built/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin({filename: 'style.css', allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: process.env.TIRE === 'DEVELOPMENT'
    }),
    new webpack.LoaderOptionsPlugin({
       test: /\.css/, // may apply this only for some modules
       options: { postcss: [require('autoprefixer'), require('postcss-nested')] },
     })
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader"] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'})},
      { test: /\.(png|svg|ico|jpg)$/, loader: 'url-loader?limit=10000' },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
}
