import TraversalPath from "./path";
import compact from "lodash/array/compact";
import * as t from "../types";

export default class TraversalContext {
  constructor(scope, opts, state, parentPath) {
    this.parentPath = parentPath;
    this.scope      = scope;
    this.state      = state;
    this.opts       = opts;
  }

  create(node, obj, key) {
    return TraversalPath.get(this.parentPath, this, node, obj, key);
  }

  visit(node, key) {
    var nodes = node[key];
    if (!nodes) return;

    if (!Array.isArray(nodes)) {
      return this.create(node, node, key).visit();
    }

    // nothing to traverse!
    if (nodes.length === 0) {
      return;
    }

    var queue = [];

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i]) queue.push(this.create(node, nodes, i));
    }

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].visit()) {
        return true;
      }
    }
  }
}
