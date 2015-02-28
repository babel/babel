import isFunction from "lodash/lang/isFunction";
import transform from "../transformation";
import fs from "fs";

import * as util from "../util";
export { util as _util };
export {canCompile } from "../util";

export { default as acorn } from "acorn-babel";
export { default as transform } from "../transformation";
export { default as traverse } from "../traversal";
export { default as buildExternalHelpers } from "../build-external-helpers";
export { default as types } from "../types";
export { version } from "../../../package";

export function register(opts) {
  var callback = require("./register/node");
  if (opts != null) callback(opts);
  return callback;
}

export function polyfill() {
  require("../polyfill");
}

export function transformFile(filename, opts, callback) {
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

export function transformFileSync(filename, opts = {}) {
  opts.filename = filename;
  return transform(fs.readFileSync(filename), opts);
}
