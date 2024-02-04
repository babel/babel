import { declare } from "@babel/helper-plugin-utils";
import { transform, transformOptionalChain } from "./transform.ts";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";

export interface Options {
  loose?: boolean;
}
export default declare((api, options: Options) => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  const { loose = false } = options;
  const noDocumentAll = api.assumption("noDocumentAll") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;

  return {
    name: "transform-optional-chaining",
    inherits: USE_ESM
      ? undefined
      : IS_STANDALONE
        ? undefined
        : // eslint-disable-next-line no-restricted-globals
          require("@babel/plugin-syntax-optional-chaining").default,

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
