import picocolors, { createColors } from "picocolors";
import type { Colors, Formatter } from "picocolors/types";

export let isColorSupported =
  // See https://github.com/alexeyraspopov/picocolors/issues/62
  typeof process === "object" &&
  (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false")
    ? false
    : picocolors.isColorSupported;

// We bundle this package, so this is not exposed to users
export function __setColorSupportedForTestOnly(value: boolean) {
  const old = isColorSupported;
  isColorSupported = value;
  return old;
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
function builDefs(colors: Colors): Defs {
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

const defsOn = builDefs(createColors(true));
const defsOff = builDefs(createColors(false));

export function getDefs(enabled: boolean): Defs {
  return enabled ? defsOn : defsOff;
}
