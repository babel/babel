"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  var findBareSupers = {
    Super: function Super(path) {
      if (path.parentPath.isCallExpression({ callee: path.node })) {
        this.push(path.parentPath);
      }
    }
  };

  var referenceVisitor = {
    ReferencedIdentifier: function ReferencedIdentifier(path) {
      if (this.scope.hasOwnBinding(path.node.name)) {
        this.collision = true;
        path.skip();
      }
    }
  };

  var buildObjectDefineProperty = (0, _babelTemplate2.default)("\n    Object.defineProperty(REF, KEY, {\n      // configurable is false by default\n      enumerable: true,\n      writable: true,\n      value: VALUE\n    });\n  ");

  var buildClassPropertySpec = function buildClassPropertySpec(ref, _ref2) {
    var key = _ref2.key,
        value = _ref2.value,
        computed = _ref2.computed;
    return buildObjectDefineProperty({
      REF: ref,
      KEY: t.isIdentifier(key) && !computed ? t.stringLiteral(key.name) : key,
      VALUE: value ? value : t.identifier("undefined")
    });
  };

  var buildClassPropertyNonSpec = function buildClassPropertyNonSpec(ref, _ref3) {
    var key = _ref3.key,
        value = _ref3.value,
        computed = _ref3.computed;
    return t.expressionStatement(t.assignmentExpression("=", t.memberExpression(ref, key, computed || t.isLiteral(key)), value));
  };

  return {
    inherits: require("babel-plugin-syntax-class-properties"),

    visitor: {
      Class: function Class(path, state) {
        var buildClassProperty = state.opts.spec ? buildClassPropertySpec : buildClassPropertyNonSpec;
        var isDerived = !!path.node.superClass;
        var constructor = void 0;
        var props = [];
        var body = path.get("body");

        for (var _iterator = body.get("body"), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
          var _ref4;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref4 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref4 = _i.value;
          }

          var _path = _ref4;

          if (_path.isClassProperty()) {
            props.push(_path);
          } else if (_path.isClassMethod({ kind: "constructor" })) {
            constructor = _path;
          }
        }

        if (!props.length) return;

        var nodes = [];
        var ref = void 0;

        if (path.isClassExpression() || !path.node.id) {
          (0, _babelHelperFunctionName2.default)(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          ref = path.node.id;
        }

        var instanceBody = [];

        for (var _iterator2 = props, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
          var _ref5;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref5 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref5 = _i2.value;
          }

          var _prop = _ref5;

          var propNode = _prop.node;
          if (propNode.decorators && propNode.decorators.length > 0) continue;

          if (!state.opts.spec && !propNode.value) continue;

          var isStatic = propNode.static;

          if (isStatic) {
            nodes.push(buildClassProperty(ref, propNode));
          } else {
            if (!propNode.value) continue;
            instanceBody.push(buildClassProperty(t.thisExpression(), propNode));
          }
        }

        if (instanceBody.length) {
          if (!constructor) {
            var newConstructor = t.classMethod("constructor", t.identifier("constructor"), [], t.blockStatement([]));
            if (isDerived) {
              newConstructor.params = [t.restElement(t.identifier("args"))];
              newConstructor.body.body.push(t.returnStatement(t.callExpression(t.super(), [t.spreadElement(t.identifier("args"))])));
            }

            var _body$unshiftContaine = body.unshiftContainer("body", newConstructor);

            constructor = _body$unshiftContaine[0];
          }

          var collisionState = {
            collision: false,
            scope: constructor.scope
          };

          for (var _iterator3 = props, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
            var _ref6;

            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref6 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref6 = _i3.value;
            }

            var prop = _ref6;

            prop.traverse(referenceVisitor, collisionState);
            if (collisionState.collision) break;
          }

          if (collisionState.collision) {
            var initialisePropsRef = path.scope.generateUidIdentifier("initialiseProps");

            nodes.push(t.variableDeclaration("var", [t.variableDeclarator(initialisePropsRef, t.functionExpression(null, [], t.blockStatement(instanceBody)))]));

            instanceBody = [t.expressionStatement(t.callExpression(t.memberExpression(initialisePropsRef, t.identifier("call")), [t.thisExpression()]))];
          }

          if (isDerived) {
            var bareSupers = [];
            constructor.traverse(findBareSupers, bareSupers);
            for (var _iterator4 = bareSupers, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
              var _ref7;

              if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref7 = _iterator4[_i4++];
              } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref7 = _i4.value;
              }

              var bareSuper = _ref7;

              bareSuper.insertAfter(instanceBody);
            }
          } else {
            constructor.get("body").unshiftContainer("body", instanceBody);
          }
        }

        for (var _iterator5 = props, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
          var _ref8;

          if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref8 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref8 = _i5.value;
          }

          var _prop2 = _ref8;

          _prop2.remove();
        }

        if (!nodes.length) return;

        if (path.isClassExpression()) {
          path.scope.push({ id: ref });
          path.replaceWith(t.assignmentExpression("=", ref, path.node));
        } else {
          if (!path.node.id) {
            path.node.id = ref;
          }

          if (path.parentPath.isExportDeclaration()) {
            path = path.parentPath;
          }
        }

        path.insertAfter(nodes);
      },
      ArrowFunctionExpression: function ArrowFunctionExpression(path) {
        var classExp = path.get("body");
        if (!classExp.isClassExpression()) return;

        var body = classExp.get("body");
        var members = body.get("body");
        if (members.some(function (member) {
          return member.isClassProperty();
        })) {
          path.ensureBlock();
        }
      }
    }
  };
};

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];