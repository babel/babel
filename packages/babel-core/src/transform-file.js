// @flow
import fs from "fs";

import loadConfig from "./config";
import runTransform, { type FileResult } from "./transformation";

export default function transformFile(
  filename: string,
  opts?: Object = {},
  callback: (?Error, FileResult | null) => void,
) {
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;
  const config = loadConfig(opts);
  if (config === null) return callback(null, null);

  fs.readFile(filename, "utf8", function(err, code: string) {
    if (err) return callback(err, null);

    let result;
    try {
      result = runTransform(config, code);
    } catch (_err) {
      return callback(_err, null);
    }
    callback(null, result);
  });
}
