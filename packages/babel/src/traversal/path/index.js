import * as virtualTypes from "./lib/virtual-types";
import traverse from "../index";
import assign from "lodash/object/assign";
import Scope from "../scope";
import * as t from "../../types";

/**
 * [Please add a description.]
 */

export default class NodePath {

  /**
   * [Please add a description.]
   */

  constructor(hub, parent) {
    this.contexts = [];
    this.parent   = parent;
    this.data     = {};
    this.hub      = hub;

    this.shouldSkip         = false;
    this.shouldStop         = false;
    this.removed            = false;
    this.state              = null;
    this.opts               = null;
    this.skipKeys           = null;
    this.parentPath         = null;
    this.context            = null;
    this.container          = null;
    this.listKey            = null;
    this.inList             = false;
    this.parentKey          = null;
    this.key                = null;
    this.node               = null;
    this.scope              = null;
    this.type               = null;
    this.typeAnnotation     = null;
  }

  /**
   * [Please add a description.]
   */

  static get({ hub, parentPath, parent, container, listKey, key }) {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    var targetNode = container[key];
    var paths = parent._paths = parent._paths || [];
    var path;

    for (var i = 0; i < paths.length; i++) {
      var pathCheck = paths[i];
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

  /**
   * [Please add a description.]
   */

  getScope(scope: Scope) {
    var ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (this.isScope()) {
      ourScope = new Scope(this, scope);
    }

    return ourScope;
  }

  /**
   * [Please add a description.]
   */

  setData(key, val) {
    return this.data[key] = val;
  }

  /**
   * [Please add a description.]
   */

  getData(key, def) {
    var val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  }

  /**
   * [Please add a description.]
   */

  errorWithNode(msg, Error = SyntaxError) {
    return this.hub.file.errorWithNode(this.node, msg, Error);
  }

  /**
   * [Please add a description.]
   */

  traverse(visitor, state) {
    traverse(this.node, visitor, this.scope, state, this);
  }
}

/**
 * [Please add a description.]
 */

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

for (let type of (t.TYPES: Array)) {
  let typeKey = `is${type}`;
  NodePath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };
}

for (let type in virtualTypes) {
  if (type[0] === "_") continue;
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  NodePath.prototype[`is${type}`] = function (opts) {
    return virtualTypes[type].checkPath(this, opts);
  };
}
