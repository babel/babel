import TraversalContext from "./context";
import * as visitors from "./visitors";
import * as messages from "../messages";
import includes from "lodash/collection/includes";
import * as t from "../types";

export default function traverse(parent, opts, scope, state, parentPath) {
  if (!parent) return;

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(messages.get("traverseNeedsParent", parent.type));
    }
  }

  if (!opts) opts = {};

  visitors.verify(opts);
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

traverse.node = function (node, opts, scope, state, parentPath, skipKeys?) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new TraversalContext(scope, opts, state, parentPath);
  for (var key of (keys: Array)) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

const CLEAR_KEYS = [
  "trailingComments", "leadingComments", "extendedRange",
  "_scopeInfo", "_paths",
  "tokens", "range", "start", "end", "loc", "raw"
];

traverse.clearNode = function (node) {
  for (var i = 0; i < CLEAR_KEYS.length; i++) {
    let key = CLEAR_KEYS[i];
    if (node[key] != null) node[key] = null;
  }
};

var clearVisitor = {
  noScope: true,
  exit: traverse.clearNode
};

traverse.removeProperties = function (tree) {
  traverse(tree, clearVisitor);
  traverse.clearNode(tree);

  return tree;
};

function hasBlacklistedType(node, parent, scope, state) {
  if (node.type === state.type) {
    state.has = true;
    this.skip();
  }
}

traverse.hasType = function (tree, scope, type, blacklistTypes) {
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
