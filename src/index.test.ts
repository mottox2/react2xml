
import React from 'react'
import react2xml from './index'

const h = React.createElement

test('basic structure', () => {
  const element = h('a', {b: 'c'})
  expect(react2xml(element)).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a b="c"/>`)
})

test('nest structure', () => {
  const element = h('a', {b: 'c'},
    h('b'),
    h('c')
  )
  expect(react2xml(element)).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a b="c">
  <b/>
  <c/>
</a>`)
})