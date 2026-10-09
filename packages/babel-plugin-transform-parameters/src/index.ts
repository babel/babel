import { declare } from "@babel/helper-plugin-utils";
import convertFunctionParams from "./params.ts";
import convertFunctionRest from "./rest.ts";
export { convertFunctionParams };

export interface Options {
  /** @deprecated Use the `ignoreFunctionLength` assumption instead. */
  loose?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if ("loose" in options) {
    console.warn(
      "@babel/plugin-transform-parameters: The 'loose' option has been deprecated, " +
        "use the `ignoreFunctionLength` assumption instead (https://babeljs.io/assumptions).",
    );
  }

  const ignoreFunctionLength =
    api.assumption("ignoreFunctionLength") ?? options.loose;
  // Todo(BABEL 8): Consider default it to false
  const noNewArrows = api.assumption("noNewArrows") ?? true;

  return {
    name: "transform-parameters",

    visitor: {
      Function(path) {
        if (
          path.isArrowFunctionExpression() &&
          path
            .get("params")
            .some(param => param.isRestElement() || param.isAssignmentPattern())
        ) {
          // default/rest visitors require access to `arguments`, so it cannot be an arrow
          path.arrowFunctionToExpression({
            allowInsertArrowWithRest: false,
            noNewArrows,
          });

          // In some cases arrowFunctionToExpression replaces the function with a wrapper.
          // Return early; the wrapped function will be visited later in the AST traversal.
          if (!path.isFunctionExpression()) return;
        }

        const convertedRest = convertFunctionRest(path);
        const convertedParams = convertFunctionParams(
          path,
          ignoreFunctionLength,
        );

        if (convertedRest || convertedParams) {
          // Manually reprocess this scope to ensure that the moved params are updated.
          path.scope.crawl();
        }
      },
    },
  };
});
