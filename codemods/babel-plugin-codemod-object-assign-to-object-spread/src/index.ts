import syntaxObjectRestSpread from "@babel/plugin-syntax-object-rest-spread";
import type { PluginItem, Visitor } from "@babel/core";
import { NodePath, types as t } from "@babel/core";

export default function({ types: t }: PluginItem): { visitor: Visitor } {
  return {
    visitor: {
      CallExpression(path: NodePath<t.CallExpression>) {
        if (!path.get("callee").matchesPattern("Object.assign")) return;

        const args = path.get("arguments");
        if (args.length === 0) return;

        const [objPath, ...restArgs] = args;
        if (!objPath.isObjectExpression()) return;

        const obj = objPath.node;
        const { properties } = obj;

        for (const arg of restArgs) {
          const { node } = arg;

          if (t.isObjectExpression(node)) {
            properties.push(...node.properties);
          } else {
            properties.push(t.spreadElement(node));
          }
        }

        properties.sort((a, b) => {
          if (t.isSpreadElement(a) && !t.isSpreadElement(b)) {
            return 1;
          }
          if (!t.isSpreadElement(a) && t.isSpreadElement(b)) {
            return -1;
          }
          return 0;
        });

        path.replaceWith(obj);
      },
    },
    inherits: syntaxObjectRestSpread as PluginItem,
  };
}
