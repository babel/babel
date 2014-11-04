module.exports = Scope;

var traverse = require("./traverse");
var t        = require("./types");
var _        = require("lodash");

function Scope(parent, block) {
  this.parent = parent;

  var ids = [];

  if (t.isBlockStatement(block)) {
    _.each(block.body, function (node) {
      if (t.isVariableDeclaration(node)) {
        ids = ids.concat(t.getIds(node));
      }
    });
  }

  if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, function (node) {
      if (t.isVariableDeclaration(node)) {
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

  this.ids = ids;
}

Scope.prototype.has = function (id) {
  if (!id) return false;
  if (_.contains(this.ids, id)) return true;
  if (this.parent) return this.parent.has(id);
  return false;
};
