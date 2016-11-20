import { IndexLink, Link } from 'react-router'
import RemoveCompletedTodosMutation from './mutations/RemoveCompletedTodosMutation'
import React from 'react'
import Relay from 'react-relay'

class TodoListFooter extends React.Component {
  handleRemoveCompletedTodosClick = () => {
    this.props.relay.commitUpdate(
      new RemoveCompletedTodosMutation({
        todos: this.props.viewer.todos,
        viewer: this.props.viewer,
      })
    )
  }
  render() {
    const numCompletedTodos = this.props.viewer.completedCount
    const numRemainingTodos = this.props.viewer.totalCount - numCompletedTodos
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{numRemainingTodos}</strong> item{numRemainingTodos === 1 ? '' : 's'} left
        </span>
        <ul className="filters">
          <li>
            <IndexLink to="/home" activeClassName="selected">All</IndexLink>
          </li>
          <li>
            <Link to="/home/active" activeClassName="selected">Active</Link>
          </li>
          <li>
            <Link to="/home/completed" activeClassName="selected">Completed</Link>
          </li>
        </ul>
        {numCompletedTodos > 0 &&
          <button
            className="clear-completed"
            onClick={this.handleRemoveCompletedTodosClick}
          >
            Clear completed
          </button>
        }
      </footer>
    )
  }
}

export default Relay.createContainer(TodoListFooter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        completedCount,
        todos(
          status: "completed",
          first: 2147483647  # max GraphQLInt
        ) {
          ${RemoveCompletedTodosMutation.getFragment('todos')},
        },
        totalCount,
        ${RemoveCompletedTodosMutation.getFragment('viewer')},
      }
    `,
  },
})
