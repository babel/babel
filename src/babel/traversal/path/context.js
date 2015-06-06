import traverse from "../index";

/**
 * Description
 */

export function call(key) {
  var node = this.node;
  if (!node) return;

  var opts = this.opts;
  if (!opts[key] && !opts[node.type]) return;

  var fns = [].concat(opts[key]);
  if (opts[node.type]) fns = fns.concat(opts[node.type][key]);

  for (var fn of (fns: Array)) {
    if (!fn) continue;

    let node = this.node;
    if (!node) return;

    var previousType = this.type;

    // call the function with the params (node, parent, scope, state)
    var replacement = fn.call(this, node, this.parent, this.scope, this.state);

    if (replacement) {
      this.replaceWith(replacement, true);
    }

    if (this.shouldStop || this.shouldSkip || this.removed) return;

    if (previousType !== this.type) {
      this.queueNode(this);
      return;
    }
  }
}

/**
 * Description
 */

export function isBlacklisted(): boolean {
  var blacklist = this.opts.blacklist;
  return blacklist && blacklist.indexOf(this.node.type) > -1;
}

/**
 * Description
 */

export function visit(): boolean {
  if (this.isBlacklisted()) return false;
  if (this.opts.shouldSkip && this.opts.shouldSkip(this)) return false;

  this.call("enter");

  if (this.shouldSkip) {
    return this.shouldStop;
  }

  var node = this.node;
  var opts = this.opts;

  if (node) {
    if (Array.isArray(node)) {
      // traverse over these replacement nodes we purposely don't call exitNode
      // as the original node has been destroyed
      for (var i = 0; i < node.length; i++) {
        traverse.node(node[i], opts, this.scope, this.state, this, this.skipKeys);
      }
    } else {
      traverse.node(node, opts, this.scope, this.state, this, this.skipKeys);
      this.call("exit");
    }
  }

  return this.shouldStop;
}

/**
 * Description
 */

export function skip() {
  this.shouldSkip = true;
}

/**
 * Description
 */

export function skipKey(key) {
  this.skipKeys[key] = true;
}

/**
 * Description
 */

export function stop() {
  this.shouldStop = true;
  this.shouldSkip = true;
}

/**
 * Description
 */

export function setScope() {
  if (this.opts && this.opts.noScope) return;

  var target = this.context || this.parentPath;
  this.scope = this.getScope(target && target.scope);
  if (this.scope) this.scope.init();
}

/**
 * Description
 */

export function setContext(context) {
  this.shouldSkip = false;
  this.shouldStop = false;
  this.removed    = false;
  this.skipKeys   = {};

  if (context) {
    this.context = context;
    this.state   = context.state;
    this.opts    = context.opts;
  }

  this.setScope();

  return this;
}

/**
 * Here we resync the node paths `key` and `container`. If they've changed according
 * to what we have stored internally then we attempt to resync by crawling and looking
 * for the new values.
 */

export function resync() {
  if (this.removed) return;

  this._resyncParent();
  this._resyncContainer();
  this._resyncKey();
  //this._resyncRemoved();
}

export function _resyncParent() {
  if (this.parentPath) {
    this.parent = this.parentPath.node;
  }
}

export function _resyncKey() {
  if (!this.container) return;

  if (this.node === this.container[this.key]) return;

  // grrr, path key is out of sync. this is likely due to a modification to the AST
  // not done through our path APIs

  if (Array.isArray(this.container)) {
    for (var i = 0; i < this.container.length; i++) {
      if (this.container[i] === this.node) {
        return this.setKey(i);
      }
    }
  } else {
    for (var key in this.container) {
      if (this.container[key] === this.node) {
        return this.setKey(key);
      }
    }
  }

  this.key = null;
}

export function _resyncContainer() {
  var containerKey = this.containerKey;
  var parentPath   = this.parentPath;
  if (!containerKey || !parentPath) return;

  var newContainer = parentPath.node[containerKey];
  if (this.container === newContainer) return;

  // container is out of sync. this is likely the result of it being reassigned

  if (newContainer) {
    this.container = newContainer;
  } else {
    this.container = null;
  }
}

export function _resyncRemoved() {
  if (this.key == null || !this.container || this.container[this.key] !== this.node) {
    this._markRemoved();
  }
}

/**
 * Description
 */

export function shiftContext() {
  this.contexts.shift();
  this.setContext(this.contexts[0]);
}

/**
 * Description
 */

export function unshiftContext(context) {
  this.contexts.unshift(context);
  this.setContext(context);
}

/**
 * Description
 */

export function setup(parentPath, container, containerKey, key) {
  this.containerKey = containerKey;
  this.container    = container;

  this.parentPath = parentPath || this.parentPath;
  this.setKey(key);
}

/**
 * Description
 */

export function setKey(key) {
  this.key  = key;
  this.node = this.container[this.key];
  this.type = this.node && this.node.type;
}

/**
 * Description
 */

export function queueNode(path) {
  for (var context of (this.contexts: Array)) {
    if (context.queue) {
      context.queue.push(path);
    }
  }
}
