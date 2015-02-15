"use strict";

var react = require("../../helpers/react");
var t     = require("../../../types");

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

  post: function (state) {
    state.callee = t.memberExpression(t.identifier("React"), t.identifier("createElement"));
  }
});
