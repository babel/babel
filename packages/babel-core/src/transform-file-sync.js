// @flow
import fs from "fs";

import loadConfig from "./config";
import runTransform, { type FileResult } from "./transformation";

export default function transformFileSync(
  filename: string,
  opts?: Object = {},
): FileResult | null {
  opts.filename = filename;
  const config = loadConfig(opts);
  if (config === null) return null;

  return runTransform(config, fs.readFileSync(filename, "utf8"));
}
