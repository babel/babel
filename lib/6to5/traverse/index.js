var _ = require("lodash");

var traverse = module.exports = function (parent, callbacks, blacklistTypes) {
  // falsy node
  if (!parent) return;

  // array of nodes
  if (_.isArray(parent)) {
    _.each(parent, function (node) {
      traverse(node, callbacks, blacklistTypes);
    });
    return;
  }

  // unknown node type to traverse
  var keys = traverse.VISITOR_KEYS[parent.type];
  if (!keys) return;

  // blacklist these node types from being traversed
  blacklistTypes = blacklistTypes || [];

  // normalise callbacks
  if (_.isFunction(callbacks)) callbacks = { enter: callbacks };

  _.each(keys, function (key) {
    var nodes = parent[key];
    if (!nodes) return;

    var handle = function (obj, key) {
      var node = obj[key];
      if (!node) return;

      // type is blacklisted
      if (_.contains(blacklistTypes, node.type)) return;

      var result;

      // replace node
      var maybeReplace = function (result) {
        if (result != null) obj[key] = result;
      };

      // enter
      if (callbacks.enter) {
        result = callbacks.enter(node, parent, obj, key);

        // stop iteration
        if (result === false) return;

        maybeReplace(result);
      }

      // traverse node
      traverse(node, callbacks, blacklistTypes);

      // exit
      if (callbacks.exit) {
        maybeReplace(callbacks.exit(node, parent, obj, key));
      }
    };

    if (_.isArray(nodes)) {
      _.each(nodes, function (node, i) {
        handle(nodes, i);
      });

      parent[key] = _.flatten(parent[key]);
    } else {
      handle(parent, key);
    }
  });
};

traverse.VISITOR_KEYS = require("./visitor-keys");

traverse.removeProperties = function (tree) {
  var clear = function (node) {
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
    _.each(comments, function (comment) {
      delete comment.extendedRange;
      clear(comment);
    });
  };

  clear(tree);
  traverse(tree, clear);

  return tree;
};

traverse.hasType = function (tree, type, blacklistTypes) {
  blacklistTypes = [].concat(blacklistTypes || []);

  var has = false;

  if (_.isArray(tree)) {
    // array of nodes, find the first
    return !!_.find(tree, function (node) {
      return traverse.hasType(node, type, blacklistTypes);
    });
  } else {
    // the node we're searching in is blacklisted
    if (_.contains(blacklistTypes, tree.type)) return false;

    // the type we're looking for is the same as the passed node
    if (tree.type === type) return true;

    traverse(tree, function (node) {
      if (node.type === type) {
        has = true;
        return false;
      }
    }, blacklistTypes);
  }

  return has;
};
