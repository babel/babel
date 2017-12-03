"use strict";

exports.__esModule = true;

exports.default = function () {
  return {
    visitor: {
      RegExpLiteral: function RegExpLiteral(_ref) {
        var node = _ref.node;

        if (!regex.is(node, "u")) return;
        node.pattern = (0, _regexpuCore2.default)(node.pattern, node.flags);
        regex.pullFlag(node, "u");
      }
    }
  };
};

var _regexpuCore = require("regexpu-core");

var _regexpuCore2 = _interopRequireDefault(_regexpuCore);

var _babelHelperRegex = require("babel-helper-regex");

var regex = _interopRequireWildcard(_babelHelperRegex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];