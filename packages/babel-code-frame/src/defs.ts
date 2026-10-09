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

function createFormatter(format: Parameters<typeof styleText>[0]): Formatter {
  return (input: string) =>
    styleText(format, String(input ?? ""), { validateStream: false });
}

/**
 * Styles for token types.
 */
export const defs = {
  keyword: createFormatter("cyan"),
  capitalized: createFormatter("yellow"),
  jsxIdentifier: createFormatter("yellow"),
  punctuator: createFormatter("yellow"),
  number: createFormatter("magenta"),
  string: createFormatter("green"),
  regex: createFormatter("magenta"),
  comment: createFormatter("gray"),
  invalid: createFormatter(["white", "bgRed", "bold"]),

  gutter: createFormatter("gray"),
  marker: createFormatter(["red", "bold"]),
  message: createFormatter(["red", "bold"]),

  reset: createFormatter("reset"),
};
