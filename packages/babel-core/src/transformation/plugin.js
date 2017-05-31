import OptionManager from "./file/options/option-manager";
import * as messages from "babel-messages";
import Store from "../store";
import traverse from "babel-traverse";
import assign from "lodash/assign";
import clone from "lodash/clone";

const GLOBAL_VISITOR_PROPS = ["enter", "exit"];

export default class Plugin extends Store {
  constructor(plugin: Object, key?: string) {
    super();

    this.initialized = false;
    this.raw         = assign({}, plugin);
    this.key         = this.take("name") || key;

    this.manipulateOptions = this.take("manipulateOptions");
    this.post              = this.take("post");
    this.pre               = this.take("pre");
    this.visitor           = this.normaliseVisitor(clone(this.take("visitor")) || {});
  }

  initialized: boolean;
  raw: Object;
  manipulateOptions: ?Function;
  post: ?Function;
  pre: ?Function;
  visitor: Object;

  take(key: string) {
    const val = this.raw[key];
    delete this.raw[key];
    return val;
  }

  chain(target: Object, key: string) {
    if (!target[key]) return this[key];
    if (!this[key]) return target[key];

    const fns: Array<?Function> = [target[key], this[key]];

    return function (...args) {
      let val;
      for (const fn of fns) {
        if (fn) {
          const ret = fn.apply(this, args);
          if (ret != null) val = ret;
        }
      }
      return val;
    };
  }

  mergeFields(target: Object, loc: string) {
    const inherits = OptionManager.normalisePlugin(target, loc, "inherits");

    this.manipulateOptions = this.chain(inherits, "manipulateOptions");
    this.post = this.chain(inherits, "post");
    this.pre = this.chain(inherits, "pre");
    this.visitor = traverse.visitors.merge([inherits.visitor, this.visitor]);
  }

  maybeInherit(loc: string) {
    const inherits = this.take("inherits");
    if (!inherits) return;

    if (Array.isArray(inherits)) {
      inherits.forEach((target) => this.mergeFields(target, loc));
    } else {
      this.mergeFields(inherits, loc);
    }
  }

  /**
   * We lazy initialise parts of a plugin that rely on contextual information such as
   * position on disk and how it was specified.
   */

  init(loc: string, i: number) {
    if (this.initialized) return;
    this.initialized = true;

    this.maybeInherit(loc);

    for (const key in this.raw) {
      throw new Error(messages.get("pluginInvalidProperty", loc, i, key));
    }
  }

  normaliseVisitor(visitor: Object): Object {
    for (const key of GLOBAL_VISITOR_PROPS) {
      if (visitor[key]) {
        throw new Error("Plugins aren't allowed to specify catch-all enter/exit handlers. " +
          "Please target individual nodes.");
      }
    }

    traverse.explode(visitor);
    return visitor;
  }
}
