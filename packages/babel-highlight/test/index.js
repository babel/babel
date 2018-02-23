import assert from "assert";
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
        assert.ok(result.length > stripped.length);
        assert.equal(stripped, code);
      });
    });

    describe("when colors are not supported", function() {
      stubColorSupport(false);

      it("does not attempt to highlight code", function() {
        const code = "console.log('hi')";
        const result = highlight(code);
        const stripped = stripAnsi(result);
        assert.ok(result.length === stripped.length);
        assert.equal(result, code);
      });

      describe("and the forceColor option is passed", function() {
        it("highlights the code anyway", function() {
          const code = "console.log('hi')";
          const result = highlight(code, { forceColor: true });
          const stripped = stripAnsi(result);
          assert.ok(result.length > stripped.length);
          assert.equal(stripped, code);
        });
      });
    });
  });

  describe("shouldHighlight", function() {
    describe("when colors are supported", function() {
      stubColorSupport(true);

      it("returns true", function() {
        assert.ok(shouldHighlight({}));
      });
    });

    describe("when colors are not supported", function() {
      stubColorSupport(false);

      it("returns false", function() {
        assert.ok(!shouldHighlight({}));
      });

      describe("and the forceColor option is passed", function() {
        it("returns true", function() {
          assert.ok(shouldHighlight({ forceColor: true }));
        });
      });
    });
  });

  describe("getChalk", function() {
    describe("when colors are supported", function() {
      stubColorSupport(true);

      describe("when forceColor is not passed", function() {
        it("returns a Chalk instance", function() {
          assert.equal(getChalk({}).constructor, chalk.constructor);
        });
      });

      describe("when forceColor is passed", function() {
        it("returns a Chalk instance", function() {
          assert.equal(
            getChalk({ forceColor: true }).constructor,
            chalk.constructor,
          );
        });
      });
    });

    describe("when colors are supported", function() {
      stubColorSupport(true);

      describe("when forceColor is not passed", function() {
        it("returns a Chalk instance", function() {
          assert.equal(getChalk({}).constructor, chalk.constructor);
        });
      });

      describe("when forceColor is passed", function() {
        it("returns a Chalk instance", function() {
          assert.equal(
            getChalk({ forceColor: true }).constructor,
            chalk.constructor,
          );
        });
      });
    });
  });
});
