module.exports = Scope;

var traverse = require("./index");
var t        = require("../types");
var _        = require("lodash");

var FOR_KEYS = ["left", "init"];

/**
 * This searches the current "scope" and collects all references/declarations
 * within.
 *
 * @param {Node} block
 * @param {Scope} [parent]
 */

function Scope(block, parent) {
  if (!parent && block._parent) {
    parent = block._parent._scope;
  }

  this.parent = parent;
  this.block  = block;

  this.references = this.getReferences();
}

Scope.prototype.getReferences = function () {
  var block = this.block;
  if (block._scopeReferences) return block._scopeReferences;

  var self       = this;
  var references = block._scopeReferences = {};

  var add = function (node) {
    self.add(node, references);
  };

  // ForStatement - left, init

  if (t.isFor(block)) {
    _.each(FOR_KEYS, function (key) {
      var node = block[key];
      if (t.isLet(node)) add(node);
    });

    block = block.body;
  }

  // Program, BlockStatement - let variables

  if (t.isBlockStatement(block) || t.isProgram(block)) {
    _.each(block.body, function (node) {
      // check for non-var `VariableDeclaration`s
      if (t.isLet(node)) add(node);
    });
  }

  // CatchClause - param

  if (t.isCatchClause(block)) {
    add(block.param);
  }

  // Program, Function - var variables

  if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, function (node, parent, scope) {
      if (t.isFor(node)) {
        _.each(FOR_KEYS, function (key) {
          var declar = node[key];
          if (t.isVar(declar)) add(declar);
        });
      }

      // this block is a function so we'll stop since none of the variables
      // declared within are accessible
      if (t.isFunction(node)) return false;

      if (t.isIdentifier(node) && t.isReferenced(node, parent) && !scope.has(node.name)) {
        add(node);
      }

      // we've ran into a declaration!
      // we'll let the BlockStatement scope deal with `let` declarations
      if (t.isDeclaration(node) && !t.isLet(node)) {
        add(node);
      }
    }, { scope: this });
  }

  // Function - params, rest

  if (t.isFunction(block)) {
    add(block.rest);
    _.each(block.params, function (param) {
      add(param);
    });
  }

  return references;
};

Scope.prototype.add = function (node, references) {
  if (!node) return;
  _.merge(references || this.references, t.getIds(node, true));
};

Scope.prototype.get = function (id) {
  return id && (this.getOwn(id) || this.parentGet(id));
};

Scope.prototype.getOwn = function (id) {
  return _.has(this.references, id) && this.references[id];
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
