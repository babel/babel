"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function (_ref) {
  var t = _ref.types;

  var IGNORE_REASSIGNMENT_SYMBOL = (0, _symbol2.default)();

  var reassignmentVisitor = {
    "AssignmentExpression|UpdateExpression": function AssignmentExpressionUpdateExpression(path) {
      if (path.node[IGNORE_REASSIGNMENT_SYMBOL]) return;
      path.node[IGNORE_REASSIGNMENT_SYMBOL] = true;

      var arg = path.get(path.isAssignmentExpression() ? "left" : "argument");
      if (!arg.isIdentifier()) return;

      var name = arg.node.name;

      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      var exportedNames = this.exports[name];
      if (!exportedNames) return;

      var node = path.node;

      var isPostUpdateExpression = path.isUpdateExpression() && !node.prefix;
      if (isPostUpdateExpression) {
        if (node.operator === "++") node = t.binaryExpression("+", node.argument, t.numericLiteral(1));else if (node.operator === "--") node = t.binaryExpression("-", node.argument, t.numericLiteral(1));else isPostUpdateExpression = false;
      }

      for (var _iterator = exportedNames, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var exportedName = _ref2;

        node = this.buildCall(exportedName, node).expression;
      }

      if (isPostUpdateExpression) node = t.sequenceExpression([node, path.node]);

      path.replaceWith(node);
    }
  };

  return {
    visitor: {
      CallExpression: function CallExpression(path, state) {
        if (path.node.callee.type === TYPE_IMPORT) {
          var contextIdent = state.contextIdent;
          path.replaceWith(t.callExpression(t.memberExpression(contextIdent, t.identifier("import")), path.node.arguments));
        }
      },
      ReferencedIdentifier: function ReferencedIdentifier(path, state) {
        if (path.node.name == "__moduleName" && !path.scope.hasBinding("__moduleName")) {
          path.replaceWith(t.memberExpression(state.contextIdent, t.identifier("id")));
        }
      },


      Program: {
        enter: function enter(path, state) {
          state.contextIdent = path.scope.generateUidIdentifier("context");
        },
        exit: function exit(path, state) {
          var exportIdent = path.scope.generateUidIdentifier("export");
          var contextIdent = state.contextIdent;

          var exportNames = (0, _create2.default)(null);
          var modules = [];

          var beforeBody = [];
          var setters = [];
          var sources = [];
          var variableIds = [];
          var removedPaths = [];

          function addExportName(key, val) {
            exportNames[key] = exportNames[key] || [];
            exportNames[key].push(val);
          }

          function pushModule(source, key, specifiers) {
            var module = void 0;
            modules.forEach(function (m) {
              if (m.key === source) {
                module = m;
              }
            });
            if (!module) {
              modules.push(module = { key: source, imports: [], exports: [] });
            }
            module[key] = module[key].concat(specifiers);
          }

          function buildExportCall(name, val) {
            return t.expressionStatement(t.callExpression(exportIdent, [t.stringLiteral(name), val]));
          }

          var body = path.get("body");

          var canHoist = true;
          for (var _iterator2 = body, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
            var _ref3;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref3 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref3 = _i2.value;
            }

            var _path = _ref3;

            if (_path.isExportDeclaration()) _path = _path.get("declaration");
            if (_path.isVariableDeclaration() && _path.node.kind !== "var") {
              canHoist = false;
              break;
            }
          }

          for (var _iterator3 = body, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
            var _ref4;

            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref4 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref4 = _i3.value;
            }

            var _path2 = _ref4;

            if (canHoist && _path2.isFunctionDeclaration()) {
              beforeBody.push(_path2.node);
              removedPaths.push(_path2);
            } else if (_path2.isImportDeclaration()) {
              var source = _path2.node.source.value;
              pushModule(source, "imports", _path2.node.specifiers);
              for (var name in _path2.getBindingIdentifiers()) {
                _path2.scope.removeBinding(name);
                variableIds.push(t.identifier(name));
              }
              _path2.remove();
            } else if (_path2.isExportAllDeclaration()) {
              pushModule(_path2.node.source.value, "exports", _path2.node);
              _path2.remove();
            } else if (_path2.isExportDefaultDeclaration()) {
              var declar = _path2.get("declaration");
              if (declar.isClassDeclaration() || declar.isFunctionDeclaration()) {
                var id = declar.node.id;
                var nodes = [];

                if (id) {
                  nodes.push(declar.node);
                  nodes.push(buildExportCall("default", id));
                  addExportName(id.name, "default");
                } else {
                  nodes.push(buildExportCall("default", t.toExpression(declar.node)));
                }

                if (!canHoist || declar.isClassDeclaration()) {
                  _path2.replaceWithMultiple(nodes);
                } else {
                  beforeBody = beforeBody.concat(nodes);
                  removedPaths.push(_path2);
                }
              } else {
                _path2.replaceWith(buildExportCall("default", declar.node));
              }
            } else if (_path2.isExportNamedDeclaration()) {
              var _declar = _path2.get("declaration");

              if (_declar.node) {
                _path2.replaceWith(_declar);

                var _nodes = [];
                var bindingIdentifiers = void 0;
                if (_path2.isFunction()) {
                  var node = _declar.node;
                  var _name = node.id.name;
                  if (canHoist) {
                    addExportName(_name, _name);
                    beforeBody.push(node);
                    beforeBody.push(buildExportCall(_name, node.id));
                    removedPaths.push(_path2);
                  } else {
                    var _bindingIdentifiers;

                    bindingIdentifiers = (_bindingIdentifiers = {}, _bindingIdentifiers[_name] = node.id, _bindingIdentifiers);
                  }
                } else {
                  bindingIdentifiers = _declar.getBindingIdentifiers();
                }
                for (var _name2 in bindingIdentifiers) {
                  addExportName(_name2, _name2);
                  _nodes.push(buildExportCall(_name2, t.identifier(_name2)));
                }
                _path2.insertAfter(_nodes);
              } else {
                var specifiers = _path2.node.specifiers;
                if (specifiers && specifiers.length) {
                  if (_path2.node.source) {
                    pushModule(_path2.node.source.value, "exports", specifiers);
                    _path2.remove();
                  } else {
                    var _nodes2 = [];

                    for (var _iterator7 = specifiers, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
                      var _ref8;

                      if (_isArray7) {
                        if (_i7 >= _iterator7.length) break;
                        _ref8 = _iterator7[_i7++];
                      } else {
                        _i7 = _iterator7.next();
                        if (_i7.done) break;
                        _ref8 = _i7.value;
                      }

                      var specifier = _ref8;

                      _nodes2.push(buildExportCall(specifier.exported.name, specifier.local));
                      addExportName(specifier.local.name, specifier.exported.name);
                    }

                    _path2.replaceWithMultiple(_nodes2);
                  }
                }
              }
            }
          }

          modules.forEach(function (specifiers) {
            var setterBody = [];
            var target = path.scope.generateUidIdentifier(specifiers.key);

            for (var _iterator4 = specifiers.imports, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
              var _ref5;

              if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref5 = _iterator4[_i4++];
              } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref5 = _i4.value;
              }

              var specifier = _ref5;

              if (t.isImportNamespaceSpecifier(specifier)) {
                setterBody.push(t.expressionStatement(t.assignmentExpression("=", specifier.local, target)));
              } else if (t.isImportDefaultSpecifier(specifier)) {
                specifier = t.importSpecifier(specifier.local, t.identifier("default"));
              }

              if (t.isImportSpecifier(specifier)) {
                setterBody.push(t.expressionStatement(t.assignmentExpression("=", specifier.local, t.memberExpression(target, specifier.imported))));
              }
            }

            if (specifiers.exports.length) {
              var exportObjRef = path.scope.generateUidIdentifier("exportObj");

              setterBody.push(t.variableDeclaration("var", [t.variableDeclarator(exportObjRef, t.objectExpression([]))]));

              for (var _iterator5 = specifiers.exports, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
                var _ref6;

                if (_isArray5) {
                  if (_i5 >= _iterator5.length) break;
                  _ref6 = _iterator5[_i5++];
                } else {
                  _i5 = _iterator5.next();
                  if (_i5.done) break;
                  _ref6 = _i5.value;
                }

                var node = _ref6;

                if (t.isExportAllDeclaration(node)) {
                  setterBody.push(buildExportAll({
                    KEY: path.scope.generateUidIdentifier("key"),
                    EXPORT_OBJ: exportObjRef,
                    TARGET: target
                  }));
                } else if (t.isExportSpecifier(node)) {
                  setterBody.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(exportObjRef, node.exported), t.memberExpression(target, node.local))));
                } else {}
              }

              setterBody.push(t.expressionStatement(t.callExpression(exportIdent, [exportObjRef])));
            }

            sources.push(t.stringLiteral(specifiers.key));
            setters.push(t.functionExpression(null, [target], t.blockStatement(setterBody)));
          });

          var moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          if (canHoist) {
            (0, _babelHelperHoistVariables2.default)(path, function (id) {
              return variableIds.push(id);
            });
          }

          if (variableIds.length) {
            beforeBody.unshift(t.variableDeclaration("var", variableIds.map(function (id) {
              return t.variableDeclarator(id);
            })));
          }

          path.traverse(reassignmentVisitor, {
            exports: exportNames,
            buildCall: buildExportCall,
            scope: path.scope
          });

          for (var _iterator6 = removedPaths, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
            var _ref7;

            if (_isArray6) {
              if (_i6 >= _iterator6.length) break;
              _ref7 = _iterator6[_i6++];
            } else {
              _i6 = _iterator6.next();
              if (_i6.done) break;
              _ref7 = _i6.value;
            }

            var _path3 = _ref7;

            _path3.remove();
          }

          path.node.body = [buildTemplate({
            SYSTEM_REGISTER: t.memberExpression(t.identifier(state.opts.systemGlobal || "System"), t.identifier("register")),
            BEFORE_BODY: beforeBody,
            MODULE_NAME: moduleName,
            SETTERS: setters,
            SOURCES: sources,
            BODY: path.node.body,
            EXPORT_IDENTIFIER: exportIdent,
            CONTEXT_IDENTIFIER: contextIdent
          })];
        }
      }
    }
  };
};

var _babelHelperHoistVariables = require("babel-helper-hoist-variables");

var _babelHelperHoistVariables2 = _interopRequireDefault(_babelHelperHoistVariables);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildTemplate = (0, _babelTemplate2.default)("\n  SYSTEM_REGISTER(MODULE_NAME, [SOURCES], function (EXPORT_IDENTIFIER, CONTEXT_IDENTIFIER) {\n    \"use strict\";\n    BEFORE_BODY;\n    return {\n      setters: [SETTERS],\n      execute: function () {\n        BODY;\n      }\n    };\n  });\n");

var buildExportAll = (0, _babelTemplate2.default)("\n  for (var KEY in TARGET) {\n    if (KEY !== \"default\" && KEY !== \"__esModule\") EXPORT_OBJ[KEY] = TARGET[KEY];\n  }\n");

var TYPE_IMPORT = "Import";

module.exports = exports["default"];