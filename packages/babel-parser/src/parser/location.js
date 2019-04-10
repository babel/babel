// @flow

import { getLineInfo, type Position } from "../util/location";

import { input } from "./index";

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

export function raise(
  pos: number,
  message: string,
  {
    missingPluginNames,
    code,
  }: {
    missingPluginNames?: Array<string>,
    code?: string,
  } = {},
): empty {
  const loc = getLineInfo(input, pos);
  message += ` (${loc.line}:${loc.column})`;
  // $FlowIgnore
  const err: SyntaxError & { pos: number, loc: Position } = new SyntaxError(
    message,
  );
  err.pos = pos;
  err.loc = loc;
  if (missingPluginNames) {
    err.missingPlugin = missingPluginNames;
  }
  if (code !== undefined) {
    err.code = code;
  }
  throw err;
}
