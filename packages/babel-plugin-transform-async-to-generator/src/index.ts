import { declare } from "@babel/helper-plugin-utils";
import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
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

          remapAsyncToGenerator(
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

    visitor: api.traverse.visitors.merge([
      {
        Function(path, state) {
          if (!path.node.async || path.node.generator) return;

          remapAsyncToGenerator(
            path,
            process.env.BABEL_8_BREAKING
              ? {
                  wrapAsync: () => state.addHelper("asyncToGenerator"),
                  callAsync: () => state.addHelper("callAsync"),
                }
              : {
                  wrapAsync: state.addHelper("asyncToGenerator"),
                },
            noNewArrows,
            ignoreFunctionLength,
          );
        },
      },
    ]),
  };
});
