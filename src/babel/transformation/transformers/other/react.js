import * as react from "../../helpers/react";
import * as t from "../../../types";

var JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;

export function Program(node, parent, scope, file) {
  var id = file.opts.jsxPragma;

  for (var i = 0; i < file.ast.comments.length; i++) {
    var comment = file.ast.comments[i];
    var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
    if (matches) {
      id = matches[1];
      if (id === "React.DOM") {
        throw file.errorWithNode(comment, "The @jsx React.DOM pragma has been deprecated as of React 0.12");
      } else {
        break;
      }
    }
  }

  file.set("jsxIdentifier", id.split(".").map(t.identifier).reduce(function (object, property) {
    return t.memberExpression(object, property);
  }));
}

require("../../helpers/build-react-transformer")(exports, {
  pre(state) {
    var tagName = state.tagName;
    var args    = state.args;
    if (react.isCompatTag(tagName)) {
      args.push(t.literal(tagName));
    } else {
      args.push(state.tagExpr);
    }
  },

  post(state, file) {
    state.callee = file.get("jsxIdentifier");
  }
});
