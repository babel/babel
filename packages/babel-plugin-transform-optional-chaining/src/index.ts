import { declare } from "@babel/helper-plugin-utils";
import syntaxOptionalChaining from "@babel/plugin-syntax-optional-chaining";
import { transform } from "./transform";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";

export interface Options {
  loose?: boolean;
}
export default declare((api, options: Options) => {
  api.assertVersion(7);

  const { loose = false } = options;
  const noDocumentAll = api.assumption("noDocumentAll") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;

  return {
    name: "transform-optional-chaining",
    inherits: syntaxOptionalChaining.default,

    visitor: {
      "OptionalCallExpression|OptionalMemberExpression"(
        path: NodePath<t.OptionalCallExpression | t.OptionalMemberExpression>,
      ) {
        transform(path, { noDocumentAll, pureGetters });
      },
    },
  };
});

export { transform };
