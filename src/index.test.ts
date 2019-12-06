
import React from 'react'
import react2xml from './index'

const h = React.createElement

test('basic structure', () => {
  const element = h('a', {b: 'c'})
  expect(react2xml(element)).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a b="c"/>
`)
})

test('nest structure', () => {
  const element = h('a', {b: 'c'},
    h('b', {}, h('d')),
    h('c', {d: 2}, 'World')
  )
  expect(react2xml(element)).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a b="c">
  <b>
    <d/>
  </b>
  <c d="2">World</c>
</a>
`)
})

test('multi nest structure', () => {
  const element = h('a', {b: 'c'},
    h('b', {}, h('d')),
    h('c', {c: 2}),
    h('bb', {}, 'Hello'),
  )
  expect(react2xml(element)).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a b="c">
  <b>
    <d/>
  </b>
  <c c="2"/>
  <bb>Hello</bb>
</a>
`)
})

test('multiline text', () => {
  const element = h('a', {b: 'c'},
    h('b', {}, `a&
b`),
  )
  expect(react2xml(element)).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a b="c">
  <b>a&amp;
b</b>
</a>
`)
})