import isFunction from "lodash/lang/isFunction";
import transform from "../transformation";
import * as babylon from "babylon";
import * as util from "../util";
import fs from "fs";

export { util, transform };
export { pipeline, lint } from "../transformation";
export { canCompile } from "../util";

export { default as File } from "../transformation/file";
export { default as options } from "../transformation/file/options/config";
export { default as Plugin } from "../transformation/plugin";
export { default as Pipeline } from "../transformation/pipeline";
export { default as buildExternalHelpers } from "../tools/build-external-helpers";
export { version } from "../../package";

import * as t from "babel-types";
export { t as types };

export function register(opts?: Object) {
  var callback = require("./register/node-polyfill");
  if (opts != null) callback(opts);
  return callback;
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
  return transform(fs.readFileSync(filename, "utf8"), opts);
}

export function parse(code, opts = {}) {
  opts.allowHashBang = true;
  opts.sourceType = "module";
  opts.ecmaVersion = Infinity;
  opts.plugins = {
    jsx:  true,
    flow: true
  };
  opts.features = {};

  for (var key in transform.pipeline.transformers) {
    opts.features[key] = true;
  }

  var ast = babylon.parse(code, opts);

  if (opts.onToken) {
    opts.onToken.push(...ast.tokens);
  }

  if (opts.onComment) {
    opts.onComment.push(...ast.comments);
  }

  return ast.program;
}
