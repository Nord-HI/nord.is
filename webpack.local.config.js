var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
require('dotenv').config()

module.exports = {

  // Efficiently evaluate modules with source maps
  devtool: "eval",

  // Set entry point to ./src/client/main and include necessary files for hot load
  entry:  [
    "webpack-dev-server/client?http://localhost:9090",
    "webpack/hot/only-dev-server",
    "./src/client/main"
  ],

  // This will not actually create a bundle.js file in ./built. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: __dirname + "/built/",
    filename: "app.js",
    publicPath: "http://localhost:9090/built/"
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin({filename: 'style.css', allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: process.env.TIRE === 'DEVELOPMENT'
    }),
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'})},
      { test: /\.(png|svg|ico|jpg)$/, loader: 'url-loader?limit=10000' },
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    // extensions: ['', '.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  // // Additional plugins for CSS post processing using postcss-loader
  // postcss: [
  //   require('autoprefixer'), // Automatically include vendor prefixes
  //   require('postcss-nested') // Enable nested rules, like in Sass
  // ]

}
