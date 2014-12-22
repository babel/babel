module.exports = traverse;

var Scope = require("./scope");
var t     = require("../types");
var _     = require("lodash");

function traverse(parent, callbacks, opts) {
  // falsy node
  if (!parent) return;

  // array of nodes
  if (_.isArray(parent)) {
    _.each(parent, function (node) {
      traverse(node, callbacks, opts);
    });
    return;
  }

  // unknown node type to traverse
  var keys = t.VISITOR_KEYS[parent.type];
  if (!keys) return;

  opts = opts || {};
  if (_.isArray(opts)) opts = { blacklist: opts };

  // blacklist these node types from being traversed
  var blacklistTypes = opts.blacklist || [];

  // normalise callbacks
  if (_.isFunction(callbacks)) callbacks = { enter: callbacks };

  for (var i in keys) {
    var key = keys[i];
    var nodes = parent[key];
    if (!nodes) continue;

    var updated = false;

    var handle = function (obj, key) {
      var node = obj[key];
      if (!node) return;

      // type is blacklisted
      if (blacklistTypes.indexOf(node.type) > -1) return;

      // replace node
      var maybeReplace = function (result) {
        if (result === false) return;

        if (result != null) {
          updated = true;
          node = obj[key] = result;

          if (_.isArray(result) && _.contains(t.STATEMENT_OR_BLOCK_KEYS, key) && !t.isBlockStatement(obj)) {
            t.ensureBlock(obj, key);
          }
        }
      };

      //
      var opts2 = { scope: opts.scope, blacklist: opts.blacklist };
      if (t.isScope(node)) opts2.scope = new Scope(node, opts.scope);

      // enter
      if (callbacks.enter) {
        var result = callbacks.enter(node, parent, opts2.scope);
        maybeReplace(result);

        // stop iteration
        if (result === false) return;
      }

      // traverse node
      traverse(node, callbacks, opts2);

      // exit
      if (callbacks.exit) {
        maybeReplace(callbacks.exit(node, parent, opts2.scope));
      }
    };

    if (_.isArray(nodes)) {
      for (i in nodes) {
        handle(nodes, i);
      }

      if (updated) parent[key] = _.flatten(parent[key]);
    } else {
      handle(parent, key);
    }
  }
}

traverse.removeProperties = function (tree) {
  var clear = function (node) {
    delete node._declarations;
    delete node.extendedRange;
    delete node._scopeInfo;
    delete node._scope;
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
  traverse(tree, clear);

  return tree;
};

traverse.hasType = function (tree, type, blacklistTypes) {
  blacklistTypes = [].concat(blacklistTypes || []);

  var has = false;

  // the node we're searching in is blacklisted
  if (_.contains(blacklistTypes, tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  traverse(tree, function (node) {
    if (node.type === type) {
      has = true;
      return false;
    }
  }, { blacklist: blacklistTypes });

  return has;
};
