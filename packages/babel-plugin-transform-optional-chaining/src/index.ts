import { declare } from "@babel/helper-plugin-utils";
import { transform, transformOptionalChain } from "./transform.ts";
import type { NodePath, types as t } from "@babel/core";

export interface Options {
  loose?: boolean;
}
export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const { loose = false } = options;
  const noDocumentAll = api.assumption("noDocumentAll") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;

  return {
    name: "transform-optional-chaining",
    manipulateOptions: process.env.BABEL_8_BREAKING
      ? undefined
      : (_, parser) => parser.plugins.push("optionalChaining"),

    visitor: {
      "OptionalCallExpression|OptionalMemberExpression"(
        path: NodePath<t.OptionalCallExpression | t.OptionalMemberExpression>,
      ) {
        transform(path, { noDocumentAll, pureGetters });
      },
    },
  };
});

export { transform, transformOptionalChain };
