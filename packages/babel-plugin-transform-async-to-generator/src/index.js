import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import { addNamed } from "@babel/helper-module-imports";
import { types as t } from "@babel/core";

export default function(api, options) {
  const { method, module } = options;

  if (method && module) {
    return {
      visitor: {
        Function(path, state) {
          if (!path.node.async || path.node.generator) return;

          let wrapAsync = state.methodWrapper;
          if (wrapAsync) {
            wrapAsync = t.cloneDeep(wrapAsync);
          } else {
            wrapAsync = state.methodWrapper = addNamed(path, method, module);
          }

          remapAsyncToGenerator(path, state.file, {
            wrapAsync,
          });
        },
      },
    };
  }

  return {
    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addHelper("asyncToGenerator"),
        });
      },
    },
  };
}
