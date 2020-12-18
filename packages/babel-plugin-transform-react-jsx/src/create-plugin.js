import jsx from "@babel/plugin-syntax-jsx";
import { helper } from "@babel/helper-builder-react-jsx-experimental";
import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default function createPlugin({ name, development }) {
  const DEFAULT_RUNTIME = development ? "automatic" : "classic";

  return declare((api, options) => {
    const { runtime = DEFAULT_RUNTIME, pure: PURE_ANNOTATION } = options;

    // TODO(Babel 8): This should throw
    if (development && runtime !== "automatic") {
      //throw new Error("JSX development mode only supports the 'automatic' runtime.");
    }

    const visitor = helper(api, {
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

      ...options,
      development,
      runtime,
    });

    return { name, visitor, inherits: jsx };
  });
}
