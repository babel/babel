/* eslint-disable */
"use strict";

exports.__esModule = true;

exports.default = function() {
  return {
    visitor: {
      CallExpression: function CallExpression(path) {
        var args = path.get("arguments");
        var evaluatedCallee = path.get("callee").evaluate();

        if (
          args.length &&
          args[0].evaluate().value === "undefined" &&
          evaluatedCallee.deopt.matchesPattern("t.identifier")
        ) {
          throw path.buildCodeFrameError(
            "Use path.scope.buildUndefinedNode() to create an undefined identifier directly."
          );
        }
      }
    }
  };
};
