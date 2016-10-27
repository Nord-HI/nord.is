import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import HomePage from 'client/pages/home/page'
import PingPage from 'client/pages/ping/page'
import Terminal from 'client/pages/terminal'
import GenericNotFound from 'client/pages/404'


export default (
  <Route path="/" component={App}>
    <IndexRoute path="home" component={HomePage} />
    <Route path="login" component={Terminal} />
    <Route path="ping" component={PingPage} />
    <Route path="*" component={GenericNotFound} />
  </Route>
)
