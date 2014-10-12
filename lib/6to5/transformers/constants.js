var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

exports.Program =
exports.BlockStatement =
exports.ForInStatement =
exports.ForOfStatement =
exports.ForStatement = function (node) {
  var constants = [];

  var check = function (node, name) {
    if (constants.indexOf(name) >= 0) {
      throw util.errorWithNode(node, name + " is read-only");
    }
  };

  _.each(node.body, function (child) {
    if (child && child.type === "VariableDeclaration" && child.kind === "const") {
      _.each(child.declarations, function (declar) {
        var search = [declar.id];
        var names  = [];

        while (search.length) {
          var id = search.shift();

          if (id.type === "Identifier") {
            names.push(id.name);
          } else if (id.type === "ArrayPattern") {
            _.each(id.elements, function (elem) {
              search.push(elem);
            });
          } else if (id.type === "ObjectPattern") {
            _.each(id.properties, function (prop) {
              search.push(prop.value);
            });
          } else {
            throw new Error("unknown node " + id.type);
          }
        }

        _.each(names, function (name) {
          check(declar, name);
          constants.push(name);
        });

        declar._ignoreConstant = true;
      });
      child.kind = "let";
    }
  });

  if (!constants.length) return;

  traverse(node, function (child) {
    if (child._ignoreConstant) return;

    if (child.type === "VariableDeclarator" ||
        child.type === "FunctionDeclaration" ||
        child.type === "ClassDeclaration") {
      check(child, child.id.name);
    } else if (child.type === "AssignmentExpression") {
      check(child, child.left.name);
    }
  });
};
