import NodePath from "./path";
import * as t from "../types";

export default class TraversalContext {
  constructor(scope, opts, state, parentPath) {
    this.parentPath = parentPath;
    this.scope      = scope;
    this.state      = state;
    this.opts       = opts;
  }

  shouldVisit(node) {
    var opts = this.opts;
    if (opts.enter || opts.exit) return true;

    if (opts[node.type]) return true;

    var keys = t.VISITOR_KEYS[node.type];
    if (!keys || !keys.length) return false;

    for (var key of (keys: Array)) {
      if (node[key]) return true;
    }

    return false;
  }

  create(node, obj, key, containerKey) {
    var path = NodePath.get({
      parentPath: this.parentPath,
      parent: node,
      container: obj,
      key: key,
      containerKey: containerKey
    });
    path.unshiftContext(this);
    return path;
  }

  visitMultiple(container, parent, containerKey) {
    // nothing to traverse!
    if (container.length === 0) return false;

    var visited = [];

    var queue = this.queue = [];
    var stop  = false;

    // build up initial queue
    for (let key = 0; key < container.length; key++) {
      var self = container[key];
      if (self && this.shouldVisit(self)) {
        queue.push(this.create(parent, container, key, containerKey));
      }
    }

    // visit the queue
    for (let path of (queue: Array)) {
      path.resync();

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
