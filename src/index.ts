import testRenderer, { ReactTestRendererJSON } from 'react-test-renderer'
import xmlbuilder, { create } from 'xmlbuilder'

const react2xml = (element: JSX.Element) => {
  const rendererJSON = testRenderer.create(element).toJSON()
  if (!rendererJSON) throw new Error('Element is invalid')

  const builder = xmlbuilder.create(rendererJSON.type)
  buildXML(builder, rendererJSON, true)
  builder.end({ pretty: true })
  const result = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + builder.toString({ pretty: true })

  return result
}


const buildXML = (builder: xmlbuilder.XMLElement, rendererJSON: ReactTestRendererJSON, root: Boolean = false) => {
  const { type, props, children: _children } = rendererJSON
  const children = _children || []

  const firstChild = children[0]
  if (children.length === 1 && typeof firstChild === 'string') {
    builder.ele(type, props, firstChild)
    return
  }

  let xmlElement: xmlbuilder.XMLElement | null = null
  if (root) {
    Object.keys(props).map(key => {
      builder!.att(key, props[key])
    })
  } else {
    xmlElement = builder.ele(type, props)
  }

  children.forEach((element) => {
    if (typeof element === 'string') throw new Error('Invaild XML')
    buildXML(xmlElement || builder, element)
  })
}

export default react2xml