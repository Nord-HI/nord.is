import React, { Component } from 'react'

const aliasMap = new Map([
  [['ctrl', 'control'], 'control'],
  [['meta', '⌘', 'cmd', 'command'], 'meta'],
  [['enter'], 'enter'],
])
const knownKeyCombinations = new Map()
let keyChain = []
const keyChainTTL = 300
let keyChainCountDownId = null

const normalizeKey = key => {
  let normalizedKey = key.toLowerCase()
  for (const [aliasKeyArr, aliasValue] of aliasMap) {
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

  handleKeyDown(e) {
    clearTimeout(keyChainCountDownId)
    keyChainCountDownId = setTimeout(() => { keyChain = [] }, keyChainTTL)
    keyChain.push(e.key)
    const keyCombination = keyChain.map(key => normalizeKey(key)).join('+')
    console.info('[KeyManager] key combination: ', keyCombination)
    const callback = knownKeyCombinations.get(keyCombination)
    if (callback) {
      keyChain = []
      callback()
    }
  }

  render() {
    const { children } = this.props
    return (
      <span onKeyDown={(event) => this.handleKeyDown(event)}>
        {children}
      </span>
    )
  }
}
