"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  var yieldStarVisitor = {
    Function: function Function(path) {
      path.skip();
    },
    YieldExpression: function YieldExpression(_ref2, state) {
      var node = _ref2.node;

      if (!node.delegate) return;
      var callee = state.addHelper("asyncGeneratorDelegate");
      node.argument = t.callExpression(callee, [t.callExpression(state.addHelper("asyncIterator"), [node.argument]), t.memberExpression(state.addHelper("asyncGenerator"), t.identifier("await"))]);
    }
  };

  return {
    inherits: require("babel-plugin-syntax-async-generators"),
    visitor: {
      Function: function Function(path, state) {
        if (!path.node.async || !path.node.generator) return;

        path.traverse(yieldStarVisitor, state);

        (0, _babelHelperRemapAsyncToGenerator2.default)(path, state.file, {
          wrapAsync: t.memberExpression(state.addHelper("asyncGenerator"), t.identifier("wrap")),
          wrapAwait: t.memberExpression(state.addHelper("asyncGenerator"), t.identifier("await"))
        });
      }
    }
  };
};

var _babelHelperRemapAsyncToGenerator = require("babel-helper-remap-async-to-generator");

var _babelHelperRemapAsyncToGenerator2 = _interopRequireDefault(_babelHelperRemapAsyncToGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];