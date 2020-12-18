import jsx from "@babel/plugin-syntax-jsx";
import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

import { helper } from "./helper";

const DEFAULT = {
  importSource: "react",
  runtime: "automatic",
  pragma: "React.createElement",
  pragmaFrag: "React.Fragment",
};

export default function createPlugin({ name, development }) {
  return declare((api, options) => {
    const {
      pure: PURE_ANNOTATION,

      throwIfNamespace = true,
      filter,

      // TODO (Babel 8): Remove `useBuiltIns` & `useSpread`
      useSpread = false,
      useBuiltIns = false,

      runtime: RUNTIME_DEFAULT = development ? "automatic" : "classic",

      importSource: IMPORT_SOURCE_DEFAULT = DEFAULT.importSource,
      pragma: PRAGMA_DEFAULT = DEFAULT.pragma,
      pragmaFrag: PRAGMA_FRAG_DEFAULT = DEFAULT.pragmaFrag,
    } = options;

    // TOOD(Babel 8): If the runtime is 'automatic', we should throw when useSpread/useBuiltIns are set
    if (RUNTIME_DEFAULT === "classic") {
      if (typeof useSpread !== "boolean") {
        throw new Error(
          "transform-react-jsx currently only accepts a boolean option for " +
            "useSpread (defaults to false)",
        );
      }

      if (typeof useBuiltIns !== "boolean") {
        throw new Error(
          "transform-react-jsx currently only accepts a boolean option for " +
            "useBuiltIns (defaults to false)",
        );
      }

      if (useSpread && useBuiltIns) {
        throw new Error(
          "transform-react-jsx currently only accepts useBuiltIns or useSpread " +
            "but not both",
        );
      }
    }

    const visitor = helper({
      development,

      filter,
      useSpread,
      useBuiltIns,

      RUNTIME_DEFAULT,
      IMPORT_SOURCE_DEFAULT,
      PRAGMA_DEFAULT,
      PRAGMA_FRAG_DEFAULT,

      runtimeSet: !!options.runtime,
      sourceSet: !!options.importSource,
      pragmaSet: !!options.pragma,
      pragmaFragSet: !!options.pragmaFrag,

      pre(state) {
        const tagName = state.tagName;
        const args = state.args;
        if (t.react.isCompatTag(tagName)) {
          args.push(t.stringLiteral(tagName));
        } else {
          args.push(state.tagExpr);
        }
      },

      post(state, pass) {
        if (
          pass.get("@babel/plugin-react-jsx/runtime") === "classic" &&
          // TODO(Babel 8): We should throw if we are using the classic runtime in dev
          !development
        ) {
          state.createElementCallee = pass.get(
            "@babel/plugin-react-jsx/createElementIdentifier",
          )();

          state.pure =
            PURE_ANNOTATION ?? !pass.get("@babel/plugin-react-jsx/pragmaSet");
        } else {
          const getter = get => ({ enumerable: true, configurable: true, get });

          // TODO(Babel 8): helper-builder-react-jsx expects those properties to be AST nodes, but we want to
          // generate them lazily so that we only inject imports when needed.
          // These should actually be functions.
          Object.defineProperties(state, {
            jsxCallee: getter(
              pass.get("@babel/plugin-react-jsx/jsxIdentifier"),
            ),
            jsxStaticCallee: getter(
              pass.get("@babel/plugin-react-jsx/jsxStaticIdentifier"),
            ),
            createElementCallee: getter(
              pass.get("@babel/plugin-react-jsx/createElementIdentifier"),
            ),
          });

          state.pure =
            PURE_ANNOTATION ??
            !pass.get("@babel/plugin-react-jsx/importSourceSet");
        }
      },
    });

    return {
      name,
      inherits: jsx,
      visitor: {
        JSXNamespacedName(path) {
          if (throwIfNamespace) {
            throw path.buildCodeFrameError(
              `Namespace tags are not supported by default. React's JSX doesn't support namespace tags. \
You can set \`throwIfNamespace: false\` to bypass this warning.`,
            );
          }
        },

        JSXSpreadChild(path) {
          throw path.buildCodeFrameError(
            "Spread children are not supported in React.",
          );
        },

        ...visitor,
      },
    };
  });
}
