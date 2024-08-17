import type { NodePath, Scope, PluginPass, File } from "@babel/core";
import { types as t } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";

import {
  getPotentiallyBuggyFieldsIndexes,
  getNameOrLengthStaticFieldsIndexes,
  toRanges,
} from "./util.ts";

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

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  const setPublicClassFields = api.assumption("setPublicClassFields");

  return {
    name: "bugfix-v8-static-class-fields-redefine-readonly",

    visitor: {
      Class(this: PluginPass, path: NodePath<t.Class>) {
        const ranges = toRanges(
          setPublicClassFields
            ? getNameOrLengthStaticFieldsIndexes(path)
            : getPotentiallyBuggyFieldsIndexes(path),
        );

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
