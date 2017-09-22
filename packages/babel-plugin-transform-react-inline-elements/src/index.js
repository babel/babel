import helper from "babel-helper-builder-react-jsx";

export default function({ types: t }) {
  function hasRefOrSpread(attrs) {
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      if (t.isJSXSpreadAttribute(attr)) return true;
      if (isJSXAttributeOfName(attr, "ref")) return true;
    }
    return false;
  }

  function isJSXAttributeOfName(attr, name) {
    return (
      t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name })
    );
  }

  const visitor = helper({
    filter(node) {
      return !hasRefOrSpread(node.openingElement.attributes);
    },
    pre(state) {
      const tagName = state.tagName;
      const args = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },
    post(state, pass) {
      state.callee = pass.addHelper("jsx");

      const props = state.args[1];
      let hasKey = false;
      if (t.isObjectExpression(props)) {
        const keyIndex = props.properties.findIndex(prop =>
          t.isIdentifier(prop.key, { name: "key" }),
        );
        if (keyIndex > -1) {
          state.args.splice(2, 0, props.properties[keyIndex].value);
          props.properties.splice(keyIndex, 1);
          hasKey = true;
        }
      } else if (t.isNullLiteral(props)) {
        state.args.splice(1, 1, t.objectExpression([]));
      }

      if (!hasKey && state.args.length > 2) {
        state.args.splice(2, 0, t.unaryExpression("void", t.numericLiteral(0)));
      }
    },
  });
  return { visitor };
}
