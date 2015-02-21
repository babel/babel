"use strict";

var reduceRight = require("lodash/collection/reduceRight");
var messages    = require("../../../messages");
var flatten     = require("lodash/array/flatten");
var util        = require("../../../util");
var map         = require("lodash/collection/map");
var t           = require("../../../types");

function returnBlock(expr) {
  return t.blockStatement([t.returnStatement(expr)]);
}

function TailCallTransformer(node, scope, file) {
  this.hasTailRecursion = false;
  this.needsArguments   = false;
  this.setsArguments    = false;
  this.needsThis        = false;
  this.ownerId          = node.id;
  this.vars             = [];

  this.scope = scope;
  this.file  = file;
  this.node  = node;
}

TailCallTransformer.prototype.getArgumentsId = function () {
  return this.argumentsId = this.argumentsId || this.scope.generateUidIdentifier("arguments");
};

TailCallTransformer.prototype.getThisId = function () {
  return this.thisId = this.thisId || this.scope.generateUidIdentifier("this");
};

TailCallTransformer.prototype.getLeftId = function () {
  return this.leftId = this.leftId || this.scope.generateUidIdentifier("left");
};

TailCallTransformer.prototype.getFunctionId = function () {
  return this.functionId = this.functionId || this.scope.generateUidIdentifier("function");
};

TailCallTransformer.prototype.getAgainId = function () {
  return this.againId = this.againId || this.scope.generateUidIdentifier("again");
};

TailCallTransformer.prototype.getParams = function () {
  var params = this.params;

  if (!params) {
    params = this.node.params;
    this.paramDecls = [];

    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      if (!param._isDefaultPlaceholder) {
        this.paramDecls.push(t.variableDeclarator(
          param,
          params[i] = this.scope.generateUidIdentifier("x")
        ));
      }
    }
  }

  return this.params = params;
};

TailCallTransformer.prototype.hasDeopt = function () {
  // check if the ownerId has been reassigned, if it has then it's not safe to
  // perform optimisations
  var ownerIdInfo = this.scope.getBindingInfo(this.ownerId.name);
  return ownerIdInfo && ownerIdInfo.reassigned;
};

TailCallTransformer.prototype.run = function () {
  var scope = this.scope;
  var node  = this.node;

  // only tail recursion can be optimized as for now, so we can skip anonymous
  // functions entirely
  var ownerId = this.ownerId;
  if (!ownerId) return;

  // traverse the function and look for tail recursion
  scope.traverse(node, firstPass, this);

  if (!this.hasTailRecursion) return;

  if (this.hasDeopt()) {
    this.file.logDeopt(node, messages.get("tailCallReassignmentDeopt"));
    return;
  }

  //

  scope.traverse(node, secondPass, this);

  if (!this.needsThis || !this.needsArguments) {
    scope.traverse(node, thirdPass, this);
  }

  var body = t.ensureBlock(node).body;

  if (this.vars.length > 0) {
    var declarations = flatten(map(this.vars, function (decl) {
      return decl.declarations;
    }, this));
    var statement = reduceRight(declarations, function (expr, decl) {
      return t.assignmentExpression("=", decl.id, expr);
    }, t.identifier("undefined"));
    body.unshift(t.expressionStatement(statement));
  }

  var paramDecls = this.paramDecls;
  if (paramDecls.length > 0) {
    body.unshift(t.variableDeclaration("var", paramDecls));
  }

  body.unshift(t.expressionStatement(
    t.assignmentExpression("=", this.getAgainId(), t.literal(false)))
  );

  node.body = util.template("tail-call-body", {
    AGAIN_ID:      this.getAgainId(),
    THIS_ID:       this.thisId,
    ARGUMENTS_ID:  this.argumentsId,
    FUNCTION_ID:   this.getFunctionId(),
    BLOCK:         node.body
  });

  var topVars = [];

  if (this.needsThis) {
    topVars.push(t.variableDeclarator(this.getThisId(), t.thisExpression()));
  }

  if (this.needsArguments || this.setsArguments) {
    var decl = t.variableDeclarator(this.getArgumentsId());
    if (this.needsArguments) {
      decl.init = t.identifier("arguments");
    }
    topVars.push(decl);
  }

  var leftId = this.leftId;
  if (leftId) {
    topVars.push(t.variableDeclarator(leftId));
  }

  if (topVars.length > 0) {
    node.body.body.unshift(t.variableDeclaration("var", topVars));
  }
};

TailCallTransformer.prototype.subTransform = function (node) {
  if (!node) return;

  var handler = this["subTransform" + node.type];
  if (handler) return handler.call(this, node);
};

TailCallTransformer.prototype.subTransformConditionalExpression = function (node) {
  var callConsequent = this.subTransform(node.consequent);
  var callAlternate = this.subTransform(node.alternate);
  if (!callConsequent && !callAlternate) {
    return;
  }

  // if ternary operator had tail recursion in value, convert to optimized if-statement
  node.type = "IfStatement";
  node.consequent = callConsequent ? t.toBlock(callConsequent) : returnBlock(node.consequent);

  if (callAlternate) {
    node.alternate = t.isIfStatement(callAlternate) ? callAlternate : t.toBlock(callAlternate);
  } else {
    node.alternate = returnBlock(node.alternate);
  }

  return [node];
};

