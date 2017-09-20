"use strict";

exports.__esModule = true;

exports.default = function (babel) {
  const {
    types: t
  } = babel;
  return {
    inherits: _babelPluginSyntaxOptionalCatchBinding2.default,
    visitor: {
      CatchClause(path) {
        if (path.node.param === null || !t.isIdentifier(path.node.param)) {
          return;
        }

        const binding = path.scope.getOwnBinding(path.node.param.name);

        if (binding.constantViolations.length > 0) {
          return;
        }

        if (!binding.referenced) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      }

    }
  };
};

var _babelPluginSyntaxOptionalCatchBinding = require("babel-plugin-syntax-optional-catch-binding");

var _babelPluginSyntaxOptionalCatchBinding2 = _interopRequireDefault(_babelPluginSyntaxOptionalCatchBinding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }