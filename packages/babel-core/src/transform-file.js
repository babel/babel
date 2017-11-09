// @flow
import fs from "fs";

import loadConfig, { type InputOptions } from "./config";
import { runAsync, type FileResultCallback } from "./transformation";

type TransformFile = {
  (filename: string, callback: FileResultCallback): void,
  (filename: string, opts: ?InputOptions, callback: FileResultCallback): void,
};

export default ((function transformFile(filename, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (opts == null) {
    opts = { filename };
  } else if (opts && typeof opts === "object") {
    opts = Object.assign(opts, { filename });
  }

  process.nextTick(() => {
    let cfg;
    try {
      cfg = loadConfig(opts);
      if (cfg === null) return callback(null, null);
    } catch (err) {
      return callback(err);
    }

    // Reassignment to keep Flow happy.
    const config = cfg;

    fs.readFile(filename, "utf8", function(err, code: string) {
      if (err) return callback(err, null);

      runAsync(config, code, null, callback);
    });
  });
}: Function): TransformFile);
