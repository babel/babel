export default function ({ types: t }) {
  let IGNORE = Symbol();

  return {
    visitor: {
      UnaryExpression(path) {
        let { node, parent } = path;
        if (node[IGNORE]) return;
        if (path.find(path => path.node && !!path.node._generated)) return;

        if (path.parentPath.isBinaryExpression() && t.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
          // optimise `typeof foo === "string"` since we can determine that they'll never need to handle symbols
          let opposite = path.getOpposite();
          if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") {
            return;
          }
        }

        if (node.operator === "typeof" && !node._fromBabelNative) {
          let call = t.callExpression(this.addHelper("typeof"), [node.argument]);
          if (path.get("argument").isIdentifier()) {
            let undefLiteral = t.stringLiteral("undefined");
            let unary = t.unaryExpression("typeof", node.argument);
            unary[IGNORE] = true;
            path.replaceWith(t.conditionalExpression(
              t.binaryExpression("===", unary, undefLiteral),
              undefLiteral,
              call
            ));
          } else {
            path.replaceWith(call);
          }
        }
      }
    }
  };
}
