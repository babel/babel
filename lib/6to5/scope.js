module.exports = Scope;

var traverse = require("./traverse");
var t        = require("./types");
var _        = require("lodash");

function Scope(parent, block) {
  this.parent = parent;
  this.ids    = block._scopeIds = block._scopeIds || Scope.getIds(block);
}

Scope.getIds = function (block) {
  var ids = [];

  if (t.isBlockStatement(block)) {
    _.each(block.body, function (node) {
      if (t.isVariableDeclaration(node) && node.kind !== "var") {
        ids = ids.concat(t.getIds(node));
      }
    });
  }

  if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, function (node) {
      if (t.isVariableDeclaration(node) && node.kind === "var") {
        ids = ids.concat(t.getIds(node));
      } else if (t.isFunction(node)) {
        return false;
      }
    });
  }

  if (t.isFunction(block)) {
    _.each(block.params, function (param) {
      ids = ids.concat(t.getIds(param));
    });
  }

  return ids;
};

Scope.prototype.has = function (id, noParent) {
  if (!id) return false;
  if (_.contains(this.ids, id)) return true;
  if (noParent !== false && this.parent) return this.parent.has(id);
  return false;
};
