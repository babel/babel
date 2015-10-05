/* @flow */

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
export { default as template } from "babel-template";
export { version } from "../../package";

import * as messages from "babel-messages";
export { messages };

import * as t from "babel-types";
export { t as types };

export function register(opts?: Object) {
  let callback = require("./register/node-polyfill");
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

    let result;

    try {
      result = transform(code, opts);
    } catch (err) {
      return callback(err);
    }

    callback(null, result);
  });
}

export function transformFileSync(filename: string, opts?: Object = {}): string {
  opts.filename = filename;
  return transform(fs.readFileSync(filename, "utf8"), opts);
}
