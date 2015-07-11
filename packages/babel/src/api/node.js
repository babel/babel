import isFunction from "lodash/lang/isFunction";
import transform from "../transformation";
import * as babylon from "babylon";
import * as util from "../util";
import fs from "fs";

var deasync;
try {
  deasync = require("deasync");
} catch (err) {}

export { util, babylon as acorn, transform };
export { pipeline } from "../transformation";
export { canCompile } from "../util";

export { default as options } from "../transformation/file/options/config";
export { default as Plugin } from "../transformation/plugin";
export { default as Transformer } from "../transformation/transformer";
export { default as Pipeline } from "../transformation/pipeline";
export { default as traverse } from "../traversal";
export { default as buildExternalHelpers } from "../tools/build-external-helpers";
export { version } from "../../package";

import * as t from "../types";
export { t as types };

export function register(opts?: Object) {
  var callback = require("./register/node-polyfill");
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

  return transform(fs.createReadStream(filename), opts);
}

export function __plsDontUseThis(code, opts) {
  if (!deasync) {
    throw new Error("Sorry, this API isn't available in the current environment.");
  }

  var done = false;
  var result, err;

  transform(code, opts).then(function (_result) {
    result = _result;
    done = true;
  }, function (_err) {
    err = _err;
    done = true;
  });

  deasync.loopWhile(() => !done);

  if (err) {
    throw err;
  } else {
    return result;
  }
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

  return babylon.parse(code, opts);
}
