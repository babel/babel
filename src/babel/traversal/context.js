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
    var path = TraversalPath.get(this.parentPath, node, obj, key);
    path.unshiftContext(this);
    return path;
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
    for (let path of (queue: Array)) {
      path.update();

      if (visited.indexOf(path.node) >= 0) continue;
      visited.push(path.node);

      if (path.visit()) {
        stop = true;
        break;
      }
    }

    for (let path of (queue: Array)) {
      path.shiftContext();
    }

    this.queue = null;

    return stop;
  }

  visitSingle(node, key) {
    if (this.shouldVisit(node[key])) {
      var path = this.create(node, node, key);
      path.visit();
      path.shiftContext();
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
