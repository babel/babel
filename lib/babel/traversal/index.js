"use strict";

module.exports = traverse;

var TraversalContext = require("./context");
var includes         = require("lodash/collection/includes");
var t                = require("../types");

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
      traverse.node(parent[i], opts, scope, state);
    }
  } else {
    traverse.node(parent, opts, scope, state);
  }
}

traverse.node = function (node, opts, scope, state, parentPath) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new TraversalContext(scope, opts, state, parentPath);
  for (var i = 0; i < keys.length; i++) {
    if (context.visit(node, keys[i])) {
      return;
    }
  }
};

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

function hasBlacklistedType(node, parent, scope, state) {
  if (node.type === state.type) {
    state.has = true;
    this.skip();
  }
}

traverse.hasType = function (tree, scope, type, blacklistTypes) {
  // the node we're searching in is blacklisted
  if (includes(blacklistTypes, tree.type)) return false;

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
