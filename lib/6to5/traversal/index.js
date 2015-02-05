"use strict";

module.exports = traverse;

/* jshint maxparams:7 */

var Scope    = require("./scope");
var t        = require("../types");
var contains = require("lodash/collection/contains");
var flatten  = require("lodash/array/flatten");
var compact  = require("lodash/array/compact");

function TraversalContext(scope) {
  this.shouldFlatten = false;
  this.shouldRemove  = false;
  this.shouldSkip    = false;
  this.shouldStop    = false;
  this.scope         = scope;
}

TraversalContext.prototype.flatten = function () {
  this.shouldFlatten = true;
};

TraversalContext.prototype.remove = function () {
  this.shouldRemove = true;
  this.shouldSkip   = true;
};

TraversalContext.prototype.skip = function () {
  this.shouldSkip = true;
};

TraversalContext.prototype.stop = function () {
  this.shouldStop = true;
  this.shouldSkip = true;
};

TraversalContext.prototype.reset = function () {
  this.shouldRemove = false;
  this.shouldSkip   = false;
  this.shouldStop   = false;
};

TraversalContext.prototype.maybeRemove = function (obj, key) {
  if (this.shouldRemove) {
    obj[key] = null;
    this.flatten();
  }
};

TraversalContext.prototype.replaceNode = function (obj, key, node, replacement, scope) {
  var isArray = Array.isArray(replacement);

  // inherit comments from original node to the first replacement node
  var inheritTo = replacement;
  if (isArray) inheritTo = replacement[0];
  if (inheritTo) t.inheritsComments(inheritTo, node);

  // replace the node
  obj[key] = replacement;

  var file = this.scope && this.scope.file;
  if (file) {
    if (isArray) {
      for (var i = 0; i < replacement.length; i++) {
        file.checkNode(replacement[i], scope);
      }
    } else {
      file.checkNode(replacement, scope);
    }
  }

  // we're replacing a statement or block node with an array of statements so we better
  // ensure that it's a block
  if (isArray && contains(t.STATEMENT_OR_BLOCK_KEYS, key) && !t.isBlockStatement(obj)) {
    t.ensureBlock(obj, key);
  }

  if (isArray) {
    this.flatten();
  }
};

TraversalContext.prototype.call = function (fn, obj, key, node, parent, scope, state) {
  var replacement = fn(node, parent, scope, this, state);

  if (replacement) {
    this.replaceNode(obj, key, node, replacement, scope);
    node = replacement;
  }

  this.maybeRemove(obj, key);

  return node;
};

TraversalContext.prototype.visitNode = function (obj, key, opts, scope, parent, state) {
  this.reset();

  var node = obj[key];

  // type is blacklisted
  if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1) {
    return;
  }

  var ourScope = scope;
  // we're entering a new scope so let's construct it!
  if (!opts.noScope && t.isScope(node)) {
    ourScope = new Scope(node, parent, scope);
  }

  node = this.call(opts.enter, obj, key, node, parent, ourScope, state);

  if (this.shouldSkip) {
    return this.shouldStop;
  }

  if (Array.isArray(node)) {
    // traverse over these replacement nodes we purposely don't call exitNode
    // as the original node has been destroyed
    for (var i = 0; i < node.length; i++) {
      traverseNode(node[i], opts, ourScope, state);
    }
  } else {
    traverseNode(node, opts, ourScope, state);
    this.call(opts.exit, obj, key, node, parent, ourScope, state);
  }

  return this.shouldStop;
};

TraversalContext.prototype.visit = function (node, key, opts, scope, state) {
  var nodes = node[key];
  if (!nodes) return;

  if (!Array.isArray(nodes)) {
    return this.visitNode(node, key, opts, scope, node, state);
  }

  if (nodes.length === 0) {
    return;
  }

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && this.visitNode(nodes, i, opts, scope, node, state)) {
      return true;
    }
  }

  if (this.shouldFlatten) {
    node[key] = flatten(node[key]);

    if (key === "body") {
      // we can safely compact this
      node[key] = compact(node[key]);
    }
  }
};

function traverseNode(node, opts, scope, state) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new TraversalContext(scope);
  for (var i = 0; i < keys.length; i++) {
    if (context.visit(node, keys[i], opts, scope, state)) {
      return;
    }
  }
}

function traverse(parent, opts, scope, state) {
  if (!parent) return;

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error("Must pass a scope unless traversing a Program/File got a " + parent.type + " node");
    }
  }

  if (!opts) opts = {};
  if (!opts.enter) opts.enter = function () { };
  if (!opts.exit) opts.exit = function () { };

  // array of nodes
  if (Array.isArray(parent)) {
    for (var i = 0; i < parent.length; i++) {
      traverseNode(parent[i], opts, scope, state);
    }
  } else {
    traverseNode(parent, opts, scope, state);
  }
}

function clearNode(node) {
  node._declarations = null;
  node.extendedRange = null;
  node._scopeInfo = null;
  node.tokens = null;
  node.range = null;
  node.start = null;
  node.end = null;
  node.loc = null;
  node.raw = null;

  if (Array.isArray(node.trailingComments)) {
    clearComments(node.trailingComments);
  }

  if (Array.isArray(node.leadingComments)) {
    clearComments(node.leadingComments);
  }
}

var clearVisitor = {
  noScope: true,
  enter: clearNode
};

function clearComments(comments) {
  for (var i = 0; i < comments.length; i++) {
    clearNode(comments[i]);
  }
}

traverse.removeProperties = function (tree) {
  clearNode(tree);
  traverse(tree, clearVisitor);

  return tree;
};

traverse.explode = function (obj) {
  for (var type in obj) {
    var fns = obj[type];

    var aliases = t.FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      for (var i = 0; i < aliases.length; i++) {
        obj[aliases[i]] = fns;
      }
    }
  }
  return obj;
};

function hasBlacklistedType(node, parent, scope, context, state) {
  if (node.type === state.type) {
    state.has = true;
    context.skip();
  }
}

traverse.hasType = function (tree, scope, type, blacklistTypes) {
  // the node we're searching in is blacklisted
  if (contains(blacklistTypes, tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  var state = {
    has:  false,
    type: type
  };

  traverse(tree, {
    blacklist: blacklistTypes,
    enter: hasBlacklistedType
  }, scope, state);

  return state.has;
};
