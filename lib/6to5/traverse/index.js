var VISITOR_KEYS = require("./visitor-keys");
var _            = require("lodash");

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
  var keys = VISITOR_KEYS[parent.type];
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

      // enter
      var result = callbacks.enter(node, parent, obj, key);

      // stop iteration
      if (result === false) return;

      // replace node
      if (result != null) node = obj[key] = result;

      // traverse node
      traverse(node, callbacks, blacklistTypes);

      // exit
      if (callbacks.exit) callbacks.exit(node, parent, obj, key);
    };

    if (_.isArray(nodes)) {
      _.each(nodes, function (node, i) {
        handle(nodes, i);
      });

      // remove deleted nodes
      parent[key] = _.flatten(parent[key]).filter(function (node) {
        return node !== traverse.Delete;
      });
    } else {
      handle(parent, key);

      if (parent[key] === traverse.Delete) {
        throw new Error("trying to delete property " + key + " from " +
                        parent.type + " but can't because it's required");
      }
    }
  });
};

traverse.FUNCTION_TYPES = ["ArrowFunctionExpression", "FunctionDeclaration", "FunctionExpression"];

traverse.aliases = {
  ArrowFunctionExpression: ["Function"],
  FunctionDeclaration:     ["Function"],
  FunctionExpression:      ["Function"]
};

traverse.isFunction = function (node) {
  return _.contains(traverse.FUNCTION_TYPES, node.type);
};

traverse.Delete = {};

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
