import { react } from "babel-types";
import * as t from "babel-types";

export function manipulateOptions(opts) {
  opts.blacklist.push("react");
}

export let metadata = {
  optional: true,
  group: "builtin-advanced"
};

export let visitor = require("../../helpers/build-react-transformer")({
  pre(state) {
    state.callee = state.tagExpr;
  },

  post(state) {
    if (react.isCompatTag(state.tagName)) {
      state.call = t.callExpression(
        t.memberExpression(
          t.memberExpression(t.identifier("React"), t.identifier("DOM")),
          state.tagExpr,
          t.isLiteral(state.tagExpr)
        ),
        state.args
      );
    }
  }
});
