var VISITOR_KEYS = require("./visitor-keys");
var _            = require("lodash");

var traverse = module.exports = function (parent, callback) {
  if (_.isArray(parent)) {
    _.each(parent, function (node) {
      traverse(node, callback);
    });
    return;
  }

  var keys = VISITOR_KEYS[parent.type] || [];

  _.each(keys, function (key) {
    var nodes = parent[key];
    if (!nodes) return;

    var handle = function (obj, key) {
      if (!obj[key]) return;

      // strict references in case the callback modified/replaced the node

      var result = callback(obj[key], parent, obj, key);
      if (result === false) return;

      traverse(obj[key], callback);
    };

    if (_.isArray(nodes)) {
      _.each(nodes, function (node, i) {
        handle(nodes, i);
      });
      parent[key] = _.flatten(nodes).filter(function (node) {
        return node !== traverse.Delete;
      });
    } else {
      handle(parent, key);
    }
  });
};

traverse.Delete = {};

traverse.hasType = function (tree, type) {
  var has = false;

  if (_.isArray(tree)) {
    return !!_.find(tree, function (node) {
      return traverse.hasType(node, type);
    });
  } else {
    traverse(tree, function (node) {
      if (node.type === type) {
        has = true;
        return false;
      }
    });
  }

  return has;
};

traverse.replace = function (node, callback) {
  traverse(node, function (node, parent, obj, key) {
    var result = callback(node, parent);
    if (result != null) obj[key] = result;
  });
};
