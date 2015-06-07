import * as virtualTypes from "./lib/virtual-types";
import traverse from "../index";
import assign from "lodash/object/assign";
import Scope from "../scope";
import * as t from "../../types";

export default class NodePath {
  constructor(hub, parent) {
    this.contexts = [];
    this.parent   = parent;
    this.data     = {};
    this.hub      = hub;
  }

  /**
   * Description
   */

  static get({ hub, parentPath, parent, container, containerKey, key }) {
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

    path.setup(parentPath, container, containerKey, key);

    return path;
  }

  /**
   * Description
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
   * Description
   */

  setData(key, val) {
    return this.data[key] = val;
  }

  /**
   * Description
   */

  getData(key, def) {
    var val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  }

  /**
   * Description
   */

  errorWithNode(msg, Error = SyntaxError) {
    var loc = this.node.loc.start;
    var err = new Error(`Line ${loc.line}: ${msg}`);
    err.loc = loc;
    return err;
  }

  /**
   * Description
   */

  traverse(visitor, state) {
    traverse(this.node, visitor, this.scope, state, this);
  }
}

assign(NodePath.prototype, require("./ancestry"));
assign(NodePath.prototype, require("./resolution"));
assign(NodePath.prototype, require("./replacement"));
assign(NodePath.prototype, require("./evaluation"));
assign(NodePath.prototype, require("./conversion"));
assign(NodePath.prototype, require("./introspection"));
assign(NodePath.prototype, require("./context"));
assign(NodePath.prototype, require("./removal"));
assign(NodePath.prototype, require("./modification"));
assign(NodePath.prototype, require("./family"));
assign(NodePath.prototype, require("./comments"));

for (let type in virtualTypes) {
  if (type[0] === "_") continue;

  NodePath.prototype[`is${type}`] = function (opts) {
    return virtualTypes[type].checkPath(this, opts);
  };
}

for (let type of (t.TYPES: Array)) {
  let typeKey = `is${type}`;
  NodePath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };
}
