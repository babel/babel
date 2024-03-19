import { USE_ESM } from "$repo-utils";

import stripAnsi from "strip-ansi";
import colors, { createColors } from "picocolors";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import _highlight, { shouldHighlight } from "../lib/index.js";
const highlight = _highlight.default || _highlight;

const describeBabel7NoESM =
  process.env.BABEL_8_BREAKING || USE_ESM ? describe.skip : describe;

describe("@babel/highlight", function () {
  function stubColorSupport(supported) {
    let originalColorsCopy;

    beforeEach(function () {
      if (supported === colors.isColorSupported) {
        originalColorsCopy = null;
      } else {
        originalColorsCopy = { ...colors };
        Object.assign(colors, createColors(supported));
      }
    });

    afterEach(function () {
      if (originalColorsCopy) {
        Object.assign(colors, originalColorsCopy);
      }
    });
  }

  describe("highlight", function () {
    describe("when colors are supported", function () {
      stubColorSupport(true);

      it("highlights code", function () {
        const code = "console.log('hi')";
        const result = highlight(code);
        const stripped = stripAnsi(result);
        expect(result.length).toBeGreaterThan(stripped.length);
        expect(stripped).toBe(code);
      });
    });

    describe("when colors are not supported", function () {
      stubColorSupport(false);

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
  });

  describe("shouldHighlight", function () {
    describe("when colors are supported", function () {
      stubColorSupport(true);

      it("returns true", function () {
        expect(shouldHighlight({})).toBeTruthy();
      });
    });

    describe("when colors are not supported", function () {
      stubColorSupport(false);

      it("returns false", function () {
        expect(shouldHighlight({})).toBeFalsy();
      });

      describe("and the forceColor option is passed", function () {
        it("returns true", function () {
          expect(shouldHighlight({ forceColor: true })).toBeTruthy();
        });
      });
    });
  });

  describeBabel7NoESM("getChalk", function () {
    let getChalk, chalk;
    beforeAll(() => {
      chalk = require("chalk");
      ({ getChalk } = require("../lib/index.js"));
    });

    function stubChalkColorSupport(supported) {
      let originalChalkLevel;
      let originalChalkEnabled;

      beforeEach(function () {
        originalChalkLevel = chalk.level;
        originalChalkEnabled = chalk.enabled;
        chalk.level = supported ? 1 : 0;
        chalk.enabled = supported;
      });

      afterEach(function () {
        chalk.level = originalChalkLevel;
        chalk.enabled = originalChalkEnabled;
      });
    }

    describe("when colors are supported", function () {
      stubChalkColorSupport(true);

      describe("when forceColor is not passed", function () {
        it("returns a Chalk instance", function () {
          expect(getChalk({}).constructor).toBe(chalk.constructor);
        });
      });

      describe("when forceColor is passed", function () {
        it("returns a Chalk instance", function () {
          expect(getChalk({ forceColor: true }).constructor).toBe(
            chalk.constructor,
          );
        });
      });
    });

    describe("when colors are not supported", function () {
      stubChalkColorSupport(false);

      describe("when forceColor is not passed", function () {
        it("returns a Chalk instance", function () {
          expect(getChalk({}).constructor).toBe(chalk.constructor);
        });
      });

      describe("when forceColor is passed", function () {
        it("returns a Chalk instance", function () {
          expect(getChalk({ forceColor: true }).constructor).toBe(
            chalk.constructor,
          );
        });
      });
    });
  });
});
