import buildComprehension from "../../helpers/build-comprehension";
import traverse from "babel-traverse";
import * as util from  "../../../util";
import * as t from "babel-types";

export let metadata = {
  stage: 0
};

export let visitor = {
  ComprehensionExpression(node, parent, scope) {
    let callback = array;
    if (node.generator) callback = generator;
    return callback(node, parent, scope);
  }
};

function generator(node) {
  let body = [];
  let container = t.functionExpression(null, [], t.blockStatement(body), true);
  container.shadow = true;

  body.push(buildComprehension(node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
}

function array(node, parent, scope) {
  let uid = scope.generateUidIdentifierBasedOnNode(parent);

  let container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee.shadow = true;

  let block = container.callee.body;
  let body  = block.body;

  if (traverse.hasType(node, scope, "YieldExpression", t.FUNCTION_TYPES)) {
    container.callee.generator = true;
    container = t.yieldExpression(container, true);
  }

  let returnStatement = body.pop();

  body.push(buildComprehension(node, function () {
    return util.template("array-push", {
      STATEMENT: node.body,
      KEY:       uid
    }, true);
  }));
  body.push(returnStatement);

  return container;
}
