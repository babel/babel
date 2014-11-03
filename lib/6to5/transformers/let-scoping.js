var traverse = require("../traverse");
var util     = require("../util");
var t        = require("../types");
var _        = require("lodash");

exports.VariableDeclaration = function (node, parent, file) {
  if (node.kind !== "let") return;
  node.kind = "var";

  var ids = {};

  _.each(node.declarations, function (declar) {
    _.each(util.getIds(declar.id), function (id) {
      ids[id] = t.identifier(file.generateUid(id));
    });
  });

  var replaceId = function (node, parent) {
    // not an identifier so we have no use for this node
    if (node.type !== "Identifier") return;

    // not a let reference
    var id = ids[node.name];
    if (!id) return;

    if (t.isReferenced(node, parent)) return id;
  };

  var isProgram = t.isProgram(parent);

  var replace = function (node, parent) {
    if (!isProgram && _.contains(t.FUNCTION_TYPES, node.type)) {
      var letReferences = [];

      traverse(node, function (node, parent) {
        var id = replaceId(node, parent);
        if (id && !_.contains(letReferences, id)) letReferences.push(id);
        return id;
      });

      if (letReferences.length) {
        if (t.isFunctionDeclaration(node)) {
          throw new Error("`FunctionDeclaration`s that use `let` and `constant` references aren't allowed outside of the root scope");
        } else {
          var func = t.functionExpression(null, letReferences, t.blockStatement([
            t.returnStatement(node)
          ]));
          func._aliasFunction = true;
          return t.callExpression(func, letReferences);
        }
      } else {
        return false;
      }
    }

    return replaceId(node, parent);
  };

  traverse(parent, replace);
};
