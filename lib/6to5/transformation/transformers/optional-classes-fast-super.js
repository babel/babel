var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

exports.optional = true;

exports.Class = function (node) {
  var superClass = node.superClass || t.identifier("Function");

  var hasConstructor = false;
  var body = node.body.body;

  for (var i in body) {
    var methodNode = body[i];

    hasConstructor = hasConstructor || methodNode.key.name === "constructor";

    traverse(methodNode, {
      enter: function (node, parent) {
        if (t.isIdentifier(node, { name: "super" })) {
          return superIdentifier(superClass, methodNode, node, parent);
        } else if (t.isCallExpression(node)) {
          var callee = node.callee;
          if (!t.isMemberExpression(callee)) return;
          if (callee.object.name !== "super") return;

          // super.test(); -> ClassName.prototype.MethodName.call(this);
          t.appendToMemberExpression(callee, t.identifier("call"));
          node.arguments.unshift(t.thisExpression());
        }
      }
    });
  }

  if (node.superClass && !hasConstructor) {
    body.unshift(t.methodDefinition(
      t.identifier("constructor"),
      util.template("class-super-constructor-call-fast", {
        SUPER_NAME: superClass
      })
    ));
  }
};

var superIdentifier = function (superClass, methodNode, id, parent) {
  var methodName = methodNode.key;

  if (parent.property === id) {
    return;
  } else if (t.isCallExpression(parent, { callee: id })) {
    // super(); -> ClassName.prototype.MethodName.call(this);
    parent.arguments.unshift(t.thisExpression());

    if (methodName.name === "constructor") {
      // constructor() { super(); }
      return t.memberExpression(superClass, t.identifier("call"));
    } else {
      id = superClass;

      // foo() { super(); }
      if (!methodNode.static) {
        id = t.memberExpression(id, t.identifier("prototype"));
      }

      id = t.memberExpression(id, methodName, methodNode.computed);
      return t.memberExpression(id, t.identifier("call"));
    }
  } else if (t.isMemberExpression(parent) && !methodNode.static) {
    // super.test -> ClassName.prototype.test
    return t.memberExpression(superClass, t.identifier("prototype"));
  } else {
    return superClass;
  }
};
