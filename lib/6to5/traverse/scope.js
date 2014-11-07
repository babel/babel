module.exports = Scope;

var traverse = require("./index");
var t        = require("../types");
var _        = require("lodash");

function Scope(parent, block) {
  this.parent = parent;
  this.block  = block;
  this.ids    = block._scopeIds = block._scopeIds || Scope.getIds(block);
}

Scope.getIds = function (block) {
  var ids = {};

  if (t.isBlockStatement(block)) {
    _.each(block.body, function (node) {
      if (t.isVariableDeclaration(node) && node.kind !== "var") {
        _.merge(ids, t.getIds(node, true));
      }
    });
  } else if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, function (node, parent) {
      if (parent !== block && t.isVariableDeclaration(node) && node.kind !== "var") {
        return;
      }

      if (t.isDeclaration(node)) {
        _.merge(ids, t.getIds(node, true));
      } else if (t.isFunction(node)) {
        return false;
      }
    });
  }

  if (t.isFunction(block)) {
    _.each(block.params, function (param) {
      _.merge(ids, t.getIds(param, true));
    });
  }

  return ids;
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
