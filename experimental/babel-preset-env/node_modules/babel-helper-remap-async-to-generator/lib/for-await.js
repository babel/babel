"use strict";

exports.__esModule = true;

exports.default = function (path, helpers) {
  var node = path.node,
      scope = path.scope,
      parent = path.parent;


  var stepKey = scope.generateUidIdentifier("step");
  var stepValue = scope.generateUidIdentifier("value");
  var left = node.left;
  var declar = void 0;

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
  } else if (t.isVariableDeclaration(left)) {
    declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, stepValue)]);
  }

  var template = buildForAwait();

  (0, _babelTraverse2.default)(template, forAwaitVisitor, null, {
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
    ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
    ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
    ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
    GET_ITERATOR: helpers.getAsyncIterator,
    OBJECT: node.right,
    STEP_VALUE: stepValue,
    STEP_KEY: stepKey,
    AWAIT: helpers.wrapAwait
  });

  template = template.body.body;

  var isLabeledParent = t.isLabeledStatement(parent);
  var tryBody = template[3].block.body;
  var loop = tryBody[0];

  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }

  return {
    replaceParent: isLabeledParent,
    node: template,
    declar: declar,
    loop: loop
  };
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var buildForAwait = (0, _babelTemplate2.default)("\n  function* wrapper() {\n    var ITERATOR_COMPLETION = true;\n    var ITERATOR_HAD_ERROR_KEY = false;\n    var ITERATOR_ERROR_KEY = undefined;\n    try {\n      for (\n        var ITERATOR_KEY = GET_ITERATOR(OBJECT), STEP_KEY, STEP_VALUE;\n        (\n          STEP_KEY = yield AWAIT(ITERATOR_KEY.next()),\n          ITERATOR_COMPLETION = STEP_KEY.done,\n          STEP_VALUE = yield AWAIT(STEP_KEY.value),\n          !ITERATOR_COMPLETION\n        );\n        ITERATOR_COMPLETION = true) {\n      }\n    } catch (err) {\n      ITERATOR_HAD_ERROR_KEY = true;\n      ITERATOR_ERROR_KEY = err;\n    } finally {\n      try {\n        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return) {\n          yield AWAIT(ITERATOR_KEY.return());\n        }\n      } finally {\n        if (ITERATOR_HAD_ERROR_KEY) {\n          throw ITERATOR_ERROR_KEY;\n        }\n      }\n    }\n  }\n");

var forAwaitVisitor = {
  noScope: true,

  Identifier: function Identifier(path, replacements) {
    if (path.node.name in replacements) {
      path.replaceInline(replacements[path.node.name]);
    }
  },
  CallExpression: function CallExpression(path, replacements) {
    var callee = path.node.callee;

    if (t.isIdentifier(callee) && callee.name === "AWAIT" && !replacements.AWAIT) {
      path.replaceWith(path.node.arguments[0]);
    }
  }
};

module.exports = exports["default"];