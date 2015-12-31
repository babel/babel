import esutils from "esutils"

const nameProperty = "element"
const attributesProperty = "attributes"
const childrenProperty = "children"

export default function ({ types: t }) {
  const transformOnType = transforms => node => (transforms[node.type] || () => { throw new Error(`${node.type} could not be transformed`) })(node)

  const JSXIdentifier = node => t.stringLiteral(node.name)

  const JSXNamespacedName = node => t.stringLiteral(`${node.namespace.name}:${node.name.name}`)

  const JSXMemberExpression = transformOnType({
    JSXIdentifier: node => t.identifier(node.name),
    JSXMemberExpression: node => (
      t.memberExpression(
        JSXMemberExpression(node.object),
        JSXMemberExpression(node.property)
      )
    )
  })

  const JSXElementName = transformOnType({ JSXIdentifier, JSXNamespacedName, JSXMemberExpression })

  const JSXExpressionContainer = node => node.expression

  const JSXAttributeName = JSXElementName

  const JSXAttributeValue = transformOnType({
    StringLiteral: node => node,
    JSXExpressionContainer
  })

  const JSXAttributes = (nodes, file) => {
    let object = []
    const objects = []

    nodes.forEach(node => {
      switch (node.type) {
        case "JSXAttribute": {
          if (!object) {
            object = []
          }

          const attributeName = JSXAttributeName(node.name)

          const objectKey = esutils.keyword.isIdentifierNameES6(attributeName.value) ?
            t.identifier(attributeName.value) :
            attributeName

          object.push(t.objectProperty(objectKey, JSXAttributeValue(node.value)))
          break
        }
        case "JSXSpreadAttribute": {
          if (object) {
            objects.push(t.objectExpression(object))
            object = null
          }

          objects.push(node.argument)
          break
        }
        default:
          throw new Error(`${node.type} cannot be used as a JSX attribute`)
      }
    })

    if (object && object.length > 0) {
      objects.push(t.objectExpression(object))
    }

    if (objects.length === 0) {
      return t.objectExpression([])
    }
    else if (objects.length === 1) {
      return objects[0]
    }
    else {
      return (
        t.callExpression(
          file.addHelper("extends"),
          objects
        )
      )
    }
  }

  const JSXText = node => t.stringLiteral(node.value.replace(/\s+/g, " "))

  const JSXChild = file => transformOnType({ JSXText, JSXElement: JSXElement(file), JSXExpressionContainer })

  const JSXChildren = file => nodes => t.arrayExpression(nodes.map(JSXChild(file)))

  const JSXElement = file => node => t.objectExpression([
    t.objectProperty(t.identifier(nameProperty), JSXElementName(node.openingElement.name)),
    t.objectProperty(t.identifier(attributesProperty), JSXAttributes(node.openingElement.attributes, file)),
    t.objectProperty(t.identifier(childrenProperty), node.closingElement ? JSXChildren(file)(node.children) : t.nullLiteral())
  ])

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: {
      JSXElement(path, file) {
        path.replaceWith(JSXElement(file)(path.node))
      }
    }
  }
}
