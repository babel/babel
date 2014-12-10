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
  this.parent = parent;
  this.block  = block;

  this.references = this.getReferences();
}

Scope.add = function (node, references) {
  if (!node) return;
  _.defaults(references, t.getIds(node, true));
};

Scope.prototype.generateTemp = function (file, name) {
  var id = file.generateUidIdentifier(name || "temp", this);
  this.push({
    key: id.name,
    id: id
  });
  return id;
};

Scope.prototype.getReferences = function () {
  var block = this.block;
  if (block._scopeReferences) return block._scopeReferences;

  var references = block._scopeReferences = {};

  var add = function (node) {
    Scope.add(node, references);
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

      // function identifier doesn't belong to this scope
      if (block.id && node === block.id) return;

      if (t.isIdentifier(node) && t.isReferenced(node, parent) && !scope.has(node.name)) {
        add(node);
      }

      // we've ran into a declaration!
      // we'll let the BlockStatement scope deal with `let` declarations unless
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

Scope.prototype.push = function (opts) {
  var block = this.block;

  if (t.isFor(block) || t.isCatchClause(block) || t.isFunction(block)) {
    t.ensureBlock(block);
    block = block.body;
  }

  if (t.isBlockStatement(block) || t.isProgram(block)) {
    block._declarations = block._declarations || {};
    block._declarations[opts.key] = {
      kind: opts.kind,
      id: opts.id,
      init: opts.init
    };
  } else {
    throw new TypeError("cannot add a declaration here in node type " + block.type);
  }
};

Scope.prototype.add = function (node) {
  Scope.add(node, this.references);
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
