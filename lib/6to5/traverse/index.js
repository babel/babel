var VISITOR_KEYS = require("./visitor-keys");
var _            = require("lodash");

var traverse = module.exports = function (parent, callback, blacklistTypes) {
  if (!parent) return;

  if (_.isArray(parent)) {
    _.each(parent, function (node) {
      traverse(node, callback, blacklistTypes);
    });
    return;
  }

  var keys = VISITOR_KEYS[parent.type] || [];
  blacklistTypes = blacklistTypes || [];

  _.each(keys, function (key) {
    var nodes = parent[key];
    if (!nodes) return;

    var handle = function (obj, key) {
      var node = obj[key];
      if (!node) return;
      if (blacklistTypes.indexOf(node.type) >= 0) return;

      // strict references in case the callback modified/replaced the node

      var result = callback(obj[key], parent, obj, key);
      if (result === false) return;

      traverse(obj[key], callback, blacklistTypes);
    };

    if (_.isArray(nodes)) {
      _.each(nodes, function (node, i) {
        handle(nodes, i);
      });

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

traverse.replace = function (node, callback, blacklistTypes) {
  traverse(node, function (node, parent, obj, key) {
    var result = callback(node, parent);
    if (result === false) return false;
    if (result != null) obj[key] = result;
  }, blacklistTypes);
};
