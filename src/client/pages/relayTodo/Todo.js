import ChangeTodoStatusMutation from './mutations/ChangeTodoStatusMutation'
import RemoveTodoMutation from './mutations/RemoveTodoMutation'
import RenameTodoMutation from './mutations/RenameTodoMutation'
import TodoTextInput from './TodoTextInput'

import React from 'react'
import Relay from 'react-relay'
import classnames from 'classnames'

class Todo extends React.Component {
  state = {
    isEditing: false,
  }
  setEditMode = (shouldEdit) => {
    this.setState({ isEditing: shouldEdit })
  }
  removeTodo() {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({ todo: this.props.todo, viewer: this.props.viewer })
    )
  }
  handleCompleteChange = (e) => {
    const complete = e.target.checked
    this.props.relay.commitUpdate(
      new ChangeTodoStatusMutation({
        complete,
        todo: this.props.todo,
        viewer: this.props.viewer,
      })
    )
  };
  handleDestroyClick = () => {
    this.removeTodo()
  };
  handleLabelDoubleClick = () => {
    this.setEditMode(true)
  };
  handleTextInputCancel = () => {
    this.setEditMode(false)
  };
  handleTextInputDelete = () => {
    this.setEditMode(false)
    this.removeTodo()
  };
  handleTextInputSave = (text) => {
    this.setEditMode(false)
    this.props.relay.commitUpdate(
      new RenameTodoMutation({ todo: this.props.todo, text })
    )
  }
  renderTextInput() {
    return (
      <TodoTextInput
        className="edit"
        commitOnBlur
        initialValue={this.props.todo.text}
        onCancel={this.handleTextInputCancel}
        onDelete={this.handleTextInputDelete}
        onSave={this.handleTextInputSave}
      />
    )
  }
  render() {
    return (
      <li
        className={classnames({
          completed: this.props.todo.complete,
          editing: this.state.isEditing,
        })}
      >
        <div className="view">
          <input
            checked={this.props.todo.complete}
            className="toggle"
            onChange={this.handleCompleteChange}
            type="checkbox"
          />
          <label onDoubleClick={this.handleLabelDoubleClick}>
            {this.props.todo.text}
          </label>
          <button
            className="destroy"
            onClick={this.handleDestroyClick}
          >x</button>
        </div>
        {this.state.isEditing && this.renderTextInput()}
      </li>
    )
  }
}

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
        text,
        ${ChangeTodoStatusMutation.getFragment('todo')},
        ${RemoveTodoMutation.getFragment('todo')},
        ${RenameTodoMutation.getFragment('todo')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${ChangeTodoStatusMutation.getFragment('viewer')},
        ${RemoveTodoMutation.getFragment('viewer')},
      }
    `,
  },
})
