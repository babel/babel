"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function isValidDefine(path) {
    if (!path.isExpressionStatement()) return;

    var expr = path.get("expression");
    if (!expr.isCallExpression()) return false;
    if (!expr.get("callee").isIdentifier({ name: "define" })) return false;

    var args = expr.get("arguments");
    if (args.length === 3 && !args.shift().isStringLiteral()) return false;
    if (args.length !== 2) return false;
    if (!args.shift().isArrayExpression()) return false;
    if (!args.shift().isFunctionExpression()) return false;

    return true;
  }

  return {
    inherits: require("babel-plugin-transform-es2015-modules-amd"),

    visitor: {
      Program: {
        exit: function exit(path, state) {
          var last = path.get("body").pop();
          if (!isValidDefine(last)) return;

          var call = last.node.expression;
          var args = call.arguments;

          var moduleName = args.length === 3 ? args.shift() : null;
          var amdArgs = call.arguments[0];
          var func = call.arguments[1];
          var browserGlobals = state.opts.globals || {};

          var commonArgs = amdArgs.elements.map(function (arg) {
            if (arg.value === "module" || arg.value === "exports") {
              return t.identifier(arg.value);
            } else {
              return t.callExpression(t.identifier("require"), [arg]);
            }
          });

          var browserArgs = amdArgs.elements.map(function (arg) {
            if (arg.value === "module") {
              return t.identifier("mod");
            } else if (arg.value === "exports") {
              return t.memberExpression(t.identifier("mod"), t.identifier("exports"));
            } else {
              var memberExpression = void 0;

              if (state.opts.exactGlobals) {
                var globalRef = browserGlobals[arg.value];
                if (globalRef) {
                  memberExpression = globalRef.split(".").reduce(function (accum, curr) {
                    return t.memberExpression(accum, t.identifier(curr));
                  }, t.identifier("global"));
                } else {
                  memberExpression = t.memberExpression(t.identifier("global"), t.identifier(t.toIdentifier(arg.value)));
                }
              } else {
                var requireName = (0, _path.basename)(arg.value, (0, _path.extname)(arg.value));
                var globalName = browserGlobals[requireName] || requireName;
                memberExpression = t.memberExpression(t.identifier("global"), t.identifier(t.toIdentifier(globalName)));
              }

              return memberExpression;
            }
          });

          var moduleNameOrBasename = moduleName ? moduleName.value : this.file.opts.basename;
          var globalToAssign = t.memberExpression(t.identifier("global"), t.identifier(t.toIdentifier(moduleNameOrBasename)));
          var prerequisiteAssignments = null;

          if (state.opts.exactGlobals) {
            var globalName = browserGlobals[moduleNameOrBasename];

            if (globalName) {
              prerequisiteAssignments = [];

              var members = globalName.split(".");
              globalToAssign = members.slice(1).reduce(function (accum, curr) {
                prerequisiteAssignments.push(buildPrerequisiteAssignment({ GLOBAL_REFERENCE: accum }));
                return t.memberExpression(accum, t.identifier(curr));
              }, t.memberExpression(t.identifier("global"), t.identifier(members[0])));
            }
          }

          var globalExport = buildGlobalExport({
            BROWSER_ARGUMENTS: browserArgs,
            PREREQUISITE_ASSIGNMENTS: prerequisiteAssignments,
            GLOBAL_TO_ASSIGN: globalToAssign
          });

          last.replaceWith(buildWrapper({
            MODULE_NAME: moduleName,
            AMD_ARGUMENTS: amdArgs,
            COMMON_ARGUMENTS: commonArgs,
            GLOBAL_EXPORT: globalExport,
            FUNC: func
          }));
        }
      }
    }
  };
};

var _path = require("path");

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildPrerequisiteAssignment = (0, _babelTemplate2.default)("\n  GLOBAL_REFERENCE = GLOBAL_REFERENCE || {}\n");

var buildGlobalExport = (0, _babelTemplate2.default)("\n  var mod = { exports: {} };\n  factory(BROWSER_ARGUMENTS);\n  PREREQUISITE_ASSIGNMENTS\n  GLOBAL_TO_ASSIGN = mod.exports;\n");

var buildWrapper = (0, _babelTemplate2.default)("\n  (function (global, factory) {\n    if (typeof define === \"function\" && define.amd) {\n      define(MODULE_NAME, AMD_ARGUMENTS, factory);\n    } else if (typeof exports !== \"undefined\") {\n      factory(COMMON_ARGUMENTS);\n    } else {\n      GLOBAL_EXPORT\n    }\n  })(this, FUNC);\n");

module.exports = exports["default"];