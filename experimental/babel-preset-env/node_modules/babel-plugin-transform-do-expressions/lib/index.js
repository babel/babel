"use strict";

exports.__esModule = true;

exports.default = function () {
  return {
    inherits: require("babel-plugin-syntax-do-expressions"),

    visitor: {
      DoExpression: function DoExpression(path) {
        var body = path.node.body.body;
        if (body.length) {
          path.replaceWithMultiple(body);
        } else {
          path.replaceWith(path.scope.buildUndefinedNode());
        }
      }
    }
  };
};

module.exports = exports["default"];