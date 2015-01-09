module.exports = traverse;

var Scope = require("./scope");
var t     = require("../types");
var _     = require("lodash");

function TraversalContext(previousContext) {
  this.didSkip = false;
  this.didRemove = false;
  this.didStop = false;
  this.didFlatten = previousContext ? previousContext.didFlatten : false;
}

TraversalContext.prototype.flatten = function () {
  this.didFlatten = true;
};

TraversalContext.prototype.remove = function () {
  this.didRemove = true;
  this.skip();
};

TraversalContext.prototype.skip = function () {
  this.didSkip = true;
};

TraversalContext.prototype.stop = function () {
  this.didStop = true;
  this.skip();
};

TraversalContext.prototype.maybeReplace = function (result, obj, key, node) {
  if (result === false) return node;
  if (result == null) return node;

  var isArray = _.isArray(result);

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

  return node;
};

TraversalContext.prototype.visit = function (obj, key, opts, scope, parent) {
  var node = obj[key];
  if (!node) return;

  // type is blacklisted
  if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1) return;

  var result;
  var ourScope = scope;
  if (t.isScope(node)) ourScope = new Scope(node, scope);

  // enter
  if (opts.enter) {
    result = opts.enter.call(this, node, parent, ourScope);
    node = this.maybeReplace(result, obj, key, node);

    if (this.didRemove) {
      obj[key] = null;
      this.flatten();
    }

    // stop traversal
    if (this.didSkip) return;
  }

  // traverse node
  traverse(node, opts, ourScope);

  // exit
  if (opts.exit) {
    result = opts.exit.call(this, node, parent, ourScope);
    node = this.maybeReplace(result, obj, key, node);
  }
};

function traverse(parent, opts, scope) {
  // falsy node
  if (!parent) return;

  // array of nodes
  if (_.isArray(parent)) {
    for (var i = 0; i < parent.length; i++)
      traverse(parent[i], opts, scope);
    return;
  }

  // unknown node type to traverse
  var keys = t.VISITOR_KEYS[parent.type];
  if (!keys) return;

  opts = opts || {};
  var context = null;

  for (var j = 0; j < keys.length; j++) {
    var key = keys[j];
    var nodes = parent[key];
    if (!nodes) continue;

    if (_.isArray(nodes)) {
      for (var k = 0; k < nodes.length; k++) {
        context = new TraversalContext(context);
        context.visit(nodes, k, opts, scope, parent);
        if (context.didStop) return;
      }

      if (context && context.didFlatten) {
        parent[key] = _.flatten(parent[key]);

        if (key === "body") {
          // we can safely compact this
          parent[key] = _.compact(parent[key]);
        }
      }
    } else {
      context = new TraversalContext(context);
      context.visit(parent, key, opts, scope, parent);
      if (context.didStop) return;
    }
  }
}

traverse.removeProperties = function (tree) {
  var clear = function (node) {
    delete node._declarations;
    delete node.extendedRange;
    delete node._scopeInfo;
    delete node.tokens;
    delete node.range;
    delete node.start;
    delete node.end;
    delete node.loc;
    delete node.raw;

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
