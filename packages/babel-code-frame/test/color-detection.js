import stripAnsi from "strip-ansi";
import colors from "picocolors";

import _codeFrame, { codeFrameColumns } from "../lib/index.js";
const codeFrame = _codeFrame.default || _codeFrame;

const compose = (f, g) => v => f(g(v));

function stubColorSupport(supported) {
  const originalIsColorSupported = colors.isColorSupported;

  beforeEach(function () {
    colors.isColorSupported = supported;
  });

  afterEach(function () {
    colors.isColorSupported = originalIsColorSupported;
  });
}

describe("highlight", function () {
  describe("when colors are supported", () => {
    stubColorSupport(true);

    test("opts.highlightCode", function () {
      const rawLines = "console.log('babel')";
      const result = codeFrame(rawLines, 1, 9, { highlightCode: true });
      const stripped = stripAnsi(result);
      expect(result.length).toBeGreaterThan(stripped.length);
      expect(stripped).toEqual(
        ["> 1 | console.log('babel')", "    |         ^"].join("\n"),
      );

      const codeResult = result.match(/console.*?babel/)[0];
      const codeStripped = stripAnsi(codeResult);
      expect(codeResult.length).toBeGreaterThan(codeStripped.length);
    });

    test("opts.highlightCode with multiple columns and lines", function () {
      // prettier-ignore
      const rawLines = [
      "function a(b, c) {",
      "  return b + c;",
      "}"
    ].join("\n");

      const result = codeFrameColumns(
        rawLines,
        {
          start: {
            line: 1,
            column: 1,
          },
          end: {
            line: 3,
            column: 1,
          },
        },
        {
          highlightCode: true,
          message: "Message about things",
        },
      );
      const stripped = stripAnsi(result);
      expect(result.length).toBeGreaterThan(stripped.length);
      expect(stripped).toEqual(
        // prettier-ignore
        [
        "> 1 | function a(b, c) {",
        "    | ^^^^^^^^^^^^^^^^^^",
        "> 2 |   return b + c;",
        "    | ^^^^^^^^^^^^^^^",
        "> 3 | }",
        "    | ^ Message about things",
      ].join('\n'),
      );
    });

    test("opts.forceColor", function () {
      const marker = compose(colors.red, colors.bold);
      const gutter = colors.gray;

      const rawLines = ["", "", "", ""].join("\n");
      expect(
        codeFrame(rawLines, 3, null, {
          linesAbove: 1,
          linesBelow: 1,
          forceColor: true,
        }),
      ).toEqual(
        colors.reset(
          [
            " " + gutter(" 2 |"),
            marker(">") + gutter(" 3 |"),
            " " + gutter(" 4 |"),
          ].join("\n"),
        ),
      );
    });

    test("jsx", function () {
      const gutter = colors.gray;
      const yellow = colors.yellow;

      const rawLines = ["<div />"].join("\n");

      expect(
        JSON.stringify(
          codeFrame(rawLines, 0, null, {
            linesAbove: 1,
            linesBelow: 1,
            forceColor: true,
          }),
        ),
      ).toEqual(
        JSON.stringify(
          colors.reset(
            " " +
              gutter(" 1 |") +
              " " +
              yellow("<") +
              yellow("div") +
              " " +
              yellow("/") +
              yellow(">"),
          ),
        ),
      );
    });
  });

  describe("when colors are not supported", () => {
    stubColorSupport(false);

    test("opts.highlightCode", function () {
      const rawLines = "console.log('babel')";
      const result = codeFrame(rawLines, 1, 9, { highlightCode: true });
      const stripped = stripAnsi(result);
      expect(result).toBe(stripped);
      expect(stripped).toEqual(
        ["> 1 | console.log('babel')", "    |         ^"].join("\n"),
      );
    });

    test("opts.forceColor", function () {
      const marker = compose(colors.red, colors.bold);
      const gutter = colors.gray;

      const rawLines = ["", "", "", ""].join("\n");
      expect(
        codeFrame(rawLines, 3, null, {
          linesAbove: 1,
          linesBelow: 1,
          forceColor: true,
        }),
      ).toEqual(
        colors.reset(
          [
            " " + gutter(" 2 |"),
            marker(">") + gutter(" 3 |"),
            " " + gutter(" 4 |"),
          ].join("\n"),
        ),
      );
    });
  });
});
