import * as t from "../../../types";

function loose(node, body, objId) {
  for (var i = 0; i < node.properties.length; i++) {
    var prop = node.properties[i];

    body.push(t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)),
        prop.value
      )
    ));
  }
}

function spec(node, body, objId, initProps, file) {
  var props = node.properties;

  // add all non-computed properties and `__proto__` properties to the initializer

  var broken = false;

  for (let i = 0; i < props.length; i++) {
    let prop = props[i];

    if (prop.computed) {
      broken = true;
    }

    if (prop.kind !== "init" || !broken || t.isLiteral(t.toComputedKey(prop, prop.key), { value: "__proto__" })) {
      initProps.push(prop);
      props[i] = null;
    }
  }

  // add a simple assignment for all Symbol member expressions due to symbol polyfill limitations
  // otherwise use Object.defineProperty

  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (!prop) continue;

    let key = prop.key;
    if (t.isIdentifier(key) && !prop.computed) {
      key = t.literal(key.name);
    }

    var bodyNode = t.callExpression(file.addHelper("define-property"), [objId, key, prop.value]);

    body.push(t.expressionStatement(bodyNode));
  }

  // only one node and it's a Object.defineProperty that returns the object

  if (body.length === 1) {
    var first = body[0].expression;

    if (t.isCallExpression(first)) {
      first.arguments[0] = t.objectExpression(initProps);
      return first;
    }
  }
}

export var ObjectExpression = {
  exit(node, parent, scope, file) {
    var hasComputed = false;

    for (var prop of (node.properties: Array)) {
      hasComputed = t.isProperty(prop, { computed: true, kind: "init" });
      if (hasComputed) break;
    }

    if (!hasComputed) return;

    var initProps = [];
    var objId = scope.generateUidIdentifierBasedOnNode(parent);

    //

    var body = [];

    //

    var callback = spec;
    if (file.isLoose("es6.properties.computed")) callback = loose;

    var result = callback(node, body, objId, initProps, file);
    if (result) return result;

    //

    body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(objId, t.objectExpression(initProps))
    ]));

    body.push(t.expressionStatement(objId));

    return body;
  }
};
