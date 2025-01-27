import fs from "fs";
import path from "path";
import { parseSync } from "../lib/index.js";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

function fixture(...args) {
  return path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "fixtures",
    "parse",
    ...args,
  );
}

describe("parseSync", function () {
  it("should parse using configuration from .babelrc when a filename is provided", function () {
    const input = fs.readFileSync(fixture("input.js"), "utf8");
    const output = require(fixture("output"));

    const result = parseSync(input, {
      filename: fixture("input.js"),
      cwd: fixture(),
    });
    expect(JSON.parse(JSON.stringify(result))).toEqual(output);
  });

  it("should parse using passed in configuration", function () {
    const input = fs.readFileSync(fixture("input.js"), "utf8");
    const output = require(fixture("output.json"));

    const result = parseSync(input, {
      parserOpts: {
        plugins: [["decorators", { decoratorsBeforeExport: false }]],
      },
      cwd: fixture(),
    });
    expect(JSON.parse(JSON.stringify(result))).toEqual(output);
  });

  it("should show correct codeFrame with startLine and startColumn", function () {
    const input = `const* a = 1;`;
    let err;
    try {
      parseSync(input, {
        parserOpts: {
          startLine: 3,
          startColumn: 3,
          startIndex: 6,
        },
        highlightCode: false,
        configFile: false,
        babelrc: false,
      });
    } catch (e) {
      err = e;
    }
    expect(err.message).toMatchInlineSnapshot(`
      "unknown: Unexpected token (3:8)

        1 |
        2 |
      > 3 |    const* a = 1;
          |         ^"
    `);
  });
});
