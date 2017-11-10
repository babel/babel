// @flow
import fs from "fs";

import loadConfig, { type InputOptions } from "./config";
import { runSync, type FileResult } from "./transformation";

export default function transformFileSync(
  filename: string,
  opts: ?InputOptions,
): FileResult | null {
  if (opts == null) {
    opts = { filename };
  } else if (opts && typeof opts === "object") {
    opts = Object.assign(opts, { filename });
  }

  const config = loadConfig(opts);
  if (config === null) return null;

  return runSync(config, fs.readFileSync(filename, "utf8"));
}
