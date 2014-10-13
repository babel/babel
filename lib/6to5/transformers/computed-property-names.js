var util = require("../util");
var b    = require("recast").types.builders;
var _    = require("lodash");

exports.ObjectExpression = function (node, parent, file) {
  var hasComputed = false;

  var computed = [];

  node.properties = node.properties.filter(function (prop) {
    if (prop.computed) {
      hasComputed = true;
      computed.unshift(prop);
      return false;
    } else {
      return true;
    }
  });

  if (!hasComputed) return;

  var objIdNode;

  if (parent.type === "AssignmentExpression") {
    objIdNode = parent.left;
  } else if (parent.type === "VariableDeclarator") {
    objIdNode = parent.id;
  }

  var objId = "ref";

  if (objIdNode && objIdNode.type === "Identifier") {
    objId = objIdNode.name;
  }

  objId = b.identifier(file.generateUid(objId));

  var container = util.template("function-return-obj", {
    KEY: objId,
    OBJECT: node
  });

  var containerCallee = container.callee;
  var containerBody = containerCallee.body.body;

  containerCallee._aliasFunction = "arrows";

  _.each(computed, function (prop) {
    containerBody.unshift(
      b.expressionStatement(
        b.assignmentExpression(
          "=",
          b.memberExpression(objId, prop.key, true),
          prop.value
        )
      )
    );
  });

  return container;
};
