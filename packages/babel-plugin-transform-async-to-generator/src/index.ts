import { declare } from "@babel/helper-plugin-utils";
import * as remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import { addNamed } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

export interface Options {
  method?: string;
  module?: string;
}

type State = {
  methodWrapper?: t.Identifier;
};

export default declare<State>((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const { method, module } = options;
  // Todo(BABEL 8): Consider default it to false
  const noNewArrows = api.assumption("noNewArrows") ?? true;
  const ignoreFunctionLength = api.assumption("ignoreFunctionLength") ?? false;

  if (method && module) {
    return {
      name: "transform-async-to-generator",

      visitor: {
        Function(path, state) {
          if (!path.node.async || path.node.generator) return;

          let wrapAsync = state.methodWrapper;
          if (wrapAsync) {
            wrapAsync = t.cloneNode(wrapAsync);
          } else {
            wrapAsync = state.methodWrapper = addNamed(path, method, module);
          }

          remapAsyncToGenerator.default(
            path,
            { wrapAsync },
            noNewArrows,
            ignoreFunctionLength,
          );
        },
      },
    };
  }

  return {
    name: "transform-async-to-generator",

    visitor: {
      CallExpression: {
        exit(path, state) {
          if (state.availableHelper("callAsync")) {
            remapAsyncToGenerator.onCallExpressionExit(path);
          }
        },
      },
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator.default(
          path,
          {
            wrapAsync: state.availableHelper("asyncToGenerator2")
              ? "asyncToGenerator2"
              : "asyncToGenerator",
            callAsync: state.availableHelper("callAsync")
              ? state.addHelper("callAsync")
              : undefined,
          },
          noNewArrows,
          ignoreFunctionLength,
        );
      },
    },
  };
});
