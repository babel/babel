import { react } from "babel-types";
import * as t from "babel-types";

let JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;

export let metadata = {
  group: "builtin-advanced"
};

export let visitor = require("../../helpers/build-react-transformer")({
  pre(state) {
    let tagName = state.tagName;
    let args    = state.args;
    if (react.isCompatTag(tagName)) {
      args.push(t.stringLiteral(tagName));
    } else {
      args.push(state.tagExpr);
    }
  },

  post(state, file) {
    state.callee = file.get("jsxIdentifier");
  }
});

visitor.Program = function (node, parent, scope, file) {
  let id = file.opts.jsxPragma;

  for (let i = 0; i < file.ast.comments.length; i++) {
    let comment = file.ast.comments[i];
    let matches = JSX_ANNOTATION_REGEX.exec(comment.value);
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
};
