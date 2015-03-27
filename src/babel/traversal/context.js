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

  visitMultiple(nodes, node, key) {
    // nothing to traverse!
    if (nodes.length === 0) return false;

    var visited = [];

    var queue = this.queue = [];
    var stop  = false;

    // build up initial queue
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i]) queue.push(this.create(node, nodes, i));
    }

    // visit the queue
    for (let i = 0; i < queue.length; i++) {
      var path = queue[i];
      if (visited.indexOf(path.node) >= 0) continue;

      visited.push(path.node);

      if (path.visit()) {
        stop = true;
        break;
      }
    }

    // clear context from queued paths
    for (let i = 0; i < queue.length; i++) {
      //queue[i].clearContext();
    }

    return stop;
  }

  visitSingle(node, key) {
    return this.create(node, node, key).visit();
  }

  visit(node, key) {
    var nodes = node[key];
    if (!nodes) return;

    if (Array.isArray(nodes)) {
      return this.visitMultiple(nodes, node, key);
    } else {
      return this.visitSingle(node, key);
    }
  }
}
