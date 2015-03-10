import buildComprehension from "../../helpers/build-comprehension";
import traverse from "../../../traversal";
import * as util from  "../../../util";
import * as t from "../../../types";

export var experimental = true;

export function ComprehensionExpression(node, parent, scope, file) {
  var callback = array;
  if (node.generator) callback = generator;
  return callback(node, parent, scope, file);
}

function generator(node) {
  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body), true);
  container._aliasFunction = true;

  body.push(buildComprehension(node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
}

function array(node, parent, scope, file) {
  var uid = scope.generateUidBasedOnNode(parent, file);

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee._aliasFunction = true;

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
