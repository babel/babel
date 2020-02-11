import jsx from "@babel/plugin-syntax-jsx";
import { helper } from "@babel/helper-builder-react-jsx-experimental";
import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare((api, options) => {
  const PURE_ANNOTATION = options.pure;

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
      if (pass.get("@babel/plugin-react-jsx/runtime") === "classic") {
        state.createElementCallee = pass.get(
          "@babel/plugin-react-jsx/createElementIdentifier",
        )();

        state.pure =
          PURE_ANNOTATION ?? !pass.get("@babel/plugin-react-jsx/pragmaSet");
      } else {
        state.jsxCallee = pass.get("@babel/plugin-react-jsx/jsxIdentifier")();
        state.jsxStaticCallee = pass.get(
          "@babel/plugin-react-jsx/jsxStaticIdentifier",
        )();
        state.createElementCallee = pass.get(
          "@babel/plugin-react-jsx/createElementIdentifier",
        )();

        state.pure =
          PURE_ANNOTATION ??
          !pass.get("@babel/plugin-react-jsx/importSourceSet");
      }
    },

    ...options,
    development: false,
  });

  return {
    name: "transform-react-jsx",
    inherits: jsx,
    visitor,
  };
});
