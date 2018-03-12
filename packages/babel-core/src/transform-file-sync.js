// @flow
import fs from "fs";

import loadConfig, { type InputOptions } from "./config";
import { runSync, type FileResult } from "./transformation";

export default function transformFileSync(
  filename: string,
  opts: ?InputOptions,
): FileResult | null {
  let options;
  if (opts == null) {
    options = { filename };
  } else if (opts && typeof opts === "object") {
    options = Object.assign({}, opts, { filename });
  }

  const config = loadConfig(options);
  if (config === null) return null;

  return runSync(config, fs.readFileSync(filename, "utf8"));
}
