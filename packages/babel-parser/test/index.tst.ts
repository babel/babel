import { expect, it } from "tstyche";
import type { ParseError } from "../src/index.ts";

it("errors", () => {
  const e = {} as ParseError;

  if (e.reasonCode === "AccessorIsGenerator") {
    expect(e.code).type.toBe<"BABEL_PARSER_SYNTAX_ERROR">();
    expect(e.details.kind).type.toBe<"get" | "set">();
  }
});
