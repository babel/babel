export default function ({ types: t }) {
  return {
    visitor: {
      Literal(node) {
        if (typeof node.value === "boolean") {
          return t.unaryExpression("!", t.literal(+!node.value), true);
        }
      }
    }
  };
}
