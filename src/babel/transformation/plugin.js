import PluginPass from "./plugin-pass";
import * as messages from "../messages";
import isFunction from "lodash/lang/isFunction";
import traverse from "../traversal";
import assign from "lodash/object/assign";
import clone from "lodash/lang/clone";
import File from "./file";

export default class Plugin {
  constructor(key: string, plugin: Object) {
    plugin = assign({}, plugin);

    var take = function (key) {
      var val = plugin[key];
      delete plugin[key];
      return val;
    };

    this.manipulateOptions = take("manipulateOptions");
    this.metadata          = take("metadata") || {};
    this.dependencies      = this.metadata.dependencies || [];
    this.post              = take("post");
    this.pre               = take("pre");

    //

    if (this.metadata.stage != null) {
      this.metadata.optional = true;
    }

    //

    this.visitor = this.normalize(clone(take("visitor")) || {});
    this.key     = key;
  }

  normalize(visitor: Object): Object {
    if (isFunction(visitor)) {
      visitor = { ast: visitor };
    }

    traverse.explode(visitor);

    return visitor;
  }

  buildPass(file: File): PluginPass {
    // validate Transformer instance
    if (!(file instanceof File)) {
      throw new TypeError(messages.get("pluginNotFile", this.key));
    }

    return new PluginPass(file, this);
  }
}
