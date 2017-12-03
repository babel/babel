"use strict";

exports.__esModule = true;
exports.default = _default;

var _builtInDefinitions = require("./built-in-definitions");

var _debug = require("./debug");

var _utils = require("./utils");

function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function getType(target) {
  if (Array.isArray(target)) return "array";
  return typeof target;
}

function _default(_ref) {
  var t = _ref.types;

  function addImport(path, builtIn, builtIns) {
    if (builtIn && !builtIns.has(builtIn)) {
      builtIns.add(builtIn);
      var programPath = path.find(function (path) {
        return path.isProgram();
      });
      programPath.unshiftContainer("body", (0, _utils.createImport)(t, builtIn));
    }
  }

  function addUnsupported(path, polyfills, builtIn, builtIns) {
    if (Array.isArray(builtIn)) {
      for (var _iterator = builtIn, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var _i2 = _ref2;

        if (polyfills.has(_i2)) {
          addImport(path, _i2, builtIns);
        }
      }
    } else {
      if (polyfills.has(builtIn)) {
        addImport(path, builtIn, builtIns);
      }
    }
  }

  var addAndRemovePolyfillImports = {
    ImportDeclaration: function ImportDeclaration(path) {
      if (path.node.specifiers.length === 0 && (0, _utils.isPolyfillSource)(path.node.source.value)) {
        console.warn("\n  When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.\n  Please remove the `import '@babel/polyfill'` call or use `useBuiltIns: 'entry'` instead.");
        path.remove();
      }
    },
    Program: {
      enter: function enter(path) {
        path.get("body").forEach(function (bodyPath) {
          if ((0, _utils.isRequire)(t, bodyPath)) {
            console.warn("\n  When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.\n  Please remove the `require('@babel/polyfill')` call or use `useBuiltIns: 'entry'` instead.");
            bodyPath.remove();
          }
        });
      }
    },
    ReferencedIdentifier: function ReferencedIdentifier(path, state) {
      var node = path.node,
          parent = path.parent,
          scope = path.scope;
      if (t.isMemberExpression(parent)) return;
      if (!has(_builtInDefinitions.definitions.builtins, node.name)) return;
      if (scope.getBindingIdentifier(node.name)) return;
      var builtIn = _builtInDefinitions.definitions.builtins[node.name];
      addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
    },
    CallExpression: function CallExpression(path) {
      if (path.node.arguments.length) return;
      var callee = path.node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!callee.computed) return;

      if (!path.get("callee.property").matchesPattern("Symbol.iterator")) {
        return;
      }

      addImport(path, "web.dom.iterable", this.builtIns);
    },
    BinaryExpression: function BinaryExpression(path) {
      if (path.node.operator !== "in") return;
      if (!path.get("left").matchesPattern("Symbol.iterator")) return;
      addImport(path, "web.dom.iterable", this.builtIns);
    },
    YieldExpression: function YieldExpression(path) {
      if (!path.node.delegate) return;
      addImport(path, "web.dom.iterable", this.builtIns);
    },
    MemberExpression: {
      enter: function enter(path, state) {
        if (!path.isReferenced()) return;
        var node = path.node;
        var obj = node.object;
        var prop = node.property;
        if (!t.isReferenced(obj, node)) return;
        var instanceType;
        var evaluatedPropType = obj.name;
        var propName = prop.name;

        if (node.computed) {
          if (t.isStringLiteral(prop)) {
            propName = prop.value;
          } else {
            var res = path.get("property").evaluate();

            if (res.confident && res.value) {
              propName = res.value;
            }
          }
        }

        if (path.scope.getBindingIdentifier(obj.name)) {
          var result = path.get("object").evaluate();

          if (result.value) {
            instanceType = getType(result.value);
          } else if (result.deopt && result.deopt.isIdentifier()) {
            evaluatedPropType = result.deopt.node.name;
          }
        }

        if (has(_builtInDefinitions.definitions.staticMethods, evaluatedPropType)) {
          var staticMethods = _builtInDefinitions.definitions.staticMethods[evaluatedPropType];

          if (has(staticMethods, propName)) {
            var builtIn = staticMethods[propName];
            addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
          }
        }

        if (has(_builtInDefinitions.definitions.instanceMethods, propName)) {
          var _builtIn = _builtInDefinitions.definitions.instanceMethods[propName];

          if (instanceType) {
            _builtIn = _builtIn.filter(function (item) {
              return item.includes(instanceType);
            });
          }

          addUnsupported(path, state.opts.polyfills, _builtIn, this.builtIns);
        }
      },
      exit: function exit(path, state) {
        if (!path.isReferenced()) return;
        var node = path.node;
        var obj = node.object;
        if (!has(_builtInDefinitions.definitions.builtins, obj.name)) return;
        if (path.scope.getBindingIdentifier(obj.name)) return;
        var builtIn = _builtInDefinitions.definitions.builtins[obj.name];
        addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
      }
    },
    VariableDeclarator: function VariableDeclarator(path, state) {
      if (!path.isReferenced()) return;
      var node = path.node;
      var obj = node.init;
      if (!t.isObjectPattern(node.id)) return;
      if (!t.isReferenced(obj, node)) return;
      if (obj && path.scope.getBindingIdentifier(obj.name)) return;

      for (var _iterator2 = node.id.properties, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i3 >= _iterator2.length) break;
          _ref3 = _iterator2[_i3++];
        } else {
          _i3 = _iterator2.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var _prop = _ref3;
        _prop = _prop.key;

        if (!node.computed && t.isIdentifier(_prop) && has(_builtInDefinitions.definitions.instanceMethods, _prop.name)) {
          var builtIn = _builtInDefinitions.definitions.instanceMethods[_prop.name];
          addUnsupported(path, state.opts.polyfills, builtIn, this.builtIns);
        }
      }
    },
    Function: function Function(path, state) {
      if (!this.usesRegenerator && (path.node.generator || path.node.async)) {
        this.usesRegenerator = true;

        if (state.opts.regenerator) {
          addImport(path, "regenerator-runtime", this.builtIns);
        }
      }
    }
  };
  return {
    name: "use-built-ins",
    pre: function pre() {
      this.builtIns = new Set();
      this.usesRegenerator = false;
    },
    post: function post() {
      var _opts = this.opts,
          debug = _opts.debug,
          onDebug = _opts.onDebug;

      if (debug) {
        (0, _debug.logUsagePolyfills)(this.builtIns, this.file.opts.filename, onDebug);
      }
    },
    visitor: addAndRemovePolyfillImports
  };
}