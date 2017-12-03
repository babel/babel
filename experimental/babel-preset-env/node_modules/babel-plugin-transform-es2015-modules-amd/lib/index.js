"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.default = function (_ref) {
  var t = _ref.types;

  function isValidRequireCall(path) {
    if (!path.isCallExpression()) return false;
    if (!path.get("callee").isIdentifier({ name: "require" })) return false;
    if (path.scope.getBinding("require")) return false;

    var args = path.get("arguments");
    if (args.length !== 1) return false;

    var arg = args[0];
    if (!arg.isStringLiteral()) return false;

    return true;
  }

  var amdVisitor = {
    ReferencedIdentifier: function ReferencedIdentifier(_ref2) {
      var node = _ref2.node,
          scope = _ref2.scope;

      if (node.name === "exports" && !scope.getBinding("exports")) {
        this.hasExports = true;
      }

      if (node.name === "module" && !scope.getBinding("module")) {
        this.hasModule = true;
      }
    },
    CallExpression: function CallExpression(path) {
      if (!isValidRequireCall(path)) return;
      this.bareSources.push(path.node.arguments[0]);
      path.remove();
    },
    VariableDeclarator: function VariableDeclarator(path) {
      var id = path.get("id");
      if (!id.isIdentifier()) return;

      var init = path.get("init");
      if (!isValidRequireCall(init)) return;

      var source = init.node.arguments[0];
      this.sourceNames[source.value] = true;
      this.sources.push([id.node, source]);

      path.remove();
    }
  };

  return {
    inherits: require("babel-plugin-transform-es2015-modules-commonjs"),

    pre: function pre() {
      this.sources = [];
      this.sourceNames = (0, _create2.default)(null);

      this.bareSources = [];

      this.hasExports = false;
      this.hasModule = false;
    },


    visitor: {
      Program: {
        exit: function exit(path) {
          var _this = this;

          if (this.ran) return;
          this.ran = true;

          path.traverse(amdVisitor, this);

          var params = this.sources.map(function (source) {
            return source[0];
          });
          var sources = this.sources.map(function (source) {
            return source[1];
          });

          sources = sources.concat(this.bareSources.filter(function (str) {
            return !_this.sourceNames[str.value];
          }));

          var moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          if (this.hasExports) {
            sources.unshift(t.stringLiteral("exports"));
            params.unshift(t.identifier("exports"));
          }

          if (this.hasModule) {
            sources.unshift(t.stringLiteral("module"));
            params.unshift(t.identifier("module"));
          }

          var node = path.node;

          var factory = buildFactory({
            PARAMS: params,
            BODY: node.body
          });
          factory.expression.body.directives = node.directives;
          node.directives = [];

          node.body = [buildDefine({
            MODULE_NAME: moduleName,
            SOURCES: sources,
            FACTORY: factory
          })];
        }
      }
    }
  };
};

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildDefine = (0, _babelTemplate2.default)("\n  define(MODULE_NAME, [SOURCES], FACTORY);\n");

var buildFactory = (0, _babelTemplate2.default)("\n  (function (PARAMS) {\n    BODY;\n  })\n");

module.exports = exports["default"];