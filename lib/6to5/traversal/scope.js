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

Scope.prototype.checkBlockScopedCollisions = function (kind, name, id) {
  var local = this.getOwnBindingInfo(name);
  if (!local) return;

  if (kind === "param") return;
  if (kind === "hoisted" && local.kind === "let") return;

  if (local.kind === "let" || local.kind === "const") {
    throw this.file.errorWithNode(id, "Duplicate declaration " + name, TypeError);
  }
};

Scope.prototype.rename = function (oldName, newName) {
  newName = newName || this.generateUidIdentifier(oldName).name;

  var info = this.getBindingInfo(oldName);
  if (!info) return;

  var binding = info.identifier;
  var scope = info.scope;

  this.clearOwnBinding(oldName);
  scope.bindings[newName] = binding;

  binding.name = newName;

  scope.traverse(scope.block, {
    enter: function (node, parent, scope) {
      if (t.isReferencedIdentifier(node, parent) && node.name === oldName) {
        node.name = newName;
      } else if (t.isScope(node)) {
        if (scope.bindingIdentifierEquals(oldName, binding)) {
          this.skip();
        }
      }
    }
  });
};

Scope.prototype.inferType = function (node) {
  var target;

  if (t.isVariableDeclarator(node)) {
    target = node.init;
  }

  if (t.isCallExpression(target)) {
    // todo: resolve this to a return type
  }

  if (t.isMemberExpression(target)) {
    // todo: crawl this and find the correct type, bail on anything that we cannot possibly be 100% confident on
  }

  if (t.isIdentifier(target)) {
    // todo
  }
};

Scope.prototype.getTypeAnnotation = function (key, id, node) {
  var type;

  if (id.typeAnnotation) {
    type = id.typeAnnotation;
  }

  if (!type) {
    type = this.inferType(node);
  }

  if (type) {
    if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
    return type;
  }
};

Scope.prototype.clearOwnBinding = function (name) {
  delete this.bindings[name];
};

Scope.prototype.registerDeclaration = function (node) {
  if (t.isFunctionDeclaration(node)) {
    this.registerBinding("hoisted", node);
  } else if (t.isVariableDeclaration(node)) {
    for (var i = 0; i < node.declarations.length; i++) {
      this.registerBinding(node.kind, node.declarations[i]);
    }
  } else if (t.isClassDeclaration(node)) {
    this.registerBinding("let", node);
  } else if (t.isImportDeclaration(node) || t.isExportDeclaration(node)) {
    this.registerBinding("module", node);
  } else {
    this.registerBinding("unknown", node);
  }
};

Scope.prototype.registerBinding = function (kind, node) {
  if (!kind) throw new ReferenceError("no `kind`");

  var ids = t.getBindingIdentifiers(node);

  for (var name in ids) {
    var id = ids[name];

    this.checkBlockScopedCollisions(kind, name, id);

    this.bindings[name] = {
      typeAnnotation: this.getTypeAnnotation(name, id, node),
      identifier:     id,
      scope:          this,
      kind:           kind
    };
  }
};

Scope.prototype.registerVariableDeclaration = function (declar) {
  var declars = declar.declarations;
  for (var i = 0; i < declars.length; i++) {
    this.registerBinding(declars[i], declar.kind);
  }
};

var functionVariableVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isFor(node)) {
      each(t.FOR_INIT_KEYS, function (key) {
        var declar = node[key];
        if (t.isVar(declar)) state.scope.registerBinding("var", declar);
      });
    }

    // this block is a function so we'll stop since none of the variables
    // declared within are accessible
    if (t.isFunction(node)) return this.skip();

    // function identifier doesn't belong to this scope
    if (state.blockId && node === state.blockId) return;

    // delegate block scope handling to the `blockVariableVisitor`
    if (t.isBlockScoped(node)) return;

    // this will be hit again once we traverse into it after this iteration
    if (t.isExportDeclaration(node) && t.isDeclaration(node.declaration)) return;

    // we've ran into a declaration!
    if (t.isDeclaration(node)) state.scope.registerDeclaration(node);
  }
};

Scope.prototype.addGlobal = function (node) {
  this.globals[node.name] = node;
};

