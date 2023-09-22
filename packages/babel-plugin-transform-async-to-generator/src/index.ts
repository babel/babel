import { declare } from "@babel/helper-plugin-utils";
import * as remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import { addNamed } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

export interface Options {
  method?: string;
  module?: string;
}

type State = {
  methodWrapper?: t.Expression;
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

        if (
          state.availableHelper("callAsync") &&
          state.availableHelper("asyncToGenerator2")
        ) {
          remapAsyncToGenerator.default(
            path,
            {
              wrapAsync: "asyncToGenerator2",
              callAsync: "callAsync",
            },
            noNewArrows,
            ignoreFunctionLength,
          );
        } else {
          remapAsyncToGenerator.default(
            path,
            {
              wrapAsync: state.addHelper("asyncToGenerator"),
            },
            noNewArrows,
            ignoreFunctionLength,
          );
        }
      },
    },
  };
});
