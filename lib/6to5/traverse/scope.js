"use strict";

module.exports = Scope;

var contains = require("lodash/collection/contains");
var traverse = require("./index");
var defaults = require("lodash/object/defaults");
var globals  = require("globals");
var flatten  = require("lodash/array/flatten");
var extend   = require("lodash/object/extend");
var object   = require("../helpers/object");
var each     = require("lodash/collection/each");
var has      = require("lodash/object/has");
var t        = require("../types");

/**
 * This searches the current "scope" and collects all references/declarations
 * within.
 *
 * @param {Node} block
 * @param {Node} parentBlock
 * @param {Scope} [parent]
 * @param {File} [file]
 */

function Scope(block, parentBlock, parent, file) {
  this.parent = parent;
  this.file   = parent ? parent.file : file;

  this.parentBlock = parentBlock;
  this.block       = block;

  var info = this.getInfo();
  this.references = info.references;
  this.declarations = info.declarations;
  this.declarationKinds = info.declarationKinds;
}

Scope.defaultDeclarations = flatten([globals.builtin, globals.browser, globals.node].map(Object.keys));

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
      each(t.FOR_INIT_KEYS, function (key) {
        var declar = node[key];
        if (t.isVar(declar)) state.add(declar);
      });
    }

    // this block is a function so we'll stop since none of the variables
    // declared within are accessible
    if (t.isFunction(node)) return context.skip();

    // function identifier doesn't belong to this scope
    if (state.blockId && node === state.blockId) return;

    // delegate block scope handling to the `blockVariableVisitor`
    if (t.isBlockScoped(node)) return;

    // this will be hit again once we traverse into it after this iteration
    if (t.isExportDeclaration(node) && t.isDeclaration(node.declaration)) return;

    // we've ran into a declaration!
    if (t.isDeclaration(node)) state.add(node);
  }
};

var programReferenceVisitor = {
  enter: function (node, parent, scope, context, add) {
    if (t.isReferencedIdentifier(node, parent) && !scope.has(node.name)) {
      add(node, true);
    }
  }
};

var blockVariableVisitor = {
  enter: function (node, parent, scope, context, add) {
    if (t.isBlockScoped(node)) {
      add(node, false);
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
  var references = info.references = object();
  var declarations = info.declarations = object();
  var declarationKinds = info.declarationKinds = {
    "var": object(),
    "let": object(),
    "const": object()
  };

  var add = function (node, reference) {
    var ids = t.getBindingIdentifiers(node);

    extend(references, ids);

    if (!reference) {
      for (var key in ids) {
        if (declarationKinds["let"][key] || declarationKinds["const"][key]) {
          throw self.file.errorWithNode(ids[key], "Duplicate declaration " + key, TypeError);
        }
      }

      extend(declarations, ids);

      var kinds = declarationKinds[node.kind];
      if (kinds) extend(kinds, ids);
    }
  };

  if (parent && t.isBlockStatement(block) && t.isFor(parent.block, { body: block })) {
    // delegate block let declarations to the parent loop
    return info;
  }

  // ForStatement - left, init

  if (t.isFor(block)) {
    each(t.FOR_INIT_KEYS, function (key) {
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

  if (t.isFunctionExpression(block) && block.id) {
    if (!t.isProperty(this.parentBlock, { method: true })) {
      // SpiderMonkey AST doesn't use MethodDefinition here when it probably
      // should since they should be semantically the same?
      add(block.id);
    }
  }

  // Program

  if (t.isProgram(block)) {
    traverse(block, programReferenceVisitor, this, add);
  }

  // Function - params, rest

  if (t.isFunction(block)) {
    each(block.params, function (param) {
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
 * @param {String} kind
 * @param {Object} node
 */

Scope.prototype.addDeclarationToFunctionScope = function (kind, node) {
  var scope = this.getFunctionParent();
  var ids   = t.getBindingIdentifiers(node);

  extend(scope.declarations, ids);
  extend(scope.references, ids);

  // this ignores the duplicate declaration logic specified in `getInfo`
  // but it doesn't really matter
  extend(scope.declarationKinds[kind], ids);
};

/**
 * Walk up the scope tree until we hit either a Function or reach the
 * very top at hit Program.
 */

Scope.prototype.getFunctionParent = function () {
  var scope = this;
  while (scope.parent && !t.isFunction(scope.block)) {
    scope = scope.parent;
  }
  return scope;
};

/**
 * Walks the scope tree and gathers **all** declarations.
 *
 * @returns {Object}
 */

Scope.prototype.getAllDeclarations = function () {
  var ids = object();

  var scope = this;
  do {
    defaults(ids, scope.declarations);
    scope = scope.parent;
  } while (scope);

  return ids;
};

/**
 * Walks the scope tree and gathers all declarations of `kind`.
 *
 * @param {String} kind
 * @returns {Object}
 */

Scope.prototype.getAllDeclarationsOfKind = function (kind) {
  var ids = object();

  var scope = this;
  do {
    defaults(ids, scope.declarationKinds[kind]);
    scope = scope.parent;
  } while (scope);

  return ids;
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
  return has(refs, id) && refs[id];
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
  if (!id) return false;
  if (this.hasOwn(id, decl)) return true;
  if (this.parentHas(id, decl)) return true;
  if (contains(Scope.defaultDeclarations, id)) return true;
  return false;
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
