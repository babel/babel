"use strict";

module.exports = TraversalPath;

var traverse = require("./index");
var includes = require("lodash/collection/includes");
var Scope    = require("./scope");
var t        = require("../types");

function TraversalPath(context, parent, container, key) {
  this.shouldRemove = false;
  this.shouldSkip   = false;
  this.shouldStop   = false;

  this.parentPath = context.parentPath;
  this.context    = context;
  this.state      = this.context.state;
  this.opts       = this.context.opts;

  this.container = container;
  this.key       = key;

  this.parent = parent;
  this.state  = context.state;

  this.setScope();
}

TraversalPath.getScope = function (node, parent, scope) {
  var ourScope = scope;

  // we're entering a new scope so let's construct it!
  if (t.isScope(node, parent)) {
    ourScope = new Scope(node, parent, scope);
  }

  return ourScope;
};

TraversalPath.prototype.setScope = function () {
  this.scope = TraversalPath.getScope(this.node, this.parent, this.context.scope);
};

TraversalPath.prototype.remove = function () {
  this.shouldRemove = true;
  this.shouldSkip   = true;
};

TraversalPath.prototype.skip = function () {
  this.shouldSkip = true;
};

TraversalPath.prototype.stop = function () {
  this.shouldStop = true;
  this.shouldSkip = true;
};

TraversalPath.prototype.flatten = function () {
  this.context.flatten();
};

Object.defineProperty(TraversalPath.prototype, "node", {
  get: function () {
    return this.container[this.key];
  },

  set: function (replacement) {
    var isArray = Array.isArray(replacement);

    // inherit comments from original node to the first replacement node
    var inheritTo = replacement;
    if (isArray) inheritTo = replacement[0];
    if (inheritTo) t.inheritsComments(inheritTo, this.node);

    // replace the node
    this.container[this.key] = replacement;
    this.setScope();

    var file = this.scope && this.scope.file;
    if (file) {
      if (isArray) {
        for (var i = 0; i < replacement.length; i++) {
          file.checkNode(replacement[i], this.scope);
        }
      } else {
        file.checkNode(replacement, this.scope);
      }
    }

    // we're replacing a statement or block node with an array of statements so we better
    // ensure that it's a block
    if (isArray) {
      if (includes(t.STATEMENT_OR_BLOCK_KEYS, this.key) && !t.isBlockStatement(this.container)) {
        t.ensureBlock(this.container, this.key);
      }

      this.flatten();
    }
  }
});

TraversalPath.prototype.call = function (key) {
  var node = this.node;
  if (!node) return;

  var opts = this.opts;
  var fn   = opts[key] || opts;
  if (opts[node.type]) fn = opts[node.type][key] || fn;

  var replacement = fn.call(this, node, this.parent, this.scope, this.state);

  if (replacement) {
    this.node = replacement;
  }

  if (this.shouldRemove) {
    this.container[this.key] = null;
    this.flatten();
  }
};

TraversalPath.prototype.visit = function () {
  var opts = this.opts;
  var node = this.node;

  // type is blacklisted
  if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1) {
    return;
  }

  this.call("enter");

  if (this.shouldSkip) {
    return this.shouldStop;
  }

  node = this.node;

  if (Array.isArray(node)) {
    // traverse over these replacement nodes we purposely don't call exitNode
    // as the original node has been destroyed
    for (var i = 0; i < node.length; i++) {
      traverse.node(node[i], opts, this.scope, this.state, this);
    }
  } else {
    traverse.node(node, opts, this.scope, this.state, this);
    this.call("exit");
  }

  return this.shouldStop;
};

TraversalPath.prototype.isReferencedIdentifier = function () {
  return t.isReferencedIdentifier(this.node);
};
