import "./helpers/disable-colors";
import { createColors } from "nanocolors";
import stripAnsi from "strip-ansi";
import highlight, { shouldHighlight, getChalk } from "../lib";

describe("@babel/highlight when colors are not supported", function () {
  describe("highlight", function () {
    it("does not attempt to highlight code", function () {
      const code = "console.log('hi')";
      const result = highlight(code);
      const stripped = stripAnsi(result);
      expect(result.length).toBe(stripped.length);
      expect(result).toBe(code);
    });

    describe("and the forceColor option is passed", function () {
      it("highlights the code anyway", function () {
        const code = "console.log('hi')";
        const result = highlight(code, { forceColor: true });
        const stripped = stripAnsi(result);
        expect(result.length).toBeGreaterThan(stripped.length);
        expect(stripped).toBe(code);
      });
    });
  });

  describe("shouldHighlight", function () {
    it("returns false", function () {
      expect(shouldHighlight({})).toBeFalsy();
    });

    describe("and the forceColor option is passed", function () {
      it("returns true", function () {
        expect(shouldHighlight({ forceColor: true })).toBeTruthy();
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
});
