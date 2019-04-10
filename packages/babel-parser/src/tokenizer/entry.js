// @flow

export { TokContext } from "./context";

// The bundler script doesn't support export---as
import { types } from "./context";
export const ct = types;

export {
  next,
  match,
  eat,
  lookahead,
  nextToken,
  readRegexp,
  readWord,
  finishOp,
  finishToken,
  getTokenFromCode,
  setStrict,
  readToken_mult_modulo,
  readToken_pipe_amp,
  skipBlockComment,
  curContext,
  updateContext,
} from "./index";
