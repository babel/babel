import picocolors, { createColors } from "picocolors";
import type { Colors, Formatter } from "picocolors/types";

export function isColorSupported() {
  return (
    // See https://github.com/alexeyraspopov/picocolors/issues/62
    typeof process === "object" &&
      (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false")
      ? false
      : picocolors.isColorSupported
  );
}

export type InternalTokenType =
  | "keyword"
  | "capitalized"
  | "jsxIdentifier"
  | "punctuator"
  | "number"
  | "string"
  | "regex"
  | "comment"
  | "invalid";

type UITokens = "gutter" | "marker" | "message";

export type Defs = {
  [_ in InternalTokenType | UITokens | "reset"]: Formatter;
};

const compose: <T, U, V>(f: (gv: U) => V, g: (v: T) => U) => (v: T) => V =
  (f, g) => v =>
    f(g(v));

/**
 * Styles for token types.
 */
function buildDefs(colors: Colors): Defs {
  return {
    keyword: colors.cyan,
    capitalized: colors.yellow,
    jsxIdentifier: colors.yellow,
    punctuator: colors.yellow,
    number: colors.magenta,
    string: colors.green,
    regex: colors.magenta,
    comment: colors.gray,
    invalid: compose(compose(colors.white, colors.bgRed), colors.bold),

    gutter: colors.gray,
    marker: compose(colors.red, colors.bold),
    message: compose(colors.red, colors.bold),

    reset: colors.reset,
  };
}

const defsOn = buildDefs(createColors(true));
const defsOff = buildDefs(createColors(false));

export function getDefs(enabled: boolean): Defs {
  return enabled ? defsOn : defsOff;
}
