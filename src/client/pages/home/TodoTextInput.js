import React from 'react'
import ReactDOM from 'react-dom'

const { PropTypes } = React

const ENTER_KEY_CODE = 13
const ESC_KEY_CODE = 27

export default class TodoTextInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    commitOnBlur: PropTypes.bool.isRequired,
    initialValue: PropTypes.string,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }
  static defaultProps = {
    commitOnBlur: false,
  }
  state = {
    isEditing: false,
    text: this.props.initialValue || '',
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this).focus()
  }
  commitChanges = () => {
    const newText = this.state.text.trim()
    if (this.props.onDelete && newText === '') {
      this.props.onDelete()
    } else if (this.props.onCancel && newText === this.props.initialValue) {
      this.props.onCancel()
    } else if (newText !== '') {
      this.props.onSave(newText)
      this.setState({ text: '' })
    }
  }
  handleBlur = () => {
    if (this.props.commitOnBlur) {
      this.commitChanges()
    }
  }
  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }
  handleKeyDown = (e) => {
    if (this.props.onCancel && e.keyCode === ESC_KEY_CODE) {
      this.props.onCancel()
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this.commitChanges()
    }
  }
  render() {
    return (
      <input
        className={this.props.className}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        placeholder={this.props.placeholder}
        value={this.state.text}
      />
    )
  }
}
