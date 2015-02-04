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
 * This searches the current "scope" and collects all references/bindings
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

  this.crawl();
}

Scope.defaultDeclarations = flatten([globals.builtin, globals.browser, globals.node].map(Object.keys));

/**
 * Description
 *
 * @param {Object} node
 * @param {Object} opts
 * @param [state]
 */

Scope.prototype.traverse = function (node, opts, state) {
  traverse(node, opts, this, state);
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
  if (t.isIdentifier(node) && this.hasBinding(node.name)) {
    return null;
  }

  var id = this.generateUidBasedOnNode(node);
  this.push({
    key: id.name,
    id: id
  });
  return id;
};

Scope.prototype.checkBlockScopedCollisions = function (key, id) {
  if (this.declarationKinds["let"][key] || this.declarationKinds["const"][key]) {
    throw this.file.errorWithNode(id, "Duplicate declaration " + key, TypeError);
  }
};

Scope.prototype.inferType = function (node) {
  var target;

  if (t.isVariableDeclarator(node)) {
    target = node.init;
  }

  if (t.isLiteral(target) || t.isArrayExpression(target) || t.isObjectExpression(target)) {
    // todo: possibly call some helper that will resolve these to a type annotation
  }

  if (t.isCallExpression(target)) {
    // todo: need to resolve this to a return type
  }

  if (t.isMemberExpression(target)) {
    // todo: crawl this and find the correct type, bail on anything that we cannot
    // possibly be 100% confident on
  }

  if (t.isIdentifier(target)) {
    return this.getType(target.name);
  }
};

Scope.prototype.registerType = function (key, id, node) {
  var type;

  if (id.typeAnnotation) {
    type = id.typeAnnotation;
  }

  if (!type) {
    type = this.inferType(node);
  }

  if (type) {
    if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
    this.types[key] = type;
  }
};

Scope.prototype.register = function (node, reference, kind) {
  if (t.isVariableDeclaration(node)) {
    return this.registerVariableDeclaration(node);
  }

  var ids = t.getBindingIdentifiers(node);

  extend(this.references, ids);

  if (reference) return;

  for (var key in ids) {
    var id = ids[key];

    this.checkBlockScopedCollisions(key, id);

    this.registerType(key, id, node);
    this.bindings[key] = id;
  }

  var kinds = this.declarationKinds[kind];
  if (kinds) extend(kinds, ids);
};

Scope.prototype.registerVariableDeclaration = function (declar) {
  var declars = declar.declarations;
  for (var i = 0; i < declars.length; i++) {
    this.register(declars[i], false, declar.kind);
  }
};

var functionVariableVisitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isFor(node)) {
      each(t.FOR_INIT_KEYS, function (key) {
        var declar = node[key];
        if (t.isVar(declar)) state.scope.register(declar);
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
    if (t.isDeclaration(node)) state.scope.register(node);
  }
};

var programReferenceVisitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isReferencedIdentifier(node, parent) && !scope.hasReference(node.name)) {
      state.register(node, true);
    }
  }
};

var blockVariableVisitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isBlockScoped(node)) {
      state.register(node);
    } else if (t.isScope(node)) {
      context.skip();
    }
  }
};

Scope.prototype.crawl = function () {
  var parent = this.parent;
  var block  = this.block;
  var i;

  //

  var info = block._scopeInfo;
  if (info) {
    extend(this, info);
    return;
  }

  info = block._scopeInfo = {
    declarationKinds: {
      "const": object(),
      "var":   object(),
      "let":   object()
    },

    references: object(),
    bindings:   object(),
    types:      object(),
  };

  extend(this, info);

  //

  if (parent && t.isBlockStatement(block) && t.isLoop(parent.block, { body: block })) {
    // delegate let bindings to the parent loop
    return;
  }

  // ForStatement - left, init

  if (t.isLoop(block)) {
    for (i = 0; i < t.FOR_INIT_KEYS.length; i++) {
      var node = block[t.FOR_INIT_KEYS[i]];
      if (t.isBlockScoped(node)) this.register(node, false, true);
    }

    if (t.isBlockStatement(block.body)) {
      block = block.body;
    }
  }

  // Program, BlockStatement - let variables

  if (t.isBlockStatement(block) || t.isProgram(block)) {
    traverse(block, blockVariableVisitor, this, this);
  }

  // CatchClause - param

  if (t.isCatchClause(block)) {
    this.register(block.param);
  }

  // ComprehensionExpression - blocks

  if (t.isComprehensionExpression(block)) {
    this.register(block);
  }

  // Function - params, rest

  if (t.isFunction(block)) {
    for (i = 0; i < block.params.length; i++) {
      this.register(block.params[i]);
    }
  }

  // Program, Function - var variables

  if (t.isProgram(block) || t.isFunction(block)) {
    traverse(block, functionVariableVisitor, this, {
      blockId: block.id,
      scope:   this
    });
  }

  if (t.isFunctionExpression(block) && block.id) {
    if (!t.isProperty(this.parentBlock, { method: true })) {
      // SpiderMonkey AST doesn't use MethodDefinition here when it probably
      // should since they should be semantically the same?
      this.register(block.id);
    }
  }

  // Program

  if (t.isProgram(block)) {
    traverse(block, programReferenceVisitor, this, this);
  }
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

  extend(scope.bindings, ids);
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
 * Walks the scope tree and gathers **all** bindings.
 *
 * @returns {Object}
 */

Scope.prototype.getAllBindings = function () {
  var ids = object();

  var scope = this;
  do {
    defaults(ids, scope.bindings);
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

//

Scope.prototype.get = function (id, type) {
  return id && (this.getOwn(id, type) || this.parentGet(id, type));
};

Scope.prototype.getOwn = function (id, type) {
  var refs = {
    reference: this.references,
    binding:   this.bindings,
    type:      this.types
  }[type];
  return refs && has(refs, id) && refs[id];
};

Scope.prototype.parentGet = function (id, type) {
  return this.parent && this.parent.get(id, type);
};

Scope.prototype.has = function (id, type) {
  if (!id) return false;
  if (this.hasOwn(id, type)) return true;
  if (this.parentHas(id, type)) return true;
  if (contains(Scope.defaultDeclarations, id)) return true;
  return false;
};

Scope.prototype.hasOwn = function (id, type) {
  return !!this.getOwn(id, type);
};

Scope.prototype.parentHas = function (id, type) {
  return this.parent && this.parent.has(id, type);
};

each({
  reference: "Reference",
  binding: "Binding",
  type: "Type"
}, function (title, type) {
  each([
    "get",
    "has",
    "getOwn",
    "hasOwn",
    "parentGet",
    "parentHas",
  ], function (methodName) {
    Scope.prototype[methodName + title] = function (id) {
      return this[methodName](id, type);
    };
  });
});
