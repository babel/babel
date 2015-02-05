"use strict";

module.exports = TraversalIteration;

/* jshint maxparams:7 */

var traverse = require("./index");
var contains = require("lodash/collection/contains");
var Scope    = require("./scope");
var t        = require("../types");

function TraversalIteration(context, parent, obj, key) {
  this.key     = key;
  this.obj     = obj;
  this.context = context;
  this.parent  = parent;
  this.scope   = TraversalIteration.getScope(this.getNode(), parent, context.scope);
  this.state   = context.state;
}

TraversalIteration.getScope = function (node, parent, scope) {
  var ourScope = scope;

  // we're entering a new scope so let's construct it!
  if (t.isScope(node)) {
    ourScope = new Scope(node, parent, scope);
  }

  return ourScope;
};

TraversalIteration.prototype.maybeRemove = function () {
  if (this.context.shouldRemove) {
    this.setNode(null);
    this.context.flatten();
  }
};

TraversalIteration.prototype.setNode = function (val) {
  return this.obj[this.key] = val;
};

TraversalIteration.prototype.getNode = function () {
  return this.obj[this.key];
};

TraversalIteration.prototype.replaceNode = function (replacement, scope) {
  var isArray = Array.isArray(replacement);

  // inherit comments from original node to the first replacement node
  var inheritTo = replacement;
  if (isArray) inheritTo = replacement[0];
  if (inheritTo) t.inheritsComments(inheritTo, this.getNode());

  // replace the node
  this.setNode(replacement);

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
  if (isArray) {
    if (contains(t.STATEMENT_OR_BLOCK_KEYS, this.key) && !t.isBlockStatement(this.obj)) {
      t.ensureBlock(this.obj, this.key);
    }

    this.context.flatten();
  }
};

TraversalIteration.prototype.call = function (fn) {
  var node = this.getNode();
  var replacement = fn.call(this, node, this.parent, this.scope, this.context, this.state);

  if (replacement) {
    this.replaceNode(replacement);
    node = replacement;
  }

  this.maybeRemove();

  return node;
};

TraversalIteration.prototype.visit = function () {
  this.context.reset();

  var state = this.context.state;
  var opts  = this.context.opts;
  var node  = this.getNode();

  // type is blacklisted
  if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1) {
    return;
  }

  this.call(opts.enter);

  if (this.context.shouldSkip) {
    return this.context.shouldStop;
  }

  node = this.getNode();

  if (Array.isArray(node)) {
    // traverse over these replacement nodes we purposely don't call exitNode
    // as the original node has been destroyed
    for (var i = 0; i < node.length; i++) {
      traverse.node(node[i], opts, this.scope, state);
    }
  } else {
    traverse.node(node, opts, this.scope, state);
    this.call(opts.exit);
  }

  return this.context.shouldStop;
};
