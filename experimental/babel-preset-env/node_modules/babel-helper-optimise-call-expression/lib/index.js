"use strict";

exports.__esModule = true;

exports.default = function (callee, thisNode, args) {
  if (args.length === 1 && t.isSpreadElement(args[0]) && t.isIdentifier(args[0].argument, { name: "arguments" })) {
    return t.callExpression(t.memberExpression(callee, t.identifier("apply")), [thisNode, args[0].argument]);
  } else {
    return t.callExpression(t.memberExpression(callee, t.identifier("call")), [thisNode].concat(args));
  }
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports["default"];