Scope.prototype.hasGlobal = function (name) {
  var scope = this;

  do {
    if (scope.globals[name]) return true;
  } while (scope = scope.parent);

  return false;
};

var programReferenceVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isReferencedIdentifier(node, parent) && !scope.hasBinding(node.name)) {
      state.addGlobal(node);
    } else if (t.isLabeledStatement(node)) {
      state.addGlobal(node);
    }
  }
};

var blockVariableVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isFunctionDeclaration(node) || t.isBlockScoped(node)) {
      state.registerDeclaration(node);
    } else if (t.isScope(node)) {
      this.skip();
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
    bindings: object(),
    globals:  object()
  };

  extend(this, info);

  //

  if (parent && t.isBlockStatement(block)) {
    if (t.isLoop(parent.block, { body: block }) ||
        t.isFunction(parent.block, { body: block })) {
      return;
    }
  }

  // ForStatement - left, init

  if (t.isLoop(block)) {
    for (i = 0; i < t.FOR_INIT_KEYS.length; i++) {
      var node = block[t.FOR_INIT_KEYS[i]];
      if (t.isBlockScoped(node)) this.registerBinding("let", node);
    }

    if (t.isBlockStatement(block.body)) {
      block = block.body;
    }
  }

  // FunctionExpression - id

  if (t.isFunctionExpression(block) && block.id) {
    if (!t.isProperty(this.parentBlock, { method: true })) {
      this.registerBinding("var", block.id);
    }
  }

  // Function - params, rest

  if (t.isFunction(block)) {
    for (i = 0; i < block.params.length; i++) {
      this.registerBinding("param", block.params[i]);
    }
    this.traverse(block.body, blockVariableVisitor, this);
  }

  // Program, BlockStatement, Function - let variables

  if (t.isBlockStatement(block) || t.isProgram(block)) {
    this.traverse(block, blockVariableVisitor, this);
  }

  // CatchClause - param

  if (t.isCatchClause(block)) {
    this.registerBinding("let", block.param);
  }

  // ComprehensionExpression - blocks

  if (t.isComprehensionExpression(block)) {
    this.registerBinding("let", block);
  }

  // Program, Function - var variables

  if (t.isProgram(block) || t.isFunction(block)) {
    this.traverse(block, functionVariableVisitor, {
      blockId: block.id,
      scope:   this
    });
  }

  // Program

  if (t.isProgram(block)) {
    this.traverse(block, programReferenceVisitor, this);
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
 * Walk up the scope tree until we hit either a Function or reach the
 * very top and hit Program.
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

Scope.prototype.getAllBindingsOfKind = function (kind) {
  var ids = object();

  var scope = this;
  do {
    for (var name in scope.bindings) {
      var binding = scope.bindings[name];
      if (binding.kind === kind) ids[name] = binding;
    }
    scope = scope.parent;
  } while (scope);

  return ids;
};

// misc

Scope.prototype.bindingIdentifierEquals = function (name, node) {
  return this.getBindingIdentifier(name) === node;
};

// get

Scope.prototype.getBindingInfo = function (name) {
  var scope = this;

  do {
    var binding = scope.getOwnBindingInfo(name);
    if (binding) return binding;
  } while (scope = scope.parent);
};

Scope.prototype.getOwnBindingInfo = function (name) {
  return this.bindings[name];
};

Scope.prototype.getBindingIdentifier = function (name) {
  var info = this.getBindingInfo(name);
  return info && info.identifier;
};

Scope.prototype.getOwnBindingIdentifier = function (name) {
  var binding = this.bindings[name];
  return binding && binding.identifier;
};

// has

Scope.prototype.hasOwnBinding = function (name) {
  return !!this.getOwnBindingInfo(name);
};

Scope.prototype.hasBinding = function (name) {
  if (!name) return false;
  if (this.hasOwnBinding(name)) return true;
  if (this.parentHasBinding(name)) return true;
  if (contains(Scope.defaultDeclarations, name)) return true;
  return false;
};

Scope.prototype.parentHasBinding = function (name) {
  return this.parent && this.parent.hasBinding(name);
};
