import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import App from 'client/common/components/App'
import RelayTodoPage from 'client/pages/relayTodo'
import TodoList from 'client/pages/relayTodo/TodoList'
import PingPage from 'client/pages/ping/page'
import TerminalPage from 'client/pages/terminal'
import HomePage from 'client/pages/home'
import GenericNotFoundPage from 'client/pages/404'
import ViewerQueries from 'client/pages/relayTodo/queries/ViewerQueries'
import 'client/common/base.css'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/api/graphql', {
    credentials: 'same-origin',
  })
)

// Render the router
ReactDOM.render(
  <Router
    history={browserHistory}
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
  >
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />

      <Route path="home" component={RelayTodoPage} queries={ViewerQueries}>
        <IndexRoute
          component={TodoList}
          queries={ViewerQueries}
          prepareParams={() => ({ status: 'any' })}
        />
        <Route
          path=":status"
          component={TodoList}
          queries={ViewerQueries}
        />
      </Route>

      <Route path="login" component={TerminalPage} />
      <Route path="ping" component={PingPage} />
      <Route path="*" component={GenericNotFoundPage} />
    </Route>
  </Router>
  , document.getElementById('app'))
