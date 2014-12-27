module.exports = traverse;

var Scope = require("./scope");
var t     = require("../types");
var _     = require("lodash");

function traverse(parent, opts, scope) {
  // falsy node
  if (!parent) return;

  // array of nodes
  if (_.isArray(parent)) {
    _.each(parent, function (node) {
      traverse(node, opts, scope);
    });
    return;
  }

  // unknown node type to traverse
  var keys = t.VISITOR_KEYS[parent.type];
  if (!keys) return;

  opts = opts || {};

  for (var i in keys) {
    var key = keys[i];
    var nodes = parent[key];
    if (!nodes) continue;

    var updated = false;

    var handle = function (obj, key) {
      var node = obj[key];
      if (!node) return;

      // type is blacklisted
      if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1) return;

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

      var stopped = false;
      var removed = false;

      var context = {
        stop: function () {
          stopped = true;
        },

        remove: function () {
          stopped = removed = true;
        }
      };

      //
      var ourScope = scope;
      if (t.isScope(node)) ourScope = new Scope(node, scope);

      // enter
      if (opts.enter) {
        var result = opts.enter.call(context, node, parent, ourScope);
        maybeReplace(result);

        if (removed) {
          delete obj[key];
          updated = true;
        }

        // stop iteration
        if (stopped || result === false) return;
      }

      // traverse node
      traverse(node, opts, ourScope);

      // exit
      if (opts.exit) {
        maybeReplace(opts.exit.call(context, node, parent, ourScope));
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
        return false;
      }
    }
  });

  return has;
};
