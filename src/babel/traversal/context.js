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

  shouldVisit(node) {
    var keys = t.VISITOR_KEYS[node.type];
    return !!(this.opts.enter || this.opts.exit || this.opts[node.type] || (keys && keys.length));
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
      var self = nodes[i];
      if (self && this.shouldVisit(self)) {
        queue.push(this.create(node, nodes, i));
      }
    }

    // visit the queue
    for (let i = 0; i < queue.length; i++) {
      var path = queue[i];
      if (visited.indexOf(path.node) >= 0) continue;
      visited.push(path.node);

      path.setContext(this.parentPath, this, path.key);

      if (path.visit()) {
        stop = true;
        break;
      }
    }

    return stop;
  }

  visitSingle(node, key) {
    if (this.shouldVisit(node[key])) {
      return this.create(node, node, key).visit();
    }
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
