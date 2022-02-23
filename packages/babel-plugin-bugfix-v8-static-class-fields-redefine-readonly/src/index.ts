import type { NodePath, Scope } from "@babel/traverse";
import { types as t, type PluginPass, type File } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";

import { getPotentiallyBuggyFieldsIndexes, toRanges } from "./util.ts";

export default declare(api => {
  api.assertVersion(7);

  function buildFieldsReplacement(
    fields: t.ClassProperty[],
    scope: Scope,
    file: File,
  ) {
    return t.staticBlock(
      fields.map(field => {
        const key =
          field.computed || !t.isIdentifier(field.key)
            ? field.key
            : t.stringLiteral(field.key.name);

        return t.expressionStatement(
          t.callExpression(file.addHelper("defineProperty"), [
            t.thisExpression(),
            key,
            field.value || scope.buildUndefinedNode(),
          ]),
        );
      }),
    );
  }

  return {
    name: "bugfix-v8-static-class-fields-redefine-readonly",

    visitor: {
      Class(this: PluginPass, path: NodePath<t.Class>) {
        const ranges = toRanges(getPotentiallyBuggyFieldsIndexes(path));

        for (let i = ranges.length - 1; i >= 0; i--) {
          const [start, end] = ranges[i];

          const startPath = path.get("body.body")[start];

          startPath.replaceWith(
            buildFieldsReplacement(
              path.node.body.body.slice(start, end) as t.ClassProperty[],
              path.scope,
              this.file,
            ),
          );

          for (let j = end - 1; j > start; j--) {
            path.get("body.body")[j].remove();
          }
        }
      },
    },
  };
});
