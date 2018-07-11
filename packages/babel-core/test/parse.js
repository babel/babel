import fs from "fs";
import path from "path";
import { parse } from "../lib";

function fixture(...args) {
  return path.join(__dirname, "fixtures", "parse", ...args);
}

describe("parse", function() {
  it("should parse using configuration from .babelrc when a filename is provided", function() {
    const input = fs.readFileSync(fixture("input.js"), "utf8");
    const output = require(fixture("output"));

    const result = parse(input, {
      filename: fixture("input.js"),
      cwd: fixture(),
    });
    expect(JSON.parse(JSON.stringify(result))).toEqual(output);
  });

  it("should parse using passed in configuration", function() {
    const input = fs.readFileSync(fixture("input.js"), "utf8");
    const output = require(fixture("output.json"));

    const result = parse(input, {
      parserOpts: { plugins: ["decorators"] },
      cwd: fixture(),
    });
    expect(JSON.parse(JSON.stringify(result))).toEqual(output);
  });
});
