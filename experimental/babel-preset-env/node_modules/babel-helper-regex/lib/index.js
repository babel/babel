"use strict";

exports.__esModule = true;
exports.is = is;
exports.pullFlag = pullFlag;

var _pull = require("lodash/pull");

var _pull2 = _interopRequireDefault(_pull);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function is(node, flag) {
  return t.isRegExpLiteral(node) && node.flags.indexOf(flag) >= 0;
}

function pullFlag(node, flag) {
  var flags = node.flags.split("");
  if (node.flags.indexOf(flag) < 0) return;
  (0, _pull2.default)(flags, flag);
  node.flags = flags.join("");
}