TailCallTransformer.prototype.subTransformLogicalExpression = function (node) {
  // only call in right-value of can be optimized
  var callRight = this.subTransform(node.right);
  if (!callRight) return;

  // cache left value as it might have side-effects
  var leftId = this.getLeftId();
  var testExpr = t.assignmentExpression(
    "=",
    leftId,
    node.left
  );

  if (node.operator === "&&") {
    testExpr = t.unaryExpression("!", testExpr);
  }

  return [t.ifStatement(testExpr, returnBlock(leftId))].concat(callRight);
};

TailCallTransformer.prototype.subTransformSequenceExpression = function (node) {
  var seq = node.expressions;

  // only last element can be optimized
  var lastCall = this.subTransform(seq[seq.length - 1]);
  if (!lastCall) {
    return;
  }

  // remove converted expression from sequence
  // and convert to regular expression if needed
  if (--seq.length === 1) {
    node = seq[0];
  }

  return [t.expressionStatement(node)].concat(lastCall);
};

TailCallTransformer.prototype.subTransformCallExpression = function (node) {
  var callee = node.callee, thisBinding, args;

  if (t.isMemberExpression(callee, { computed: false }) && t.isIdentifier(callee.property)) {
    switch (callee.property.name) {
      case "call":
        args = t.arrayExpression(node.arguments.slice(1));
        break;

      case "apply":
        args = node.arguments[1] || t.identifier("undefined");
        break;

      default:
        return;
    }

    thisBinding = node.arguments[0];
    callee = callee.object;
  }

  // only tail recursion can be optimized as for now
  if (!t.isIdentifier(callee) || !this.scope.bindingIdentifierEquals(callee.name, this.ownerId)) {
    return;
  }

  this.hasTailRecursion = true;

  if (this.hasDeopt()) return;

  var body = [];

  if (!t.isThisExpression(thisBinding)) {
    body.push(t.expressionStatement(t.assignmentExpression(
      "=",
      this.getThisId(),
      thisBinding || t.identifier("undefined")
    )));
  }

  if (!args) {
    args = t.arrayExpression(node.arguments);
  }

  var argumentsId = this.getArgumentsId();
  var params = this.getParams();

  body.push(t.expressionStatement(t.assignmentExpression(
    "=",
    argumentsId,
    args
  )));

  var i, param;

  if (t.isArrayExpression(args)) {
    var elems = args.elements;
    for (i = 0; i < elems.length && i < params.length; i++) {
      param = params[i];
      var elem = elems[i] || (elems[i] = t.identifier("undefined"));
      if (!param._isDefaultPlaceholder) {
        elems[i] = t.assignmentExpression("=", param, elem);
      }
    }
  } else {
    this.setsArguments = true;
    for (i = 0; i < params.length; i++) {
      param = params[i];
      if (!param._isDefaultPlaceholder) {
        body.push(t.expressionStatement(t.assignmentExpression(
          "=",
          param,
          t.memberExpression(argumentsId, t.literal(i), true)
        )));
      }
    }
  }

  body.push(t.expressionStatement(
    t.assignmentExpression("=", this.getAgainId(), t.literal(true))
  ));
  body.push(t.continueStatement(this.getFunctionId()));

  return body;
};

// looks for and replaces tail recursion calls
var firstPass = {
  enter: function (node, parent, scope, state) {
    if (t.isIfStatement(node)) {
      if (t.isReturnStatement(node.alternate)) {
        t.ensureBlock(node, "alternate");
      }

      if (t.isReturnStatement(node.consequent)) {
        t.ensureBlock(node, "consequent");
      }
    } else if (t.isReturnStatement(node)) {
      this.skip();
      return state.subTransform(node.argument);
    } else if (t.isTryStatement(parent)) {
      if (node === parent.block) {
        this.skip();
      } else if (parent.finalizer && node !== parent.finalizer) {
        this.skip();
      }
    } else if (t.isFunction(node)) {
      this.skip();
    } else if (t.isVariableDeclaration(node)) {
      this.skip();
      state.vars.push(node);
    }
  }
};

// hoists up function declarations, replaces `this` and `arguments` and marks
// them as needed
var secondPass = {
  enter: function (node, parent, scope, state) {
    if (t.isThisExpression(node)) {
      state.needsThis = true;
      return state.getThisId();
    } else if (t.isReferencedIdentifier(node, parent, { name: "arguments" })) {
      state.needsArguments = true;
      return state.getArgumentsId();
    } else if (t.isFunction(node)) {
      this.skip();
      if (t.isFunctionDeclaration(node)) {
        node = t.variableDeclaration("var", [
          t.variableDeclarator(node.id, t.toExpression(node))
        ]);
        node._blockHoist = 2;
        return node;
      }
    }
  }
};

// optimizes recursion by removing `this` and `arguments` if they aren't used
var thirdPass = {
  enter: function (node, parent, scope, state) {
    if (!t.isExpressionStatement(node)) return;

    var expr = node.expression;
    if (!t.isAssignmentExpression(expr)) return;

    if (!state.needsThis && expr.left === state.getThisId()) {
      this.remove();
    } else if (!state.needsArguments && expr.left === state.getArgumentsId() && t.isArrayExpression(expr.right)) {
      return map(expr.right.elements, function (elem) {
        return t.expressionStatement(elem);
      });
    }
  }
};

exports.Function = function (node, parent, scope, file) {
  var tailCall = new TailCallTransformer(node, scope, file);
  tailCall.run();
};
