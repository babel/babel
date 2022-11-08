import { traverse } from "@babel/core";
import environmentVisitor from "@babel/helper-environment-visitor";
import { declare } from "@babel/helper-plugin-utils";
import convertFunctionParams from "./params";
import convertFunctionRest from "./rest";
export { convertFunctionParams };

const checkSuperCallsVisitor = traverse.visitors.merge<{}>([
  {
    CallExpression(child) {
      if (child.get("callee").isSuper()) {
        // NOTE: this may happen in `@babel/preset-env` with target `since 2017`, or in the default setting of `create-react-app`.
        throw child.buildCodeFrameError(
          "It's not possible to compile `super()` in an arrow function with default or rest parameters without compiling classes.\n" +
            "Please add '@babel/plugin-transform-classes' to your Babel configuration.",
        );
      }
    },
  },
  environmentVisitor,
]);

export interface Options {
  loose?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(7);

  const ignoreFunctionLength =
    api.assumption("ignoreFunctionLength") ?? options.loose;
  // Todo(BABEL 8): Consider default it to false
  const noNewArrows = (api.assumption("noNewArrows") ?? true) as boolean;

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
          path.traverse(checkSuperCallsVisitor);

          // default/rest visitors require access to `arguments`, so it cannot be an arrow
          path.arrowFunctionToExpression({ noNewArrows });

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
