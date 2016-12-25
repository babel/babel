import * as regex from "babel-helper-regex";

export default function ({ types: t }) {
  return {
    visitor: {
      RegExpLiteral(path) {
        let { node } = path;
        if (!regex.is(node, "y")) return;

        path.replaceWith(t.newExpression(t.identifier("RegExp"), [
          t.stringLiteral(node.pattern),
          t.stringLiteral(node.flags)
        ]));
      }
    }
  };
}
