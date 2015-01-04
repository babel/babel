var t = require("../../types");

exports.ObjectExpression = function (node, parent, file, scope) {
  var hasComputed = false;
  var prop;
  var key;
  var i;

  for (i in node.properties) {
    hasComputed = t.isProperty(node.properties[i], { computed: true });
    if (hasComputed) break;
  }

  if (!hasComputed) return;

  var objId = scope.generateUidBasedOnNode(parent, file);

  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body));
  container._aliasFunction = true;

  var props = node.properties;

  // normalise key

  for (i in props) {
    prop = props[i];
    key = prop.key;

    if (!prop.computed && t.isIdentifier(key)) {
      prop.key = t.literal(key.name);
    }
  }

  // add all non-computed properties and `__proto__` properties to the initializer

  var initProps = [];
  var broken = false;

  for (i in props) {
    prop = props[i];

    if (prop.computed) {
      broken = true;
    }

    if (!broken || t.isLiteral(t.toComputedKey(prop, prop.key), { value: "__proto__" })) {
      initProps.push(prop);
      props[i] = null;
    }
  }

  // add a simple assignment for all Symbol member expressions due to symbol polyfill limitations
  // otherwise use Object.defineProperty

  for (i in props) {
    prop = props[i];
    if (!prop) continue;

    key = prop.key;
    var bodyNode;

    if (prop.computed && t.isMemberExpression(key) && t.isIdentifier(key.object, { name: "Symbol" })) {
      // { [Symbol.iterator]: "foo" }
      bodyNode = t.assignmentExpression(
        "=",
        t.memberExpression(objId, key, true),
        prop.value
      );
    } else {
      bodyNode = t.callExpression(file.addHelper("define-property"), [objId, key, prop.value]);
    }

    body.push(t.expressionStatement(bodyNode));
  }

  // only one node and it's a Object.defineProperty that returns the object

  if (body.length === 1) {
    var first = body[0].expression;

    if (t.isCallExpression(first)) {
      first.arguments[0] = t.objectExpression([]);
      return first;
    }
  }

  //

  body.unshift(t.variableDeclaration("var", [
    t.variableDeclarator(objId, t.objectExpression(initProps))
  ]));

  body.push(t.returnStatement(objId));

  return t.callExpression(container, []);
};
