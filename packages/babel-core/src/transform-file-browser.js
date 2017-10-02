// @flow
import type { FileResult } from "./transformation";

export default function transformFile(
  filename: string,
  opts?: Object = {},
  callback: (?Error, FileResult | null) => void,
) {
  if (typeof opts === "function") {
    callback = opts;
  }

  callback(new Error("Transforming files is not supported in browsers"), null);
}
