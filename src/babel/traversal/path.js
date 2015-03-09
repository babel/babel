import traverse from "./index";
import includes from "lodash/collection/includes";
import Scope from "./scope";
import t from "../types";

export default class TraversalPath {
  constructor(parent, container) {
    this.container = container;
    this.parent    = parent;
    this.data      = {};
  }

  static get(parentPath, context, parent, container, key) {
    var targetNode = container[key];
    var paths = container._paths ||= [];
    var path;

    for (var i = 0; i < paths.length; i++) {
      var pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (!path) {
      path = new TraversalPath(parent, container);
      paths.push(path);
    }

    path.setContext(parentPath, context, key);

    return path;
  }

  static getScope(node, parent, scope) {
    var ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (t.isScope(node, parent)) {
      ourScope = new Scope(node, parent, scope);
    }

    return ourScope;
  }

  setData(key, val) {
    return this.data[key] = val;
  }

  getData(key) {
    return this.data[key];
  }

  setScope() {
    this.scope = TraversalPath.getScope(this.node, this.parent, this.context.scope);
  }

  refreshScope() {
    // todo: remove all binding identifiers associated with this node
    // todo: if it hasn't been deleted and just replaced with node/s then add their bindings
  }

  setContext(parentPath, context, key) {
    this.shouldRemove = false;
    this.shouldSkip   = false;
    this.shouldStop   = false;

    this.parentPath = parentPath || this.parentPath;
    this.context    = context;
    this.state      = context.state;
    this.opts       = context.opts;
    this.key        = key;

    this.setScope();
  }

  remove() {
    this.shouldRemove = true;
    this.shouldSkip   = true;
  }

  skip() {
    this.shouldSkip = true;
  }

  stop() {
    this.shouldStop = true;
    this.shouldSkip = true;
  }

  flatten() {
    this.context.flatten();
  }

  get node() {
    return this.container[this.key];
  }

  set node(replacement) {
    var isArray = Array.isArray(replacement);

    // inherit comments from original node to the first replacement node
    var inheritTo = replacement;
    if (isArray) inheritTo = replacement[0];
    if (inheritTo) t.inheritsComments(inheritTo, this.node);

    // replace the node
    this.container[this.key] = replacement;
    this.setScope();

    var file = this.scope && this.scope.file;
    if (file) {
      if (isArray) {
        for (var i = 0; i < replacement.length; i++) {
          file.checkNode(replacement[i], this.scope);
        }
      } else {
        file.checkNode(replacement, this.scope);
      }
    }

    // we're replacing a statement or block node with an array of statements so we better
    // ensure that it's a block
    if (isArray) {
      if (includes(t.STATEMENT_OR_BLOCK_KEYS, this.key) && !t.isBlockStatement(this.container)) {
        t.ensureBlock(this.container, this.key);
      }

      this.flatten();
      // TODO: duplicate internal metadata
    }
  }

  call(key) {
    var node = this.node;
    if (!node) return;

    var opts = this.opts;
    var fn   = opts[key] || opts;
    if (opts[node.type]) fn = opts[node.type][key] || fn;

    var replacement = fn.call(this, node, this.parent, this.scope, this.state);

    if (replacement) {
      this.node = replacement;
    }

    if (this.shouldRemove) {
      this.container[this.key] = null;
      this.flatten();
    }
  }

  isBlacklisted() {
    var blacklist = this.opts.blacklist;
    return blacklist && blacklist.indexOf(this.node.type) > -1;
  }

  visit() {
    if (this.isBlacklisted()) return false;

    this.call("enter");

    if (this.shouldSkip) {
      return this.shouldStop;
    }

    var node = this.node;
    var opts = this.opts;

    if (Array.isArray(node)) {
      // traverse over these replacement nodes we purposely don't call exitNode
      // as the original node has been destroyed
      for (var i = 0; i < node.length; i++) {
        traverse.node(node[i], opts, this.scope, this.state, this);
      }
    } else {
      traverse.node(node, opts, this.scope, this.state, this);

      this.call("exit");
    }

    return this.shouldStop;
  }

  get(key) {
    return TraversalPath.get(this, this.context, this.node, this.node, key);
  }

  isReferencedIdentifier(opts) {
    return t.isReferencedIdentifier(this.node, this.parent, opts);
  }

  isReferenced() {
    return t.isReferenced(this.node, this.parent);
  }

  isScope() {
    return t.isScope(this.node, this.parent);
  }

  getBindingIdentifiers() {
    return t.getBindingIdentifiers(this.node);
  }
}

for (var i = 0; i < t.TYPES.length; i++) {
  let type = t.TYPES[i];
  let typeKey = `is${type}`;
  TraversalPath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };
}
