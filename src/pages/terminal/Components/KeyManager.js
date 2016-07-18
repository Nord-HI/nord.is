import React, { Component } from 'react'

const aliasKeyMap = new Map([
  [['ctrl', 'control'], 'control'],
  [['meta', '⌘', 'cmd', 'command'], 'meta'],
  [['enter'], 'enter'],
])
const knownKeyCombinations = new Map()
let pressedKeys = []

const normalizeKey = key => {
  let normalizedKey = key.toLowerCase()
  for (const [aliasKeyArr, aliasValue] of aliasKeyMap) {
    if (aliasKeyArr.some(aliasKey => aliasKey === key)) {
      normalizedKey = aliasValue
      break
    }
  }
  return normalizedKey
}

const normalizeKeyComb = (keyComb) => {
  const keys = keyComb.split('+')
  return keys.map(key => normalizeKey(key)).join('+')
}

export default class KeyManager extends Component {

  static add(keyComb, callback) {
    knownKeyCombinations.set(normalizeKeyComb(keyComb), callback)
  }

  componentWillUnmount() {
    knownKeyCombinations.clear()
    pressedKeys = []
  }

  handleKeyDown(e) {
    pressedKeys.push(e.key)
    const keyCombination = pressedKeys.map(key => normalizeKey(key)).join('+')
    const callback = knownKeyCombinations.get(keyCombination)
    if (callback) {
      pressedKeys = []
      callback()
    }
  }

  handleKeyUp(e) {
    pressedKeys = pressedKeys.filter(key => key !== e.key)
  }

  render() {
    const { children } = this.props
    return (
      <span
        onKeyDown={(event) => this.handleKeyDown(event)}
        onKeyUp={(event) => this.handleKeyUp(event)}
      >
        {children}
      </span>
    )
  }
}
