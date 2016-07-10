import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import LoginPage from '../../pages/login/page'
import HomePage from '../../pages/home/page'
import PingPage from '../../pages/ping/page'
import Terminal from '../../pages/terminal'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
    <Route path="terminal" component={Terminal} />
    <Route path="ping" component={PingPage} />
  </Route>
)
