var VISITOR_KEYS = require("./visitor-keys");
var _            = require("lodash");

var traverse = module.exports = function (parent, callbacks, blacklistTypes) {
  if (!parent) return;

  if (_.isArray(parent)) {
    _.each(parent, function (node) {
      traverse(node, callbacks, blacklistTypes);
    });
    return;
  }

  var keys = VISITOR_KEYS[parent.type] || [];
  blacklistTypes = blacklistTypes || [];

  if (_.isFunction(callbacks)) {
    callbacks = { enter: callbacks };
  }

  _.each(keys, function (key) {
    var nodes = parent[key];
    if (!nodes) return;

    var handle = function (obj, key) {
      var node = obj[key];
      if (!node) return;

      // type is blacklisted
      if (blacklistTypes.indexOf(node.type) >= 0) return;

      // enter
      var result = callbacks.enter(node, parent, obj, key);

      // stop iteration
      if (result === false) return;

      // replace node
      if (result != null) node = obj[key] = result;

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

traverse.Delete = {};

traverse.hasType = function (tree, type, blacklistTypes) {
  if (tree.type === type) return true;

  var has = false;
  blacklistTypes = blacklistTypes || [];

  if (_.isArray(tree)) {
    return !!_.find(tree, function (node) {
      return traverse.hasType(node, type, blacklistTypes);
    });
  } else {
    traverse(tree, function (node) {
      if (node.type === type) {
        has = true;
        return false;
      }
    }, blacklistTypes);
  }

  return has;
};
