// @flow
import loadConfig, { type InputOptions } from "./config";
import { runSync, type FileResult } from "./transformation";

export default function transformSync(
  code: string,
  opts: ?InputOptions,
): FileResult | null {
  const config = loadConfig(opts);
  if (config === null) return null;

  return runSync(config, code);
}
