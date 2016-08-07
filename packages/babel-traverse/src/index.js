/* eslint max-len: 0 */

import TraversalContext from "./context";
import * as visitors from "./visitors";
import * as messages from "babel-messages";
import includes from "lodash.includes";
import * as t from "babel-types";
import * as cache from "./cache";

export { default as NodePath } from "./path";
export { default as Scope } from "./scope";
export { default as Hub } from "./hub";
export { visitors };

export default function traverse(
  parent: Object | Array<Object>,
  opts?: Object,
  scope?: Object,
  state: Object,
  parentPath: Object,
) {
  if (!parent) return;
  if (!opts) opts = {};

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(messages.get("traverseNeedsParent", parent.type));
    }
  }

  visitors.explode(opts);

  traverse.node(parent, opts, scope, state, parentPath);
}

traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

traverse.NodePath = require("./path");
traverse.Scope    = require("./scope");
traverse.Hub      = require("./hub");

traverse.cheap = function (node, enter) {
  if (!node) return;

  let keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  enter(node);

  for (let key of keys) {
    let subNode = node[key];

    if (Array.isArray(subNode)) {
      for (let node of subNode) {
        traverse.cheap(node, enter);
      }
    } else {
      traverse.cheap(subNode, enter);
    }
  }
};

traverse.node = function (node: Object, opts: Object, scope: Object, state: Object, parentPath: Object, skipKeys?) {
  let keys: Array = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  let context = new TraversalContext(scope, opts, state, parentPath);
  for (let key of keys) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

const CLEAR_KEYS: Array = t.COMMENT_KEYS.concat([
  "tokens", "comments",
  "start", "end", "loc",
  "raw", "rawValue"
]);

traverse.clearNode = function (node) {
  for (let key of CLEAR_KEYS) {
    if (node[key] != null) node[key] = undefined;
  }

  for (let key in node) {
    if (key[0] === "_" && node[key] != null) node[key] = undefined;
  }

  cache.path.delete(node);

  let syms: Array<Symbol> = Object.getOwnPropertySymbols(node);
  for (let sym of syms) {
    node[sym] = null;
  }
};

traverse.removeProperties = function (tree) {
  traverse.cheap(tree, traverse.clearNode);
  return tree;
};

function hasBlacklistedType(path, state) {
  if (path.node.type === state.type) {
    state.has = true;
    path.stop();
  }
}

traverse.hasType = function (tree: Object, scope: Object, type: Object, blacklistTypes: Array<string>): boolean {
  // the node we're searching in is blacklisted
  if (includes(blacklistTypes, tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  let state = {
    has:  false,
    type: type
  };

  traverse(tree, {
    blacklist: blacklistTypes,
    enter: hasBlacklistedType
  }, scope, state);

  return state.has;
};

traverse.clearCache = function() {
  cache.clear();
};

traverse.copyCache = function(source, destination) {
  if (cache.path.has(source)) {
    cache.path.set(destination, cache.path.get(source));
  }
};
