import * as regex from "babel-helper-regex";
import * as t from "babel-types";

export default function () {
  return {
    visitor: {
      RegexLiteral(path) {
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
