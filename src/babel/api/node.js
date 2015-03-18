import isFunction from "lodash/lang/isFunction";
import transform from "../transformation";
import * as util from "../util";
import fs from "fs";

export { util };
export { canCompile } from "../util";

export { default as acorn } from "../../../vendor/acorn";
export { default as Transformer } from "../transformation/transformer";
export { default as transform } from "../transformation";
export { default as traverse } from "../traversal";
export { default as buildExternalHelpers } from "../tools/build-external-helpers";
export { version } from "../../../package";

import * as t from "../types";
export { t as types };

export function register(opts?: Object) {
  var callback = require("./register/node");
  if (opts != null) callback(opts);
  return callback;
}

export function polyfill() {
  require("../polyfill");
}

export function transformFile(filename: string, opts?: Object, callback: Function) {
  if (isFunction(opts)) {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;

  fs.readFile(filename, function (err, code) {
    if (err) return callback(err);

    var result;

    try {
      result = transform(code, opts);
    } catch (err) {
      return callback(err);
    }

    callback(null, result);
  });
}

export function transformFileSync(filename: string, opts?: Object = {}) {
  opts.filename = filename;
  return transform(fs.readFileSync(filename), opts);
}
