// @flow
import loadConfig from "./config";
import runTransform, { type FileResult } from "./transformation";

export default function transform(
  code: string,
  opts?: Object,
): FileResult | null {
  const config = loadConfig(opts);
  if (config === null) return null;

  return runTransform(config, code);
}
