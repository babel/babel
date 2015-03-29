import TransformerPass from "./transformer-pass";
import isFunction from "lodash/lang/isFunction";
import traverse from "../traversal";
import isObject from "lodash/lang/isObject";
import assign from "lodash/object/assign";
import * as acorn from "../../acorn";
import File from "./file";
import each from "lodash/collection/each";

/**
 * This is the class responsible for normalising a transformers handlers
 * as well as constructing a `TransformerPass` that is repsonsible for
 * actually running the transformer over the provided `File`.
 */

export default class Transformer {
  constructor(transformerKey: key, transformer: Object, opts: Object) {
    transformer = assign({}, transformer);

    var take = function (key) {
      var val = transformer[key];
      delete transformer[key];
      return val;
    };

    this.manipulateOptions = take("manipulateOptions");
    this.metadata          = take("metadata") || {};
    this.parser            = take("parser");
    this.check             = take("check");
    this.post              = take("post");
    this.pre               = take("pre");

    if (this.metadata.stage != null) {
      this.metadata.optional = true;
    }

    this.handlers = this.normalize(transformer);
    this.opts     ||= {};
    this.key      = transformerKey;
  }

  normalize(transformer: Object): Object {
    if (isFunction(transformer)) {
      transformer = { ast: transformer };
    }

    traverse.explode(transformer);

    each(transformer, (fns, type) => {
      // hidden property
      if (type[0] === "_") {
        this[type] = fns;
        return;
      }

      if (type === "enter" || type === "exit") return;

      if (isFunction(fns)) fns = { enter: fns };

      if (!isObject(fns)) return;

      if (!fns.enter) fns.enter = function () { };
      if (!fns.exit) fns.exit = function () { };

      transformer[type] = fns;
    });

    return transformer;
  }

  buildPass(file: File): TransformerPass {
    return new TransformerPass(file, this);
  }
}
