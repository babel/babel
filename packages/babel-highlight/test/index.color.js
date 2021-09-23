import "./helpers/enable-colors";
import { createColors } from "nanocolors";
import stripAnsi from "strip-ansi";
import highlight, { shouldHighlight, getChalk } from "../lib";

describe("@babel/highlight when colors are supported", function () {
  describe("highlight", function () {
    it("highlights code", function () {
      const code = "console.log('hi')";
      const result = highlight(code);
      const stripped = stripAnsi(result);
      expect(result.length).toBeGreaterThan(stripped.length);
      expect(stripped).toBe(code);
    });
  });

  describe("shouldHighlight", function () {
    it("returns true", function () {
      expect(shouldHighlight({})).toBeTruthy();
    });
  });
});

describe("getChalk", function () {
  describe("when forceColor is not passed", function () {
    it("returns a Chalk instance", function () {
      expect(Object.keys(getChalk({})).sort()).toEqual(
        Object.keys(createColors()).sort(),
      );
    });
  });

  describe("when forceColor is passed", function () {
    it("returns a Chalk instance", function () {
      expect(Object.keys(getChalk({ forceColor: true })).sort()).toEqual(
        Object.keys(createColors()).sort(),
      );
    });
  });
});
