/* eslint max-len: 0 */

import { default as helperBuilderReactJSX } from "babel-helper-builder-react-jsx";
import { default as syntaxJSX } from "babel-plugin-syntax-jsx";

export default function ({ types: t }) {
  let JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

  let visitor = helperBuilderReactJSX({
    pre(state) {
      let tagName = state.tagName;
      let args    = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    }
  });

  visitor.Program = function (path, state) {
    let { file } = state;
    let id = state.opts.pragma || "React.createElement";

    for (let comment of (file.ast.comments: Array<Object>)) {
      let matches = JSX_ANNOTATION_REGEX.exec(comment.value);
      if (matches) {
        id = matches[1];
        if (id === "React.DOM") {
          throw file.buildCodeFrameError(comment, "The @jsx React.DOM pragma has been deprecated as of React 0.12");
        } else {
          break;
        }
      }
    }

    state.set(
      "jsxIdentifier",
      () => id.split(".").map((name) => t.identifier(name)).reduce(
        (object, property) => t.memberExpression(object, property)
      )
    );
  };

  return {
    inherits: syntaxJSX,
    visitor
  };
}
