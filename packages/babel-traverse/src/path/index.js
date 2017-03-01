import type Hub from "../hub";
import type TraversalContext from "../context";
import * as virtualTypes from "./lib/virtual-types";
import buildDebug from "debug";
import invariant from "invariant";
import traverse from "../index";
import assign from "lodash/assign";
import Scope from "../scope";
import * as t from "babel-types";
import { path as pathCache } from "../cache";

const debug = buildDebug("babel");

export default class NodePath {
  constructor(hub: Hub, parent: Object) {
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

  parent: Object;
  hub: Hub;
  contexts: Array<TraversalContext>;
  data: Object;
  shouldSkip: boolean;
  shouldStop: boolean;
  removed: boolean;
  state: any;
  opts: ?Object;
  skipKeys: ?Object;
  parentPath: ?NodePath;
  context: TraversalContext;
  container: ?Object | Array<Object>;
  listKey: ?string;
  inList: boolean;
  parentKey: ?string;
  key: ?string;
  node: ?Object;
  scope: Scope;
  type: ?string;
  typeAnnotation: ?Object;

  static get({ hub, parentPath, parent, container, listKey, key }): NodePath {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    invariant(parent, "To get a node path the parent needs to exist");

    const targetNode = container[key];

    const paths = pathCache.get(parent) || [];
    if (!pathCache.has(parent)) {
      pathCache.set(parent, paths);
    }

    let path;

    for (let i = 0; i < paths.length; i++) {
      const pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (!path) {
      path = new NodePath(hub, parent);
      paths.push(path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  }

  getScope(scope: Scope) {
    let ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (this.isScope()) {
      ourScope = new Scope(this, scope);
    }

    return ourScope;
  }

  setData(key: string, val: any): any {
    return this.data[key] = val;
  }

  getData(key: string, def?: any): any {
    let val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  }

  buildCodeFrameError(msg: string, Error: typeof Error = SyntaxError): Error {
    return this.hub.file.buildCodeFrameError(this.node, msg, Error);
  }

  traverse(visitor: Object, state?: any) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  mark(type: string, message: string) {
    this.hub.file.metadata.marked.push({
      type,
      message,
      loc: this.node.loc
    });
  }

  set(key: string, node: Object) {
    t.validate(this.node, key, node);
    this.node[key] = node;
  }

  getPathLocation(): string {
    const parts = [];
    let path = this;
    do {
      let key = path.key;
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while (path = path.parentPath);
    return parts.join(".");
  }

  debug(buildMessage: Function) {
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

for (const type of (t.TYPES: Array<string>)) {
  const typeKey = `is${type}`;
  NodePath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };

  NodePath.prototype[`assert${type}`] = function (opts) {
    if (!this[typeKey](opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}

for (const type in virtualTypes) {
  if (type[0] === "_") continue;
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  const virtualType = virtualTypes[type];

  NodePath.prototype[`is${type}`] = function (opts) {
    return virtualType.checkPath(this, opts);
  };
}
