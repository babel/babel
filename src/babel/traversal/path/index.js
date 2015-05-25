import PathHoister from "./lib/hoister";
import * as virtualTypes from "./lib/virtual-types";
import * as messages from "../../messages";
import isBoolean from "lodash/lang/isBoolean";
import isNumber from "lodash/lang/isNumber";
import isRegExp from "lodash/lang/isRegExp";
import isString from "lodash/lang/isString";
import codeFrame from "../../helpers/code-frame";
import parse from "../../helpers/parse";
import { explode } from "../visitors";
import traverse from "../index";
import includes from "lodash/collection/includes";
import assign from "lodash/object/assign";
import extend from "lodash/object/extend";
import Scope from "../scope";
import * as t from "../../types";

export default class NodePath {
  constructor(parent, container) {
    this.container = container;
    this.contexts  = [];
    this.parent    = parent;
    this.data      = {};
  }

  /**
   * Description
   */

  static get(parentPath: NodePath, parent, container, key) {
    var targetNode = container[key];
    var paths = container._paths = container._paths || [];
    var path;

    for (var i = 0; i < paths.length; i++) {
      var pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (!path) {
      path = new NodePath(parent, container);
      paths.push(path);
    }

    path.setup(parentPath, key);

    return path;
  }

  /**
   * Description
   */

  static getScope(path: NodePath, scope: Scope, file?: File) {
    var ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (path.isScope()) {
      ourScope = new Scope(path, scope, file);
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
assign(NodePath.prototype, require("./verification"));
assign(NodePath.prototype, require("./context"));
assign(NodePath.prototype, require("./removal"));
assign(NodePath.prototype, require("./modification"));
assign(NodePath.prototype, require("./family"));

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
