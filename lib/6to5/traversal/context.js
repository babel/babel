"use strict";

/* jshint maxparams:7 */

module.exports = TraversalContext;

var TraversalPath = require("./path");
var flatten       = require("lodash/array/flatten");
var compact       = require("lodash/array/compact");

function TraversalContext(scope, opts, state) {
  this.shouldFlatten = false;

  this.scope = scope;
  this.state = state;
  this.opts  = opts;

  this.reset();
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

TraversalContext.prototype.visitNode = function (node, obj, key) {
  this.reset();
  var iteration = new TraversalPath(this, node, obj, key);
  return iteration.visit();
};

TraversalContext.prototype.visit = function (node, key) {
  var nodes = node[key];
  if (!nodes) return;

  if (!Array.isArray(nodes)) {
    return this.visitNode(node, node, key);
  }

  // nothing to traverse!
  if (nodes.length === 0) {
    return;
  }

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && this.visitNode(node, nodes, i)) {
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
