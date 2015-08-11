import buildComprehension from "../../helpers/build-comprehension";
import traverse from "babel-traverse";
import * as util from  "../../../util";
import * as t from "babel-types";

export var metadata = {
  stage: 0
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ComprehensionExpression(node, parent, scope) {
    var callback = array;
    if (node.generator) callback = generator;
    return callback(node, parent, scope);
  }
};

/**
 * [Please add a description.]
 */

function generator(node) {
  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body), true);
  container.shadow = true;

  body.push(buildComprehension(node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
}

/**
 * [Please add a description.]
 */

function array(node, parent, scope) {
  var uid = scope.generateUidIdentifierBasedOnNode(parent);

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee.shadow = true;

  var block = container.callee.body;
  var body  = block.body;

  if (traverse.hasType(node, scope, "YieldExpression", t.FUNCTION_TYPES)) {
    container.callee.generator = true;
    container = t.yieldExpression(container, true);
  }

  var returnStatement = body.pop();

  body.push(buildComprehension(node, function () {
    return util.template("array-push", {
      STATEMENT: node.body,
      KEY:       uid
    }, true);
  }));
  body.push(returnStatement);

  return container;
}
