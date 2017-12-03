"use strict";

exports.__esModule = true;

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  function cleanDecorators(decorators) {
    return decorators.reverse().map(function (dec) {
      return dec.expression;
    });
  }

  function transformClass(path, ref, state) {
    var nodes = [];

    state;

    var classDecorators = path.node.decorators;
    if (classDecorators) {
      path.node.decorators = null;
      classDecorators = cleanDecorators(classDecorators);

      for (var _iterator = classDecorators, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var decorator = _ref2;

        nodes.push(buildClassDecorator({
          CLASS_REF: ref,
          DECORATOR: decorator
        }));
      }
    }

    var map = (0, _create2.default)(null);

    for (var _iterator2 = path.get("body.body"), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var method = _ref3;

      var decorators = method.node.decorators;
      if (!decorators) continue;

      var _alias = t.toKeyAlias(method.node);
      map[_alias] = map[_alias] || [];
      map[_alias].push(method.node);

      method.remove();
    }

    for (var alias in map) {
      var items = map[alias];

      items;
    }

    return nodes;
  }

  function hasDecorators(path) {
    if (path.isClass()) {
      if (path.node.decorators) return true;

      for (var _iterator3 = path.node.body.body, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
        var _ref4;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref4 = _i3.value;
        }

        var method = _ref4;

        if (method.decorators) {
          return true;
        }
      }
    } else if (path.isObjectExpression()) {
      for (var _iterator4 = path.node.properties, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
        var _ref5;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref5 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref5 = _i4.value;
        }

        var prop = _ref5;

        if (prop.decorators) {
          return true;
        }
      }
    }

    return false;
  }

  function doError(path) {
    throw path.buildCodeFrameError("Decorators are not officially supported yet in 6.x pending a proposal update.\nHowever, if you need to use them you can install the legacy decorators transform with:\n\nnpm install babel-plugin-transform-decorators-legacy --save-dev\n\nand add the following line to your .babelrc file:\n\n{\n  \"plugins\": [\"transform-decorators-legacy\"]\n}\n\nThe repo url is: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy.\n    ");
  }

  return {
    inherits: require("babel-plugin-syntax-decorators"),

    visitor: {
      ClassExpression: function ClassExpression(path) {
        if (!hasDecorators(path)) return;
        doError(path);

        (0, _babelHelperExplodeClass2.default)(path);

        var ref = path.scope.generateDeclaredUidIdentifier("ref");
        var nodes = [];

        nodes.push(t.assignmentExpression("=", ref, path.node));

        nodes = nodes.concat(transformClass(path, ref, this));

        nodes.push(ref);

        path.replaceWith(t.sequenceExpression(nodes));
      },
      ClassDeclaration: function ClassDeclaration(path) {
        if (!hasDecorators(path)) return;
        doError(path);
        (0, _babelHelperExplodeClass2.default)(path);

        var ref = path.node.id;
        var nodes = [];

        nodes = nodes.concat(transformClass(path, ref, this).map(function (expr) {
          return t.expressionStatement(expr);
        }));
        nodes.push(t.expressionStatement(ref));

        path.insertAfter(nodes);
      },
      ObjectExpression: function ObjectExpression(path) {
        if (!hasDecorators(path)) return;
        doError(path);
      }
    }
  };
};

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelHelperExplodeClass = require("babel-helper-explode-class");

var _babelHelperExplodeClass2 = _interopRequireDefault(_babelHelperExplodeClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildClassDecorator = (0, _babelTemplate2.default)("\n  CLASS_REF = DECORATOR(CLASS_REF) || CLASS_REF;\n");

module.exports = exports["default"];