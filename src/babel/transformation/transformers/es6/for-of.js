import * as messages from "../../../messages";
import * as util from  "../../../util";
import * as t from "../../../types";

export var check = t.isForOfStatement;

export function ForOfStatement(node, parent, scope, file) {
  if (this.get("right").isArrayExpression()) {
    return _ForOfStatementArray.call(this, node, scope, file);
  }

  var callback = spec;
  if (file.isLoose("es6.forOf")) callback = loose;

  var build  = callback(node, parent, scope, file);
  var declar = build.declar;
  var loop   = build.loop;
  var block  = loop.body;

  // inherit comments from the original loop
  t.inheritsComments(loop, node);

  // ensure that it's a block so we can take all its statements
  t.ensureBlock(node);

  // add the value declaration to the new loop body
  if (declar) {
    block.body.push(declar);
  }

  // push the rest of the original loop body onto our new body
  block.body = block.body.concat(node.body.body);

  t.inherits(loop, node);

  if (build.replaceParent) this.parentPath.node = build.node;
  return build.node;
}

export function _ForOfStatementArray(node, scope, file) {
  var nodes = [];
  var right = node.right;

  if (!t.isIdentifier(right) || !scope.hasBinding(right.name)) {
    var uid = scope.generateUidIdentifier("arr");
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(uid, right)
    ]));
    right = uid;
  }

  var iterationKey = scope.generateUidIdentifier("i");

  var loop = util.template("for-of-array", {
    BODY: node.body,
    KEY:  iterationKey,
    ARR:  right
  });

  t.inherits(loop, node);
  t.ensureBlock(loop);

  var iterationValue = t.memberExpression(right, iterationKey, true);

  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    left.declarations[0].init = iterationValue;
    loop.body.body.unshift(left);
  } else {
    loop.body.body.unshift(t.expressionStatement(t.assignmentExpression("=", left, iterationValue)));
  }

  nodes.push(loop);

  return nodes;
}

var loose = function (node, parent, scope, file) {
  var left = node.left;
  var declar, id;

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    // for (i of test), for ({ i } of test)
    id = left;
  } else if (t.isVariableDeclaration(left)) {
    // for (var i of test)
    id = scope.generateUidIdentifier("ref");
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, id)
    ]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }

  var iteratorKey = scope.generateUidIdentifier("iterator");
  var isArrayKey  = scope.generateUidIdentifier("isArray");

  var loop = util.template("for-of-loose", {
    LOOP_OBJECT:  iteratorKey,
    IS_ARRAY:     isArrayKey,
    OBJECT:       node.right,
    INDEX:        scope.generateUidIdentifier("i"),
    ID:           id
  });

  if (!declar) {
    // no declaration so we need to remove the variable declaration at the top of
    // the for-of-loose template
    loop.body.body.shift();
  }

  //

  return {
    declar: declar,
    node:   loop,
    loop:   loop
  };
};

var spec = function (node, parent, scope, file) {
  var left = node.left;
  var declar;

  var stepKey   = scope.generateUidIdentifier("step");
  var stepValue = t.memberExpression(stepKey, t.identifier("value"));

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    // for (i of test), for ({ i } of test)
    declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
  } else if (t.isVariableDeclaration(left)) {
    // for (var i of test)
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, stepValue)
    ]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }

  //

  var iteratorKey = scope.generateUidIdentifier("iterator");

  var template = util.template("for-of", {
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
    ITERATOR_COMPLETION:    scope.generateUidIdentifier("iteratorNormalCompletion"),
    ITERATOR_ERROR_KEY:     scope.generateUidIdentifier("iteratorError"),
    ITERATOR_KEY:           iteratorKey,
    STEP_KEY:               stepKey,
    OBJECT:                 node.right,
    BODY:                   null
  });

  var isLabeledParent = t.isLabeledStatement(parent);

  var tryBody = template[3].block.body;
  var loop = tryBody[0];

  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }

  //

  return {
    replaceParent: isLabeledParent,
    declar:        declar,
    loop:          loop,
    node:          template
  };
};
