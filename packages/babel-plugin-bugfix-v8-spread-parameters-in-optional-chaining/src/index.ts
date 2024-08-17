import { declare } from "@babel/helper-plugin-utils";
import { transform } from "@babel/plugin-transform-optional-chaining";
import { shouldTransform } from "./util.ts";
import type { NodePath, types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  const noDocumentAll = api.assumption("noDocumentAll") ?? false;
  const pureGetters = api.assumption("pureGetters") ?? false;

  return {
    name: "bugfix-v8-spread-parameters-in-optional-chaining",

    visitor: {
      "OptionalCallExpression|OptionalMemberExpression"(
        path: NodePath<t.OptionalCallExpression | t.OptionalMemberExpression>,
      ) {
        if (shouldTransform(path)) {
          transform(path, { noDocumentAll, pureGetters });
        }
      },
    },
  };
});
