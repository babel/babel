import TransformerPass from "./transformer-pass";
import isFunction from "lodash/lang/isFunction";
import traverse from "../traversal";
import isObject from "lodash/lang/isObject";
import assign from "lodash/object/assign";
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
    this.check             = take("check");
    this.post              = take("post");
    this.pre               = take("pre");

    this.experimental = !!take("experimental");
    this.playground   = !!take("playground");
    this.secondPass   = !!take("secondPass");
    this.optional     = !!take("optional");

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
    if (!(file instanceof File)) {
      throw new Error("Multiple versions of babel are interacting, this is either due to a version mismatch in a plugin or it was resolved incorrectly");
    }

    return new TransformerPass(file, this);
  }
}
