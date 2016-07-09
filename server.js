import express from 'express'
import bodyParser from 'body-parser'
import api from './server/api'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(`${__dirname}/build/app.js`)
  } else {
    res.redirect('//localhost:9090/build/app.js')
  }
})

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(`${__dirname}/build/style.css`)
  } else {
    res.redirect('//localhost:9090/build/style.css')
  }
})

app.use('/api', api)

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`)
})

if (!process.env.PRODUCTION) {
  const webpack = require('webpack') // eslint-disable-line global-require
  const WebpackDevServer = require('webpack-dev-server') // eslint-disable-line global-require
  const config = require('./webpack.local.config') // eslint-disable-line global-require

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true,
  }).listen(9090, 'localhost', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
  console.log(
    'Essential React listening at http://%s:%s',
    server.address().address,
    server.address().port
  )
})
