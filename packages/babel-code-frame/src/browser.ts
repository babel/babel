import {
  _codeFrameColumns,
  type NodeLocation,
  type Options,
} from "./common.ts";

export type { Options };

export function codeFrameColumns(
  rawLines: string,
  loc: NodeLocation,
  opts: Options = {},
): string {
  return _codeFrameColumns(rawLines, loc, opts);
}

export function highlight(code: string) {
  return code;
}
