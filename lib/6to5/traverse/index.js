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

  var stopped = false;

  for (var i in keys) {
    var key = keys[i];
    var nodes = parent[key];
    if (!nodes) continue;

    var flatten = false;

    var handle = function (obj, key) {
      var node = obj[key];
      if (!node) return;

      // type is blacklisted
      if (opts.blacklist && opts.blacklist.indexOf(node.type) > -1) return;

      // replace node
      var maybeReplace = function (result) {
        if (result === false) return;
        if (result == null) return;

        var isArray = _.isArray(result);

        // inherit comments from original node to the first replacement node
        var inheritTo = result;
        if (isArray) inheritTo = result[0];
        if (inheritTo) t.inheritsComments(inheritTo, node);

        // replace the node
        node = obj[key] = result;

        if (isArray) flatten = true;

        // we're replacing a statement or block node with an array of statements so we better
        // ensure that it's a block
        if (isArray && _.contains(t.STATEMENT_OR_BLOCK_KEYS, key) && !t.isBlockStatement(obj)) {
          t.ensureBlock(obj, key);
        }
      };

      var skipped = false;
      var removed = false;

      var context = {
        stop: function () {
          skipped = stopped = true;
        },

        skip: function () {
          skipped = true;
        },

        remove: function () {
          this.skip();
          removed = true;
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
          obj[key] = null;
          flatten = true;
        }

        // stop iteration
        if (skipped) return;
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
        if (stopped) return;
      }

      if (flatten) {
        parent[key] = _.flatten(parent[key]);

        if (key === "body") {
          // we can safely compact this
          parent[key] = _.compact(parent[key]);
        }
      }
    } else {
      handle(parent, key);
      if (stopped) return;
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
