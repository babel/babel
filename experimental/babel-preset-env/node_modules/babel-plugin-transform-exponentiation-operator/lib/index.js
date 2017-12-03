"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    inherits: require("babel-plugin-syntax-exponentiation-operator"),

    visitor: (0, _babelHelperBuilderBinaryAssignmentOperatorVisitor2.default)({
      operator: "**",

      build: function build(left, right) {
        return t.callExpression(t.memberExpression(t.identifier("Math"), t.identifier("pow")), [left, right]);
      }
    })
  };
};

var _babelHelperBuilderBinaryAssignmentOperatorVisitor = require("babel-helper-builder-binary-assignment-operator-visitor");

var _babelHelperBuilderBinaryAssignmentOperatorVisitor2 = _interopRequireDefault(_babelHelperBuilderBinaryAssignmentOperatorVisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];