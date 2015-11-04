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
        let obj         = t.objectExpression([]);
        let key         = t.nullLiteral();
        let type        = open.name;

        if (t.isJSXIdentifier(type) && t.react.isCompatTag(type.name)) {
          type = t.stringLiteral(type.name);
          isComponent = false;
        }

        function pushElemProp(key, value) {
          pushProp(obj.properties, t.identifier(key), value);
        }

        function pushProp(objProps, key, value) {
          if (t.isJSXExpressionContainer(value)) value = value.expression;
          objProps.push(t.objectProperty(key, value));
        }

        if (node.children.length) {
          let children = t.react.buildChildren(node);
          if (children.length) {
            children = children.length === 1 ? children[0] : t.arrayExpression(children);
            pushProp(props.properties, t.identifier("children"), children);
          }
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

        if (isComponent) {
          props = t.callExpression(file.addHelper("defaultProps"), [t.memberExpression(type, t.identifier("defaultProps")), props]);
        }

        // metadata
        pushElemProp("$$typeof", file.addHelper("typeofReactElement"));
        pushElemProp("type", type);
        pushElemProp("key", key);
        pushElemProp("ref", t.nullLiteral());

        pushElemProp("props", props);
        pushElemProp("_owner", t.nullLiteral());

        path.replaceWith(obj);
      }
    }
  };
}
