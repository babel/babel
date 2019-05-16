// @flow

import { getLineInfo, type Position } from "../util/location";
import CommentsParser from "./comments";

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

export default class LocationParser extends CommentsParser {
  getLocationForPosition(pos: number): Position {
    let loc;
    if (pos === this.state.start) loc = this.state.startLoc;
    else if (pos === this.state.lastTokStart) loc = this.state.lastTokStartLoc;
    else if (pos === this.state.end) loc = this.state.endLoc;
    else if (pos === this.state.lastTokEnd) loc = this.state.lastTokEndLoc;
    else loc = getLineInfo(this.input, pos);

    return loc;
  }

  raise(
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
    const loc = this.getLocationForPosition(pos);

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
}
