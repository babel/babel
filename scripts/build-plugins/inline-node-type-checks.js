module.exports = function (babel) {
  var t = babel.types;

  function buildOr(target, aliases) {
    var conditions = [];

    target = t.memberExpression(target, t.identifier("type"));

    for (var i = 0; i < aliases.length; i++) {
      var alias = aliases[i];
      conditions.push(t.binaryExpression("===", target, t.literal(alias)));
    }

    if (conditions.length === 1) {
      return conditions[0];
    }

    var root = t.logicalExpression("||", conditions.shift(), conditions.shift());

    for (var i = 0; i < conditions.length; i++) {
      root = t.logicalExpression("||", root, conditions[i]);
    }

    return root;
  }

  function maybeBuildArgsComparison(or, target, obj) {
    if (!obj) return or;

    var conditions = [];

    for (var i = 0; i < obj.properties.length; i++) {
      var prop = obj.properties[i];
      conditions.push(t.binaryExpression("===",
        t.memberExpression(target, prop.key, t.isLiteral(prop.key)),
        prop.value
      ));
    }

    var root;

    if (!conditions.length) {
      return or;
    } else if (conditions.length === 1) {
      root = conditions[0];
    } else {
      root = t.logicalExpression("&&", conditions.shift(), conditions.shift());
      for (var i = 0; i < conditions.length; i++) {
        root = t.logicalExpression("&&", root, conditions[i]);
      }
    }

    return t.logicalExpression("&&", or, root);
  }

  function shouldDeopt(args) {
    if (args.length > 1) {
      return true;
    }

    if (args.length) {
      var obj = args[0];
      if (!t.isObjectExpression(obj)) return true;

      for (var i = 0; i < obj.properties.length; i++) {
        var prop = obj.properties[i];
        if (prop.computed) return true;
      }
    }

    return false;
  }

  function buildCheck(target, args, aliases) {
    if (shouldDeopt(args)) return;

    return t.logicalExpression(
      "&&",
      target,
      maybeBuildArgsComparison(buildOr(target, aliases), target, args[0])
    );
  }

  return new babel.Plugin("inline-node-type-checks", {
    visitor: {
      CallExpression: function (node) {
        var callee = this.get("callee");
        if (!callee.isMemberExpression()) return;

        var prop = callee.get("property");
        if (!prop.isIdentifier() || callee.is("computed")) return;
        if (prop.node.name.indexOf("is") !== 0) return;

        var type = prop.node.name.slice(2);
        var aliases = t.FLIPPED_ALIAS_KEYS[type] || [type];

        var obj = callee.get("object");

        if (obj.referencesImport("babel-types", "*")) {
          return buildCheck(node.arguments.shift(), node.arguments, aliases, this.scope);
        } else {
          return buildCheck(t.memberExpression(obj.node, t.identifier("node")), node.arguments, aliases, this.scope);
        }
      }
    }
  });
};
