import react from "../../helpers/react";
import t from "../../../types";

export function manipulateOptions(opts) {
  opts.blacklist.push("react");
}

export var optional = true;

require("../../helpers/build-react-transformer")(exports, {
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
