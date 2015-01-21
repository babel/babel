"use strict";

module.exports = traverse;

/* jshint maxparams:7 */

var Scope = require("./scope");
var t     = require("../types");
var _     = require("lodash");

function TraversalContext() {
  this.shouldFlatten = false;
  this.shouldRemove  = false;
  this.shouldSkip    = false;
  this.shouldStop    = false;
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

function replaceNode(obj, key, node, result) {
  var isArray = Array.isArray(result);

  // inherit comments from original node to the first replacement node
  var inheritTo = result;
  if (isArray) inheritTo = result[0];
  if (inheritTo) t.inheritsComments(inheritTo, node);

  // replace the node
  obj[key] = result;

  // we're replacing a statement or block node with an array of statements so we better
  // ensure that it's a block
  if (isArray && _.contains(t.STATEMENT_OR_BLOCK_KEYS, key) && !t.isBlockStatement(obj)) {
    t.ensureBlock(obj, key);
  }

  if (isArray) {
    return true;
  }
}

TraversalContext.prototype.enterNode = function (obj, key, node, enter, parent, scope, state) {
  var result = enter(node, parent, scope, this, state);
  var flatten = false;

  if (result) {
    flatten = replaceNode(obj, key, node, result);
    node = result;

    if (flatten) {
      this.shouldFlatten = true;
    }
  }

  if (this.shouldRemove) {
    obj[key] = null;
    this.shouldFlatten = true;
  }

  return node;
};

TraversalContext.prototype.exitNode = function (obj, key, node, exit, parent, scope, state) {
  var result = exit(node, parent, scope, this, state);
  var flatten = false;

  if (result) {
    flatten = replaceNode(obj, key, node, result);
    node = result;

    if (flatten) {
      this.shouldFlatten = true;
    }
  }

  return node;
};

TraversalContext.prototype.visitNode = function (obj, key, opts, scope, parent, state) {
  this.reset();

  var node = obj[key];

  // type is blacklisted
  if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1) return;

  var ourScope = scope;
  if (t.isScope(node)) {
    ourScope = new Scope(node, scope);
  }

  node = this.enterNode(obj, key, node, opts.enter, parent, ourScope, state);

  if (this.shouldSkip) return this.shouldStop;

  traverseNode(node, opts, ourScope, state);
  this.exitNode(obj, key, node, opts.exit, parent, ourScope, state);

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

  for (var k = 0; k < nodes.length; k++) {
    if (nodes[k] && this.visitNode(nodes, k, opts, scope, node, state))
      return true;
  }

  if (this.shouldFlatten) {
    node[key] = _.flatten(node[key]);

    if (key === "body") {
      // we can safely compact this
      node[key] = _.compact(node[key]);
    }
  }
};

function traverseNode(node, opts, scope, state) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new TraversalContext();
  for (var j = 0; j < keys.length; j++) {
    if (context.visit(node, keys[j], opts, scope, state)) {
      return;
    }
  }
}

function traverse(parent, opts, scope, state) {
  // falsy node
  if (!parent) return;

  if (!scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error("Must pass a scope unless traversing a Program/File got a " + parent.type + " node");
    }
  }

  if (!opts) opts = {};
  if (!opts.enter) opts.enter = _.noop;
  if (!opts.exit) opts.exit = _.noop;

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

  if (Array.isArray(node.trailingComments))
    clearComments(node.trailingComments);

  if (Array.isArray(node.leadingComments))
    clearComments(node.leadingComments);
}

var clearVisitor = { enter: clearNode };

function clearComments(comments) {
  for (var i = 0; i < comments.length; i++)
    clearNode(comments[i]);
}

traverse.removeProperties = function (tree) {
  clearNode(tree);
  traverse(tree, clearVisitor);

  return tree;
};

function hasBlacklistedType(node, parent, scope, context, state) {
  if (node.type === state.type) {
    state.has = true;
    context.skip();
  }
}

traverse.hasType = function (tree, scope, type, blacklistTypes) {
  // the node we're searching in is blacklisted
  if (_.contains(blacklistTypes, tree.type)) return false;

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
