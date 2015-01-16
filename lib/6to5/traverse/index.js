module.exports = traverse;

var Scope = require("./scope");
var t     = require("../types");
var _     = require("lodash");

function TraversalContext() {
  this.didSkip = false;
  this.didRemove = false;
  this.didStop = false;
  this.didFlatten = false;
}

TraversalContext.prototype.flatten = function () {
  this.didFlatten = true;
};

TraversalContext.prototype.remove = function () {
  this.didRemove = true;
  this.didSkip = true;
};

TraversalContext.prototype.skip = function () {
  this.didSkip = true;
};

TraversalContext.prototype.stop = function () {
  this.didStop = true;
  this.didSkip = true;
};

TraversalContext.prototype.reset = function () {
  this.didSkip = false;
  this.didStop = false;
  this.didRemove = false;
};

TraversalContext.prototype.maybeReplace = function (result, obj, key, node) {
  var isArray = Array.isArray(result);

  // inherit comments from original node to the first replacement node
  var inheritTo = result;
  if (isArray) inheritTo = result[0];
  if (inheritTo) t.inheritsComments(inheritTo, node);

  // replace the node
  node = obj[key] = result;

  // we're replacing a statement or block node with an array of statements so we better
  // ensure that it's a block
  if (isArray && _.contains(t.STATEMENT_OR_BLOCK_KEYS, key) && !t.isBlockStatement(obj)) {
    t.ensureBlock(obj, key);
  }

  if (isArray) {
    this.flatten();
  }
};

TraversalContext.prototype.visitNode = function (obj, key, opts, scope, parent) {
  this.reset();

  var node = obj[key];

  // type is blacklisted
  if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1)
    return;

  var ourScope = scope;
  if (t.isScope(node))
    ourScope = new Scope(node, scope);

  var result;

  // enter
  if (opts.enter) {
    result = opts.enter.call(this, node, parent, ourScope);

    if (result) {
      this.maybeReplace(result, obj, key, node);
      node = obj[key];
    }

    if (this.didRemove) {
      node = obj[key] = null;
      this.flatten();
    }

    // stop traversal
    if (this.didSkip)
      return this.didStop;
  }

  // traverse node
  traverseNode(node, opts, ourScope);

  // exit
  if (opts.exit) {
    result = opts.exit.call(this, node, parent, ourScope);

    if (result) {
      this.maybeReplace(result, obj, key, node);
    }
  }

  return this.didStop;
};

TraversalContext.prototype.visit = function (node, key, opts, scope) {
  var nodes = node[key];
  if (!nodes) return;

  if (!Array.isArray(nodes)) {
    return this.visitNode(node, key, opts, scope, node);
  }

  if (nodes.length === 0) {
    return;
  }

  for (var k = 0; k < nodes.length; k++) {
    if (nodes[k] && this.visitNode(nodes, k, opts, scope, node))
      return true;
  }

  if (this.didFlatten) {
    node[key] = _.flatten(node[key]);

    if (key === "body") {
      // we can safely compact this
      node[key] = _.compact(node[key]);
    }
  }
};

function traverseNode(node, opts, scope) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  opts = opts || {};
  var context = new TraversalContext();

  for (var j = 0; j < keys.length; j++) {
    if (context.visit(node, keys[j], opts, scope))
      return;
  }
}

function traverse(parent, opts, scope) {
  // falsy node
  if (!parent) return;

  // array of nodes
  if (!Array.isArray(parent)) {
    traverseNode(parent, opts, scope);
    return;
  }

  for (var i = 0; i < parent.length; i++) {
    traverseNode(parent[i], opts, scope);
  }
}

traverse.removeProperties = function (tree) {
  var clear = function (node) {
    node._declarations = null;
    node.extendedRange = null;
    node._scopeInfo = null;
    node.tokens = null;
    node.range = null;
    node.start = null;
    node.end = null;
    node.loc = null;
    node.raw = null;

    clearComments(node.trailingComments);
    clearComments(node.leadingComments);
  };

  var clearComments = function (comments) {
    _.each(comments, clear);
  };

  clear(tree);
  traverse(tree, { enter: clear });

  return tree;
};

traverse.hasType = function (tree, type, blacklistTypes) {
  blacklistTypes = [].concat(blacklistTypes || []);

  var has = false;

  // the node we're searching in is blacklisted
  if (_.contains(blacklistTypes, tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  traverse(tree, {
    blacklist: blacklistTypes,
    enter: function (node) {
      if (node.type === type) {
        has = true;
        this.skip();
      }
    }
  });

  return has;
};
