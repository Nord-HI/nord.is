export default function startWebpackDevServer() {
  const webpack = require('webpack') // eslint-disable-line global-require
  const WebpackDevServer = require('webpack-dev-server') // eslint-disable-line global-require
  const config = require('../../webpack.local.config') // eslint-disable-line global-require

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    stats: { colors: true },
  }).listen(9090, 'localhost', (err) => {
    c.log(`Webpack dev server listening at http://localhost:${9090}`)
    if (err) {
      c.error(err)
    }
  })
}
