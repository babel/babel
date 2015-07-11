import * as t from "../../../types";

function loose(node, body, objId) {
  for (var prop of (node.properties: Array)) {
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
  // add a simple assignment for all Symbol member expressions due to symbol polyfill limitations
  // otherwise use Object.defineProperty

  for (let prop of (node.properties: Array)) {
    // this wont work with Object.defineProperty
    if (t.isLiteral(t.toComputedKey(prop), { value: "__proto__" })) {
      initProps.push(prop);
      continue;
    }

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

export var visitor = {
  ObjectExpression: {
    exit(node, parent, scope, file) {
      var hasComputed = false;

      for (let prop of (node.properties: Array)) {
        hasComputed = t.isProperty(prop, { computed: true, kind: "init" });
        if (hasComputed) break;
      }

      if (!hasComputed) return;

      // put all getters/setters into the first object expression as well as all initialisers up
      // to the first computed property

      var initProps = [];
      var stopInits = false;

      node.properties = node.properties.filter(function (prop) {
        if (prop.computed) {
          stopInits = true;
        }

        if (prop.kind !== "init" || !stopInits) {
          initProps.push(prop);
          return false;
        } else {
          return true;
        }
      });

      //

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
  }
};
