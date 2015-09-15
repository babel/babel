import * as messages from "babel-messages";
import traverse from "babel-traverse";
import assign from "lodash/object/assign";
import clone from "lodash/lang/clone";

export default class Plugin {
  constructor(plugin: Object) {
    plugin = this.raw = assign({}, plugin);

    function take(key) {
      var val = plugin[key];
      delete plugin[key];
      return val;
    }

    this.manipulateOptions = take("manipulateOptions");
    this.post              = take("post");
    this.pre               = take("pre");

    this.visitor    = this.normalize(clone(take("visitor")) || {});
  }

  validate(loc, i) {
    for (let key in this.raw) {
      throw new Error(messages.get("pluginInvalidProperty", loc, i, key));
    }
  }

  normalize(visitor: Object): Object {
    traverse.explode(visitor);
    return visitor;
  }
}
