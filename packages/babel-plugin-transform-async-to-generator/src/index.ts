import { declare } from "@babel/helper-plugin-utils";
import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import { addNamed } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

type State = {
  methodWrapper?: t.Identifier | t.SequenceExpression;
};

export default declare<State>(function (api) {
  api.assertVersion(REQUIRED_VERSION(7));

  // Todo(BABEL 8): Consider default it to false
  const noNewArrows = api.assumption("noNewArrows") ?? true;
  const ignoreFunctionLength = api.assumption("ignoreFunctionLength") ?? false;

  if (!process.env.BABEL_8_BREAKING) {
    const { method, module } = arguments[1];

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
  }

  return {
    name: "transform-async-to-generator",

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(
          path,
          { wrapAsync: state.addHelper("asyncToGenerator") },
          noNewArrows,
          ignoreFunctionLength,
        );
      },
    },
  };
});
