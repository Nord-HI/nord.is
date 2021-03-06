import React, { Component } from 'react'

export default class KeyManager extends Component {

  constructor(props) {
    super(props)
    this.aliasKeyMap = new Map([
      [['ctrl', 'control'], 'control'],
      [['meta', '⌘', 'cmd', 'command'], 'meta'],
      [['enter'], 'enter'],
      [['arrowup', '↑'], 'arrowup'],
      [['arrowdown', '↓'], 'arrowdown'],
      [['arrowleft', '←'], 'arrowleft'],
      [['arrowright', '→'], 'arrowright'],
    ])
    this.keyCombinations = new Map(
      props.keyCombinations.map(
        keyComb => [this.normalizeKeyComb(keyComb[0]), keyComb[1]]
      )
    )
    this.pressedKeys = []
  }

  onKeyDown(event) {
    this.pressedKeys = [...this.pressedKeys, event.key]
    const keyCombination = this.pressedKeys.map(key => this.normalizeKey(key)).join('+')
    const callback = this.keyCombinations.get(keyCombination)
    if (callback) {
      callback(event)
    }
  }

  onKeyUp(event) {
    this.pressedKeys = this.pressedKeys.filter(key => key !== event.key)
  }

  normalizeKey(key) {
    let normalizedKey = key.toLowerCase()
    for (const [aliasKeyArr, aliasValue] of this.aliasKeyMap) {
      if (aliasKeyArr.some(aliasKey => aliasKey === key)) {
        normalizedKey = aliasValue
        break
      }
    }
    return normalizedKey
  }

  normalizeKeyComb(keyComb) {
    const keys = keyComb.split('+')
    return keys.map(key => this.normalizeKey(key)).join('+')
  }

  render() {
    const { children, className } = this.props
    return (
      <span
        className={className}
        onKeyDown={(event) => this.onKeyDown(event)}
        onKeyUp={(event) => this.onKeyUp(event)}
      >
        {children}
      </span>
    )
  }
}
