import React from 'react'
import App from '../App'
import renderer from 'react-test-renderer'

it('should match its last snapshot', () => {
  const component = renderer.create(
    <App><span>hello span!</span></App>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
