"use strict";

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
 * @param {File} [file]
 */

function Scope(block, parent, file) {
  this.parent = parent;
  this.block  = block;
  this.file   = parent ? parent.file : file;

  var info = this.getInfo();
  this.references = info.references;
  this.declarations = info.declarations;
}

var vars = require("jshint/src/vars");

Scope.defaultDeclarations = _.flatten([
  vars.newEcmaIdentifiers,
  vars.node,
  vars.ecmaIdentifiers,
  vars.reservedVars
].map(_.keys));

Scope.prototype._add = function (node, references, throwOnDuplicate) {
  if (!node) return;

  var ids = t.getIds(node, true);

  for (var key in ids) {
    var id = ids[key];

    if (throwOnDuplicate && references[key]) {
      throw this.file.errorWithNode(id, "Duplicate declaration", TypeError);
    }

    references[key] = id;
  }
};

/**
 * Description
 *
 * @param {File} file
 * @param {String} [name="temp"]
 */

Scope.prototype.generateTemp = function (file, name) {
  var id = file.generateUidIdentifier(name || "temp", this);
  this.push({
    key: id.name,
    id: id
  });
  return id;
};

/**
 * Description
 *
 * @param {String} name
 */

Scope.prototype.generateUidIdentifier = function (name) {
  return this.file.generateUidIdentifier(name, this);
};

/*
 * Description
 *
 * @param {Object} parent
 * @returns {Object}
 */

Scope.prototype.generateUidBasedOnNode = function (parent) {
  var node = parent;

  if (t.isAssignmentExpression(parent)) {
    node = parent.left;
  } else if (t.isVariableDeclarator(parent)) {
    node = parent.id;
  } else if (t.isProperty(node)) {
    node = node.key;
  }

  var parts = [];

  var add = function (node) {
    if (t.isMemberExpression(node)) {
      add(node.object);
      add(node.property);
    } else if (t.isIdentifier(node)) {
      parts.push(node.name);
    } else if (t.isLiteral(node)) {
      parts.push(node.value);
    } else if (t.isCallExpression(node)) {
      add(node.callee);
    }
  };

  add(node);

  var id = parts.join("$");
  id = id.replace(/^_/, "") || "ref";

  return this.file.generateUidIdentifier(id, this);
};

/**
 * Description
 *
 * @param {Object} node
 * @returns {Object}
 */

Scope.prototype.generateTempBasedOnNode = function (node) {
  if (t.isIdentifier(node) && this.has(node.name, true)) {
    return null;
  }

  var id = this.generateUidBasedOnNode(node);
  this.push({
    key: id.name,
    id: id
  });
  return id;
};

var functionVariableVisitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isFor(node)) {
      _.each(FOR_KEYS, function (key) {
        var declar = node[key];
        if (t.isVar(declar)) state.add(declar);
      });
    }

    // this block is a function so we'll stop since none of the variables
    // declared within are accessible
    if (t.isFunction(node)) return context.skip();

    // function identifier doesn't belong to this scope
    if (state.blockId && node === state.blockId) return;

    if (t.isIdentifier(node) && t.isReferenced(node, parent) && !scope.has(node.name)) {
      state.add(node, true);
    }

    // we've ran into a declaration!
    // we'll let the BlockStatement scope deal with `let` declarations unless
    if (t.isDeclaration(node) && !t.isBlockScoped(node)) {
      state.add(node);
    }
  }
};

var blockVariableVisitor = {
  enter: function (node, parent, scope, context, add) {
    if (t.isBlockScoped(node)) {
      add(node, false, true);
      context.stop();
    } else if (t.isScope(node)) {
      context.skip();
    }
  }
};

Scope.prototype.getInfo = function () {
  var parent = this.parent;
  var block  = this.block;
  var self   = this;
  if (block._scopeInfo) return block._scopeInfo;

  var info = block._scopeInfo = {};
  var references = info.references = {};
  var declarations = info.declarations = {};

  var add = function (node, reference, throwOnDuplicate) {
    self._add(node, references);
    if (!reference) self._add(node, declarations, throwOnDuplicate);
  };

  if (parent && t.isBlockStatement(block) && t.isFor(parent.block)) {
    return info;
  }

  // ForStatement - left, init

  if (t.isFor(block)) {
    _.each(FOR_KEYS, function (key) {
      var node = block[key];
      if (t.isBlockScoped(node)) add(node, false, true);
    });

    if (t.isBlockStatement(block.body)) {
      block = block.body;
    }
  }

  // Program, BlockStatement - let variables

  if (t.isBlockStatement(block) || t.isProgram(block)) {
    traverse(block, blockVariableVisitor, this, add);
  }

  // CatchClause - param

  if (t.isCatchClause(block)) {
    add(block.param);
  }

  // ComprehensionExpression - blocks

  if (t.isComprehensionExpression(block)) {
    add(block);
  }

  // Program, Function - var variables

  if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, functionVariableVisitor, this, {
      blockId: block.id,
      add:     add
    });
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

/**
 * Description
 *
 * @param {Object} opts
 */

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

/**
 * Walk up the scope tree until we hit a `Function` and then
 * push our `node` to it's references.
 *
 * @param {Object} node
 */

Scope.prototype.add = function (node) {
  var scope = this;
  while (scope.parent && !t.isFunction(scope.block)) {
    scope = scope.parent;
  }
  scope._add(node, scope.references);
};

/**
 * Description
 *
 * @param {String} [id]
 * @param {Boolean} [decl]
 */

Scope.prototype.get = function (id, decl) {
  return id && (this.getOwn(id, decl) || this.parentGet(id, decl));
};

/**
 * Description
 *
 * @param {String} [id]
 * @param {Boolean} [decl]
 */

Scope.prototype.getOwn = function (id, decl) {
  var refs = this.references;
  if (decl) refs = this.declarations;
  return _.has(refs, id) && refs[id];
};

/**
 * Description
 *
 * @param {String} [id]
 * @param {Boolean} [decl]
 */

Scope.prototype.parentGet = function (id, decl) {
  return this.parent && this.parent.get(id, decl);
};

/**
 * Description
 *
 * @param {String} [id]
 * @param {Boolean} [decl]
 * @returns {Boolean}
 */

Scope.prototype.has = function (id, decl) {
  return (id && (this.hasOwn(id, decl) || this.parentHas(id, decl))) ||
         _.contains(Scope.defaultDeclarations, id);
};

/**
 * Description
 *
 * @param {String} [id]
 * @param {Boolean} [decl]
 * @returns {Boolean}
 */

Scope.prototype.hasOwn = function (id, decl) {
  return !!this.getOwn(id, decl);
};

/**
 * Description
 *
 * @param {String} [id]
 * @param {Boolean} [decl]
 * @returns {Boolean}
 */

Scope.prototype.parentHas = function (id, decl) {
  return this.parent && this.parent.has(id, decl);
};
