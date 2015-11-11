export default function ({ types: t }) {
  function hasRefOrSpread(attrs) {
    for (let i = 0; i < attrs.length; i++) {
      let attr = attrs[i];
      if (t.isJSXSpreadAttribute(attr)) return true;
      if (isJSXAttributeOfName(attr, "ref")) return true;
    }
    return false;
  }

  function isJSXAttributeOfName(attr, name) {
    return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
  }

  return {
    visitor: {
      JSXElement(path, file) {
        let { node } = path;

        // filter
        let open = node.openingElement;
        if (hasRefOrSpread(open.attributes)) return;

        // init
        let isComponent = true;
        let props       = t.objectExpression([]);
        let key         = t.nullLiteral();
        let type        = open.name;

        if (t.isJSXIdentifier(type) && t.react.isCompatTag(type.name)) {
          type = t.stringLiteral(type.name);
          isComponent = false;
        }

        function pushProp(objProps, key, value) {
          if (t.isJSXExpressionContainer(value)) value = value.expression;
          objProps.push(t.objectProperty(key, value));
        }

        // props
        for (let attr of (open.attributes: Array<Object>)) {
          if (isJSXAttributeOfName(attr, "key")) {
            key = attr.value;
          } else {
            let name = attr.name.name;
            let propertyKey = t.isValidIdentifier(name) ? t.identifier(name) : t.stringLiteral(name);
            pushProp(props.properties, propertyKey, attr.value || t.identifier("true"));
          }
        }

        if (node.children.length) {
          let children = t.react.buildChildren(node);
          if (children.length) {
            children = children.length === 1 ? children[0] : t.arrayExpression(children);
            pushProp(props.properties, t.identifier("children"), children);
          }
        }

        if (isComponent) {
          let defProps = t.memberExpression(type, t.identifier("defaultProps"));
          if (props.properties.length) {
            props = t.callExpression(file.addHelper("defaultProps"), [defProps, props]);
          } else {
            props = defProps;
          }
        }

        let el = t.callExpression(file.addHelper("createRawReactElement"), [type, key, props]);
        path.replaceWith(el);
      }
    }
  };
}
