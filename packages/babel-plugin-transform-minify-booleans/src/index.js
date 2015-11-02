export default function ({ types: t }) {
  return {
    visitor: {
      Literal(path) {
        if (typeof path.node.value === "boolean") {
          path.replaceWith(t.unaryExpression("!", t.numberLiteral(+!path.node.value), true));
        }
      }
    }
  };
}
