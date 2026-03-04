import path from "node:path";
import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parse } from "../lib/index.js";
import { fileURLToPath } from "node:url";

runFixtureTests(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
  (input, options = {}) => {
    const plugins = JSON.stringify(options.plugins) || "";
    if (!plugins.includes("estree")) {
      options.locations = false;
    }
    return parse(input, options);
  },
  undefined,
  // They use `node.loc.end`, we don't save end positions for performance reasons.
  [
    "MissingEqInAssignment",
    "IllegalLanguageModeDirective",
    "SingleTypeParameterWithoutTrailingComma",
  ],
);

describe("locations: false", () => {
  it("should not share loc data", () => {
    const code = "var a = 1;";
    const ast1 = parse(code, { locations: "packed" });
    const ast2 = parse(code, { locations: "packed" });
    expect(ast1.locData).not.toBe(ast2.locData);
  });
});
