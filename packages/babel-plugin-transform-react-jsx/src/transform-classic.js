import { declare } from "@babel/helper-plugin-utils";
import jsx from "@babel/plugin-syntax-jsx";
import helper from "@babel/helper-builder-react-jsx";
import { types as t } from "@babel/core";

const DEFAULT = {
  pragma: "React.createElement",
  pragmaFrag: "React.Fragment",
};

export default declare((api, options) => {
  const THROW_IF_NAMESPACE =
    options.throwIfNamespace === undefined ? true : !!options.throwIfNamespace;

  const PRAGMA_DEFAULT = options.pragma || DEFAULT.pragma;
  const PRAGMA_FRAG_DEFAULT = options.pragmaFrag || DEFAULT.pragmaFrag;
  const PURE_ANNOTATION = options.pure;

  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;
  const JSX_FRAG_ANNOTATION_REGEX = /\*?\s*@jsxFrag\s+([^\s]+)/;

  // returns a closure that returns an identifier or memberExpression node
  // based on the given id
  const createIdentifierParser = (id: string) => () => {
    return id
      .split(".")
      .map(name => t.identifier(name))
      .reduce((object, property) => t.memberExpression(object, property));
  };

  const visitor = helper({
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
      state.callee = pass.get("jsxIdentifier")();
      state.pure = PURE_ANNOTATION ?? !pass.get("pragmaSet");
    },

    throwIfNamespace: THROW_IF_NAMESPACE,
  });

  visitor.Program = {
    enter(path, state) {
      const { file } = state;

      let pragma = PRAGMA_DEFAULT;
      let pragmaFrag = PRAGMA_FRAG_DEFAULT;
      let pragmaSet = !!options.pragma;
      let pragmaFragSet = !!options.pragma;

      if (file.ast.comments) {
        for (const comment of (file.ast.comments: Array<Object>)) {
          const jsxMatches = JSX_ANNOTATION_REGEX.exec(comment.value);
          if (jsxMatches) {
            pragma = jsxMatches[1];
            pragmaSet = true;
          }
          const jsxFragMatches = JSX_FRAG_ANNOTATION_REGEX.exec(comment.value);
          if (jsxFragMatches) {
            pragmaFrag = jsxFragMatches[1];
            pragmaFragSet = true;
          }
        }
      }

      state.set("jsxIdentifier", createIdentifierParser(pragma));
      state.set("jsxFragIdentifier", createIdentifierParser(pragmaFrag));
      state.set("usedFragment", false);
      state.set("pragmaSet", pragmaSet);
      state.set("pragmaFragSet", pragmaFragSet);
    },
    exit(path, state) {
      if (
        state.get("pragmaSet") &&
        state.get("usedFragment") &&
        !state.get("pragmaFragSet")
      ) {
        throw new Error(
          "transform-react-jsx: pragma has been set but " +
            "pragmaFrag has not been set",
        );
      }
    },
  };

  visitor.JSXAttribute = function(path) {
    if (t.isJSXElement(path.node.value)) {
      path.node.value = t.jsxExpressionContainer(path.node.value);
    }
  };

  return {
    name: "transform-react-jsx",
    inherits: jsx,
    visitor,
  };
});
