module.exports = Scope;

var traverse = require("./index");
var t        = require("../types");
var _        = require("lodash");

function Scope(parent, block) {
  this.parent = parent;
  this.block  = block;
  this.ids    = this.getIds();

  this.getIds();
}

Scope.prototype.getIds = function () {
  var block = this.block;
  if (block._scopeIds) return block._scopeIds;

  var self = this;
  var ids  = block._scopeIds = {};

  if (t.isBlockStatement(block)) {
    _.each(block.body, function (node) {
      if (t.isVariableDeclaration(node) && node.kind !== "var") {
        self.add(node, ids);
      }
    });
  } else if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, function (node, parent) {
      if (parent !== block && t.isVariableDeclaration(node) && node.kind !== "var") {
        return;
      }

      if (t.isDeclaration(node)) {
        self.add(node, ids);
      } else if (t.isFunction(node)) {
        return false;
      }
    });
  } else if (t.isCatchClause(block)) {
    self.add(block.param, ids);
  }

  if (t.isFunction(block)) {
    _.each(block.params, function (param) {
      self.add(param, ids);
    });
  }

  return ids;
};

Scope.prototype.add = function (node, ids) {
  _.merge(ids || this.ids, t.getIds(node, true));
};

Scope.prototype.get = function (id) {
  return id && (this.getOwn(id) || this.parentGet(id));
};

Scope.prototype.getOwn = function (id) {
  return _.has(this.ids, id) && this.ids[id];
};

Scope.prototype.parentGet = function (id) {
  return this.parent && this.parent.get(id);
};

Scope.prototype.has = function (id) {
  return id && (this.hasOwn(id) || this.parentHas(id));
};

Scope.prototype.hasOwn = function (id) {
  return !!this.getOwn(id);
};

Scope.prototype.parentHas = function (id) {
  return this.parent && this.parent.has(id);
};
