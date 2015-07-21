import TraversalContext from "./context";
import * as visitors from "./visitors";
import * as messages from "../messages";
import includes from "lodash/collection/includes";
import * as t from "../types";

/**
 * [Please add a description.]
 */

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

/**
 * [Please add a description.]
 */

traverse.node = function (node: Object, opts: Object, scope: Object, state: Object, parentPath: Object, skipKeys?) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new TraversalContext(scope, opts, state, parentPath);
  for (var key of (keys: Array)) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

/**
 * [Please add a description.]
 */

const CLEAR_KEYS = [
  "trailingComments", "leadingComments", "innerComments", "extendedRange",
  "_scopeInfo", "_paths",
  "tokens", "range", "start", "end", "loc", "raw", "rawValue"
];

/**
 * [Please add a description.]
 */

traverse.clearNode = function (node: Object) {
  for (var i = 0; i < CLEAR_KEYS.length; i++) {
    let key = CLEAR_KEYS[i];
    if (node[key] != null) node[key] = undefined;
  }
};

/**
 * [Please add a description.]
 */

var clearVisitor = {
  noScope: true,
  exit: traverse.clearNode
};

/**
 * [Please add a description.]
 */

traverse.removeProperties = function (tree: Object): Object {
  traverse(tree, clearVisitor);
  traverse.clearNode(tree);

  return tree;
};

/**
 * [Please add a description.]
 */

function hasBlacklistedType(node: Object, parent: Object, scope: Object, state: Object) {
  if (node.type === state.type) {
    state.has = true;
    this.skip();
  }
}

/**
 * [Please add a description.]
 */

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
