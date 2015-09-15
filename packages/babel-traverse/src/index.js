import TraversalContext from "./context";
import * as visitors from "./visitors";
import * as messages from "babel-messages";
import includes from "lodash/collection/includes";
import * as t from "babel-types";

export default function traverse(parent: Object, opts?: Object, scope?: Object, state: Object, parentPath: Object) {
  if (!parent) return;
  if (!opts) opts = {};

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(messages.get("traverseNeedsParent", parent.type));
    }
  }

  visitors.explode(opts);

  // array of nodes
  if (Array.isArray(parent)) {
    for (var i = 0; i < parent.length; i++) {
      traverse.node(parent[i], opts, scope, state, parentPath);
    }
  } else {
    traverse.node(parent, opts, scope, state, parentPath);
  }
}

traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

traverse.NodePath = require("./path");
traverse.Scope    = require("./scope");
traverse.Hub      = require("./hub");

traverse.cheap = function (node, enter) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  enter(node);

  for (var key of keys) {
    traverse.cheap(node[key], enter);
  }
};

traverse.node = function (node: Object, opts: Object, scope: Object, state: Object, parentPath: Object, skipKeys?) {
  var keys: Array = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new TraversalContext(scope, opts, state, parentPath);
  for (var key of keys) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

const CLEAR_KEYS: Array = t.COMMENT_KEYS.concat([
  "_scopeInfo", "_paths",
  "tokens", "comments",
  "start", "end", "loc",
  "raw", "rawValue"
]);

traverse.clearNode = function (node) {
  for (var key of CLEAR_KEYS) {
    if (node[key] != null) node[key] = undefined;
  }
};

traverse.removeProperties = function (tree) {
  traverse.cheap(tree, traverse.clearNode);
  return tree;
};

function hasBlacklistedType(path, state) {
  if (path.node.type === state.type) {
    state.has = true;
    path.skip();
  }
}

traverse.hasType = function (tree: Object, scope: Object, type: Object, blacklistTypes: Array<string>): boolean {
  // the node we're searching in is blacklisted
  if (includes(blacklistTypes, tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  var state = {
    has:  false,
    type: type
  };

  traverse(tree, {
    blacklist: blacklistTypes,
    enter: hasBlacklistedType
  }, scope, state);

  return state.has;
};
