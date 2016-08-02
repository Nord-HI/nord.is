import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import App from 'client/common/components/App'
import LoginPage from 'client/pages/login/page'
import HomePage from 'client/pages/home/page'
import PingPage from 'client/pages/ping/page'
import Terminal from 'client/pages/terminal'
import GenericNotFound from 'client/pages/404'
import ViewerQueries from 'client/common/queries/ViewerQueries'
import 'client/common/base.css'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/api/graphql')
)

// Render the router
ReactDOM.render((
  <Router
    history={browserHistory}
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
  >
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage} />
      <Route path="home" component={HomePage} queries={ViewerQueries} />
      <Route path="terminal" component={Terminal} />
      <Route path="ping" component={PingPage} />
      <Route path="*" component={GenericNotFound} />
    </Route>
  </Router>
), document.getElementById('app'))
