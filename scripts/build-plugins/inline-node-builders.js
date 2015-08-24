module.exports = function (babel) {
  var t = babel.types;

  return new babel.Plugin("inline-node-builders", {
    visitor: {
      CallExpression: function (node, parent, scope) {
        var callee = this.get("callee");
        if (!callee.isMemberExpression()) return;

        var obj = callee.get("object");
        if (!obj.referencesImport("babel-types", "*")) return;

        var prop = callee.get("property");
        if (!prop.isIdentifier()) return;

        var type = prop.node.name;
        var builder = t.BUILDER_KEYS[type] || t.BUILDER_KEYS[type[0].toUpperCase() + type.slice(1)];
        if (!builder) return;

        var props = [];

        var i = 0;

        for (var key in builder) {
          var def = builder[key];
          var arg = node.arguments[i];

          if (arg) {
            if (t.isLiteral(arg)) {
              props.push(t.property("init", t.identifier(key), arg));
            } else {
              var uid = scope.generateDeclaredUidIdentifier("temp");
              props.push(t.property("init", t.identifier(key), t.sequenceExpression([
                t.assignmentExpression("=", uid, arg),
                t.conditionalExpression(
                  t.logicalExpression("===", uid, t.identifier("undefined")),
                  t.valueToNode(def),
                  uid
                )
              ])));
            }
          } else {
            props.push(t.property("init", t.identifier(key), t.valueToNode(def)));
          }
        }


        return t.objectExpression(props);
      }
    }
  });
};
