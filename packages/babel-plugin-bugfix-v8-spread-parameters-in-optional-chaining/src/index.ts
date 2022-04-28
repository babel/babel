import { declare } from "@babel/helper-plugin-utils";
import { transform } from "@babel/plugin-proposal-optional-chaining";
import { shouldTransform } from "./util";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";

export default declare(api => {
  api.assertVersion(7);

  const noDocumentAll = (api.assumption("noDocumentAll") ?? false) as boolean;
  const pureGetters = (api.assumption("pureGetters") ?? false) as boolean;

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
