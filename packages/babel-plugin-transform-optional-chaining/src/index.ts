import { declare } from "@babel/helper-plugin-utils";
import { transform, transformOptionalChain } from "./transform.ts";
import type { NodePath, types as t } from "@babel/core";

export interface Options {
  /** @deprecated Use the `noDocumentAll` and `pureGetters` assumptions instead. */
  loose?: boolean;
}
export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if ("loose" in options) {
    console.warn(
      "@babel/plugin-transform-optional-chaining: The 'loose' option has been deprecated, " +
        "use the `noDocumentAll` and `pureGetters` assumptions instead (https://babeljs.io/assumptions).",
    );
  }

  const { loose = false } = options;
  const noDocumentAll = api.assumption("noDocumentAll") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;

  return {
    name: "transform-optional-chaining",
    manipulateOptions: undefined,
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
