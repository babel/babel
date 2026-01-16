import { stripVTControlCharacters, styleText } from "node:util";

import _codeFrame, { codeFrameColumns } from "../lib/index.js";
const codeFrame = _codeFrame.default || _codeFrame;

const gutter = input => styleText("gray", input, { validateStream: false });
const yellow = input => styleText("yellow", input, { validateStream: false });
const marker = input =>
  styleText(["red", "bold"], input, { validateStream: false });
const reset = input => styleText("reset", input, { validateStream: false });
const cyan = input => styleText("cyan", input, { validateStream: false });

function stubColorSupport(supported) {
  const original = process.env.FORCE_COLOR;

  beforeEach(function () {
    process.env.FORCE_COLOR = supported ? "" : "false";
  });

  afterEach(function () {
    process.env.FORCE_COLOR = original;
  });
}

describe("highlight", function () {
  describe("when colors are supported", () => {
    stubColorSupport(true);

    test("opts.highlightCode", function () {
      const rawLines = "console.log('babel')";
      const result = codeFrame(rawLines, 1, 9, { highlightCode: true });
      const stripped = stripVTControlCharacters(result);
      expect(result.length).toBeGreaterThan(stripped.length);
      expect(stripped).toEqual(
        ["> 1 | console.log('babel')", "    |         ^"].join("\n"),
      );

      const codeResult = result.match(/console.*?babel/)[0];
      const codeStripped = stripVTControlCharacters(codeResult);
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
      const stripped = stripVTControlCharacters(result);
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
      const rawLines = ["", "", "", ""].join("\n");
      expect(
        codeFrame(rawLines, 3, null, {
          linesAbove: 1,
          linesBelow: 1,
          forceColor: true,
        }),
      ).toEqual(
        reset(
          [
            " " + gutter(" 2 |"),
            marker(">") + gutter(" 3 |"),
            " " + gutter(" 4 |"),
          ].join("\n"),
        ),
      );
    });

    test("jsx", function () {
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
          reset(
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

    it("unicode capitalized", function () {
      const rawLines = ["var 𐐔𐐯𐑅𐐨𐑉𐐯𐐻, deseret;"].join("\n");

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
          reset(
            " " +
              gutter(" 1 |") +
              " " +
              cyan("var") +
              " " +
              yellow("𐐔𐐯𐑅𐐨𐑉𐐯𐐻") +
              yellow(",") +
              " " +
              "deseret" +
              yellow(";"),
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
      const stripped = stripVTControlCharacters(result);
      expect(result).toBe(stripped);
      expect(stripped).toEqual(
        ["> 1 | console.log('babel')", "    |         ^"].join("\n"),
      );
    });

    test("opts.forceColor", function () {
      const rawLines = ["", "", "", ""].join("\n");
      expect(
        codeFrame(rawLines, 3, null, {
          linesAbove: 1,
          linesBelow: 1,
          forceColor: true,
        }),
      ).toEqual(
        reset(
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
