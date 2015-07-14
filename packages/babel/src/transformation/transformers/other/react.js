import * as react from "../../helpers/react";
import * as t from "../../../types";

/**
 * [Please add a description.]
 */

var JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;

export var metadata = {
  group: "builtin-advanced"
};

/**
 * [Please add a description.]
 */

export var visitor = require("../../helpers/build-react-transformer")({

  /**
   * [Please add a description.]
   */

  pre(state) {
    var tagName = state.tagName;
    var args    = state.args;
    if (react.isCompatTag(tagName)) {
      args.push(t.literal(tagName));
    } else {
      args.push(state.tagExpr);
    }
  },

  /**
   * [Please add a description.]
   */

  post(state, file) {
    state.callee = file.get("jsxIdentifier");
  }
});

/**
 * [Please add a description.]
 */

visitor.Program = function (node, parent, scope, file) {
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
};
