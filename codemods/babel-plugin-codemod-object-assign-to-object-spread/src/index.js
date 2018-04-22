import syntaxObjectRestSpread from "@babel/plugin-syntax-object-rest-spread";
import { types as t } from "@babel/core";

export default function() {
  return {
    inherits: syntaxObjectRestSpread,

    visitor: {
      CallExpression(path) {
        if (!path.get("callee").matchesPattern("Object.assign")) return;

        const objPath = path.get("arguments.0");
        if (!objPath.isObjectExpression()) return;

        const obj = objPath.node;
        const { properties } = obj;

        const args = path.get("arguments");
        for (let i = 1; i < args.length; i++) {
          const arg = args[i];
          const { node } = arg;

          if (arg.isObjectExpression()) {
            properties.push(...node.properties);
          } else {
            properties.push(t.spreadElement(node));
          }
        }

        path.replaceWith(obj);
      },
    },
  };
}
