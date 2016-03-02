/* eslint max-len: 0 */

import * as virtualTypes from "./lib/virtual-types";
import buildDebug from "debug";
import { PATH_CACHE_KEY } from "./constants";
import invariant from "invariant";
import traverse from "../index";
import assign from "lodash/object/assign";
import Scope from "../scope";
import * as t from "babel-types";

let debug = buildDebug("babel");

export default class NodePath {
  constructor(hub, parent) {
    this.parent = parent;
    this.hub = hub;
    this.contexts = [];
    this.data = {};
    this.shouldSkip = false;
    this.shouldStop = false;
    this.removed = false;
    this.state = null;
    this.opts = null;
    this.skipKeys = null;
    this.parentPath = null;
    this.context = null;
    this.container = null;
    this.listKey = null;
    this.inList = false;
    this.parentKey = null;
    this.key = null;
    this.node = null;
    this.scope = null;
    this.type = null;
    this.typeAnnotation = null;
  }

  static get({ hub, parentPath, parent, container, listKey, key }) {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    invariant(parent, "To get a node path the parent needs to exist");

    let targetNode = container[key];

    let paths = parent[PATH_CACHE_KEY] = parent[PATH_CACHE_KEY] || [];
    let path;

    for (let i = 0; i < paths.length; i++) {
      let pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (path && !(path instanceof NodePath)) {
      if (path.constructor.name === "NodePath") {
        // we're going to absolutley thrash the tree and allocate way too many node paths
        // than is necessary but there's no way around this as the node module resolution
        // algorithm is ridiculous
        path = null;
      } else {
        // badly deserialised probably
        throw new Error("We found a path that isn't a NodePath instance. Possiblly due to bad serialisation.");
      }
    }

    if (!path) {
      path = new NodePath(hub, parent);
      paths.push(path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  }

  getScope(scope) {
    let ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (this.isScope()) {
      ourScope = new Scope(this, scope);
    }

    return ourScope;
  }

  setData(key, val) {
    return this.data[key] = val;
  }

  getData(key, def) {
    let val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  }

  buildCodeFrameError(msg, Error = SyntaxError) {
    return this.hub.file.buildCodeFrameError(this.node, msg, Error);
  }

  traverse(visitor, state) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  mark(type, message) {
    this.hub.file.metadata.marked.push({
      type,
      message,
      loc: this.node.loc
    });
  }

  set(key, node) {
    t.validate(this.node, key, node);
    this.node[key] = node;
  }

  getPathLocation() {
    let parts = [];
    let path = this;
    do {
      let key = path.key;
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while (path = path.parentPath);
    return parts.join(".");
  }

  debug(buildMessage) {
    if (!debug.enabled) return;
    debug(`${this.getPathLocation()} ${this.type}: ${buildMessage()}`);
  }
}

assign(NodePath.prototype, require("./ancestry"));
assign(NodePath.prototype, require("./inference"));
assign(NodePath.prototype, require("./replacement"));
assign(NodePath.prototype, require("./evaluation"));
assign(NodePath.prototype, require("./conversion"));
assign(NodePath.prototype, require("./introspection"));
assign(NodePath.prototype, require("./context"));
assign(NodePath.prototype, require("./removal"));
assign(NodePath.prototype, require("./modification"));
assign(NodePath.prototype, require("./family"));
assign(NodePath.prototype, require("./comments"));

for (let type of t.TYPES) {
  let typeKey = `is${type}`;
  NodePath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };

  NodePath.prototype[`assert${type}`] = function (opts) {
    if (!this[typeKey](opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}

for (let type in virtualTypes) {
  if (type[0] === "_") continue;
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  let virtualType = virtualTypes[type];

  NodePath.prototype[`is${type}`] = function (opts) {
    return virtualType.checkPath(this, opts);
  };
}
