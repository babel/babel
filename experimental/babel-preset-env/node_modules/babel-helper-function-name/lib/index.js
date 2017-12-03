"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var node = _ref.node,
      parent = _ref.parent,
      scope = _ref.scope,
      id = _ref.id;

  if (node.id) return;

  if ((t.isObjectProperty(parent) || t.isObjectMethod(parent, { kind: "method" })) && (!parent.computed || t.isLiteral(parent.key))) {
    id = parent.key;
  } else if (t.isVariableDeclarator(parent)) {
    id = parent.id;

    if (t.isIdentifier(id)) {
      var binding = scope.parent.getBinding(id.name);
      if (binding && binding.constant && scope.getBinding(id.name) === binding) {
        node.id = id;
        node.id[t.NOT_LOCAL_BINDING] = true;
        return;
      }
    }
  } else if (t.isAssignmentExpression(parent)) {
    id = parent.left;
  } else if (!id) {
    return;
  }

  var name = void 0;
  if (id && t.isLiteral(id)) {
    name = id.value;
  } else if (id && t.isIdentifier(id)) {
    name = id.name;
  } else {
    return;
  }

  name = t.toBindingIdentifierName(name);
  id = t.identifier(name);

  id[t.NOT_LOCAL_BINDING] = true;

  var state = visit(node, name, scope);
  return wrap(state, node, id, scope) || node;
};

var _babelHelperGetFunctionArity = require("babel-helper-get-function-arity");

var _babelHelperGetFunctionArity2 = _interopRequireDefault(_babelHelperGetFunctionArity);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildPropertyMethodAssignmentWrapper = (0, _babelTemplate2.default)("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n");

var buildGeneratorPropertyMethodAssignmentWrapper = (0, _babelTemplate2.default)("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n");

var visitor = {
  "ReferencedIdentifier|BindingIdentifier": function ReferencedIdentifierBindingIdentifier(path, state) {
    if (path.node.name !== state.name) return;

    var localDeclar = path.scope.getBindingIdentifier(state.name);
    if (localDeclar !== state.outerDeclar) return;

    state.selfReference = true;
    path.stop();
  }
};

function wrap(state, method, id, scope) {
  if (state.selfReference) {
    if (scope.hasBinding(id.name) && !scope.hasGlobal(id.name)) {
      scope.rename(id.name);
    } else {
      if (!t.isFunction(method)) return;

      var build = buildPropertyMethodAssignmentWrapper;
      if (method.generator) build = buildGeneratorPropertyMethodAssignmentWrapper;
      var _template = build({
        FUNCTION: method,
        FUNCTION_ID: id,
        FUNCTION_KEY: scope.generateUidIdentifier(id.name)
      }).expression;
      _template.callee._skipModulesRemap = true;

      var params = _template.callee.body.body[0].params;
      for (var i = 0, len = (0, _babelHelperGetFunctionArity2.default)(method); i < len; i++) {
        params.push(scope.generateUidIdentifier("x"));
      }

      return _template;
    }
  }

  method.id = id;
  scope.getProgramParent().references[id.name] = true;
}

function visit(node, name, scope) {
  var state = {
    selfAssignment: false,
    selfReference: false,
    outerDeclar: scope.getBindingIdentifier(name),
    references: [],
    name: name
  };

  var binding = scope.getOwnBinding(name);

  if (binding) {
    if (binding.kind === "param") {
      state.selfReference = true;
    } else {}
  } else if (state.outerDeclar || scope.hasGlobal(name)) {
    scope.traverse(node, visitor, state);
  }

  return state;
}

module.exports = exports["default"];