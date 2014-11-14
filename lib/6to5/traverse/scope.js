module.exports = Scope;

var traverse = require("./index");
var t        = require("../types");
var _        = require("lodash");

var FOR_KEYS = ["left", "init"];

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

  // ForStatement - left, init

  if (t.isFor(block)) {
    _.each(FOR_KEYS, function (key) {
      var node = block[key];
      if (t.isLet(node)) self.add(node, ids);
    });

    block = block.body;
  }

  // Program, BlockStatement - let variables

  if (t.isBlockStatement(block) || t.isProgram(block)) {
    _.each(block.body, function (node) {
      // check for non-var `VariableDeclaration`s
      if (t.isLet(node)) self.add(node, ids);
    });
  }

  // CatchClause - param

  if (t.isCatchClause(block)) {
    self.add(block.param, ids);
  }

  // Program, Function - var variables

  if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, function (node) {
      if (t.isFor(node)) {
        _.each(FOR_KEYS, function (key) {
          var declar = node[key];
          if (t.isVar(declar)) self.add(declar, ids);
        });
      }

      // this block is a function so we'll stop since none of the variables
      // declared within are accessible
      if (t.isFunction(node)) return false;

      // we've ran into a declaration!
      // we'll let the BlockStatement scope deal with `let` declarations
      if (t.isDeclaration(node) && !t.isLet(node)) {
        self.add(node, ids);
      }
    });
  }

  // Function - params

  if (t.isFunction(block)) {
    this.add(block.rest, ids);
    _.each(block.params, function (param) {
      self.add(param, ids);
    });
  }

  return ids;
};

Scope.prototype.add = function (node, ids) {
  if (!node) return;
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
