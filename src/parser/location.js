import { getLineInfo } from "../util/location";
import Parser from "./index";

const pp = Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp.raise = function (pos, message) {
  const loc = getLineInfo(this.input, pos);
  message += ` (${loc.line}:${loc.column})`;
  const err = new SyntaxError(message);
  err.pos = pos;
  err.loc = loc;
  throw err;
};
