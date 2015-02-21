"use strict";

var react = require("../../helpers/react");
var t     = require("../../../types");

var JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;

exports.Program = function (node, parent, scope, file) {
  var id = "React.createElement";

  var comment = file.ast.comments[0];
  if (comment) {
    var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
    if (matches) id = matches[1];
  }

  file.set("jsxIdentifier", id.split(".").map(t.identifier).reduce(function (object, property) {
    return t.memberExpression(object, property);
  }));
};

require("../../helpers/build-react-transformer")(exports, {
  pre: function (state) {
    var tagName = state.tagName;
    var args    = state.args;
    if (react.isCompatTag(tagName)) {
      args.push(t.literal(tagName));
    } else {
      args.push(state.tagExpr);
    }
  },

  post: function (state, file) {
    state.callee = file.get("jsxIdentifier");
  }
});
