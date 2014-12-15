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

  var info = this.getInfo();
  this.references = info.references;
  this.declarations = info.declarations;
}

var vars = require("jshint/src/vars");
Scope.defaultDeclarations = _.flatten([vars.newEcmaIdentifiers, vars.node, vars.ecmaIdentifiers, vars.reservedVars].map(_.keys));

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

Scope.prototype.getInfo = function () {
  var block = this.block;
  if (block._scopeInfo) return block._scopeInfo;

  var info = block._scopeInfo = {};
  var references = info.references = {};
  var declarations = info.declarations = {};

  var add = function (node, reference) {
    Scope.add(node, references);
    if (!reference) Scope.add(node, declarations);
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
        add(node, true);
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

  return info;
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

Scope.prototype.get = function (id, decl) {
  return id && (this.getOwn(id, decl) || this.parentGet(id, decl));
};

Scope.prototype.getOwn = function (id, decl) {
  var refs = this.references;
  if (decl) refs = this.declarations;
  return _.has(refs, id) && refs[id];
};

Scope.prototype.parentGet = function (id, decl) {
  return this.parent && this.parent.get(id, decl);
};

Scope.prototype.has = function (id, decl) {
  return (id && (this.hasOwn(id, decl) || this.parentHas(id, decl))) ||
         _.contains(Scope.defaultDeclarations, id);
};

Scope.prototype.hasOwn = function (id, decl) {
  return !!this.getOwn(id, decl);
};

Scope.prototype.parentHas = function (id, decl) {
  return this.parent && this.parent.has(id, decl);
};
