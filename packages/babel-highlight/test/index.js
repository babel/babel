import chalk from "chalk";
import stripAnsi from "strip-ansi";
import highlight, { shouldHighlight, getChalk } from "..";

describe("@babel/highlight", function() {
  function stubColorSupport(supported) {
    let originalSupportsColor;
    beforeEach(function() {
      originalSupportsColor = chalk.supportsColor;
      chalk.supportsColor = supported;
    });

    afterEach(function() {
      chalk.supportsColor = originalSupportsColor;
    });
  }

  describe("highlight", function() {
    describe("when colors are supported", function() {
      stubColorSupport(true);

      it("highlights code", function() {
        const code = "console.log('hi')";
        const result = highlight(code);
        const stripped = stripAnsi(result);
        expect(result.length).toBeGreaterThan(stripped.length);
        expect(stripped).toBe(code);
      });
    });

    describe("when colors are not supported", function() {
      stubColorSupport(false);

      it("does not attempt to highlight code", function() {
        const code = "console.log('hi')";
        const result = highlight(code);
        const stripped = stripAnsi(result);
        expect(result.length).toBe(stripped.length);
        expect(result).toBe(code);
      });

      describe("and the forceColor option is passed", function() {
        it("highlights the code anyway", function() {
          const code = "console.log('hi')";
          const result = highlight(code, { forceColor: true });
          const stripped = stripAnsi(result);
          expect(result.length).toBeGreaterThan(stripped.length);
          expect(stripped).toBe(code);
        });
      });
    });
  });

  describe("shouldHighlight", function() {
    describe("when colors are supported", function() {
      stubColorSupport(true);

      it("returns true", function() {
        expect(shouldHighlight({})).toBeTruthy();
      });
    });

    describe("when colors are not supported", function() {
      stubColorSupport(false);

      it("returns false", function() {
        expect(shouldHighlight({})).toBeFalsy();
      });

      describe("and the forceColor option is passed", function() {
        it("returns true", function() {
          expect(shouldHighlight({ forceColor: true })).toBeTruthy();
        });
      });
    });
  });

  describe("getChalk", function() {
    describe("when colors are supported", function() {
      stubColorSupport(true);

      describe("when forceColor is not passed", function() {
        it("returns a Chalk instance", function() {
          expect(getChalk({}).constructor).toBe(chalk.constructor);
        });
      });

      describe("when forceColor is passed", function() {
        it("returns a Chalk instance", function() {
          expect(getChalk({ forceColor: true }).constructor).toBe(
            chalk.constructor,
          );
        });
      });
    });

    describe("when colors are supported", function() {
      stubColorSupport(true);

      describe("when forceColor is not passed", function() {
        it("returns a Chalk instance", function() {
          expect(getChalk({}).constructor).toBe(chalk.constructor);
        });
      });

      describe("when forceColor is passed", function() {
        it("returns a Chalk instance", function() {
          expect(getChalk({ forceColor: true }).constructor).toBe(
            chalk.constructor,
          );
        });
      });
    });
  });
});
