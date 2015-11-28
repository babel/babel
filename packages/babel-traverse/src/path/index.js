import type Hub from "../hub";
import type TraversalContext from "../context";
import * as virtualTypes from "./lib/virtual-types";
import buildDebug from "debug";
import { PATH_CACHE_KEY } from "./constants";
import invariant from "invariant";
import traverse from "../index";
import assign from "lodash/object/assign";
import Scope from "../scope";
import * as t from "babel-types";

let debug = buildDebug("babel");

/**
 * [Needs description]
 * @private
 */

export default class NodePath {
  constructor(hub: Hub, parent: Object) {
    /**
     * Parent node.
     * @public
     * @member {Node}
     * @name nodePath.parent
     */

    this.parent = parent;

    /**
     * Has the node been removed?
     * @public
     * @member {Boolean}
     * @name nodePath.removed
     */

    this.removed = false;

    /**
     * Parent path.
     * @public
     * @member {?NodePath}
     * @name nodePath.parentPath
     */

    this.parentPath = null;

    /**
     * [Needs description]
     * @public
     * @member {?Object | Array<Object>}
     * @name nodePath.container
     */

    this.container = null;

    /**
     * [Needs description]
     * @public
     * @member {?String}
     * @name nodePath.listKey
     */

    this.listKey = null;

    /**
     * @public
     * @member {Boolean}
     * @name nodePath.inList
     */

    this.inList = false;

    /**
     * [Needs description]
     * @public
     * @member {?String}
     * @name nodePath.parentKey
     */

    this.parentKey = null;

    /**
     * [Needs description]
     * @public
     * @member {?String}
     * @name nodePath.key
     */

    this.key = null;

    /**
     * Node.
     * @public
     * @member {Node}
     * @name nodePath.node
     */

    this.node = null;

    /**
     * Scope.
     * @public
     * @member {Scope}
     * @name nodePath.scope
     */

    this.scope = null;

    // private members
    this.hub = hub;
    this.contexts = [];
    this.data = {};
    this.shouldSkip = false;
    this.shouldStop = false;
    this.state = null;
    this.opts = null;
    this.skipKeys = null;
    this.context = null;
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

  /**
   * [Needs description]
   * @private
   */

  static get({ hub, parentPath, parent, container, listKey, key }): NodePath {
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

  /**
   * [Needs description]
   * @private
   */

  getScope(scope: Scope) {
    let ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (this.isScope()) {
      ourScope = new Scope(this, scope);
    }

    return ourScope;
  }

  /**
   * [Needs description]
   * @private
   */

  setData(key: string, val: any): any {
    return this.data[key] = val;
  }

  /**
   * [Needs description]
   * @private
   */

  getData(key: string, def?: any): any {
    let val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  }

  /**
   * [Needs description]
   * @public
   */

  buildCodeFrameError(msg: string, Error: typeof Error = SyntaxError): Error {
    return this.hub.file.buildCodeFrameError(this.node, msg, Error);
  }

  /**
   * [Needs description]
   * @public
   */

  traverse(visitor: Object, state?: any) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  /**
   * [Needs description]
   * @public
   */

  mark(type: string, message: string) {
    this.hub.file.metadata.marked.push({
      type,
      message,
      loc: this.node.loc
    });
  }

  /**
   * [Needs description]
   * @public
   */

  set(key: string, node: Object) {
    t.validate(this.node, key, node);
    this.node[key] = node;
  }

  /**
   * [Needs description]
   * @private
   */

  getPathLocation(): string {
    let parts = [];
    let path = this;
    do {
      let key = path.key;
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while(path = path.parentPath);
    return parts.join(".");
  }

  /**
   * [Needs description]
   * @private
   */

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

for (let type of (t.TYPES: Array<string>)) {
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
