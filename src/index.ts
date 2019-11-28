import testRenderer, { ReactTestRendererJSON } from 'react-test-renderer'
import xml2js from 'xml2js'

const transformJSON = (element: ReactTestRendererJSON) => {
  const { props, children } = element

  let childMap = {} as any
  if (children) {
    children.forEach(child => {
      if (typeof child === 'string') {
        childMap._ = child
      } else {
        const current = childMap[child.type]
        if (current) {
          childMap[child.type] = [...current, transformJSON(child)]
        } else {
          childMap[child.type] = [transformJSON(child)]
        }
      }
    })
  }

  return {
    $: props,
    ...childMap
  }
}

const react2xml = (element: JSX.Element) => {
  const rendererJSON = testRenderer.create(element).toJSON()
  const xmlJSON = transformJSON(rendererJSON)
  const xbuilder = new xml2js.Builder({
    rootName: rendererJSON!.type
  });
  return xbuilder.buildObject(xmlJSON)
}

export default react2xml