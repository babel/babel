import { styleText } from "node:util";

export function isColorSupported() {
  return styleText("red", "-") !== "-";
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
type Formatter = (input: string) => string;

export type Defs = Record<InternalTokenType | UITokens | "reset", Formatter>;

const createFormatter = (
  format: Parameters<typeof styleText>[0],
  enabled: boolean,
): Formatter =>
  enabled
    ? (input: string) =>
        styleText(format, String(input ?? ""), { validateStream: false })
    : String;

/**
 * Styles for token types.
 */
function buildDefs(enabled: boolean): Defs {
  return {
    keyword: createFormatter("cyan", enabled),
    capitalized: createFormatter("yellow", enabled),
    jsxIdentifier: createFormatter("yellow", enabled),
    punctuator: createFormatter("yellow", enabled),
    number: createFormatter("magenta", enabled),
    string: createFormatter("green", enabled),
    regex: createFormatter("magenta", enabled),
    comment: createFormatter("gray", enabled),
    invalid: createFormatter(["white", "bgRed", "bold"], enabled),

    gutter: createFormatter("gray", enabled),
    marker: createFormatter(["red", "bold"], enabled),
    message: createFormatter(["red", "bold"], enabled),

    reset: createFormatter("reset", enabled),
  };
}

const defsOn = buildDefs(true);
const defsOff = buildDefs(false);

export function getDefs(enabled: boolean): Defs {
  return enabled ? defsOn : defsOff;
}
