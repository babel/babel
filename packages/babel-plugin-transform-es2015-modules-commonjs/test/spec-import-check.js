"use strict";

const assert = require("assert");
const helpers = require("./spec-test-helpers");

describe("spec import", function () {
  const runner = new helpers.Runner({
    a: "export const a = 'a'",
    b: "export const b = 'b'"
  });
  runner.addToCache("cjs", { module: { exports: { cjs: true } } });

  describe("error checking", function () {
    it("throws when directly importing unknown name", function () {
      assert.throws(function () {
        runner.transformAndRun("import { b } from 'a'");
      }, /Unknown export \["b"] imported$/);
    });

    it("throws when importing renamed unknown name", function () {
      assert.throws(function () {
        runner.transformAndRun("import { b as a } from 'a'");
      }, /Unknown export \["b"] imported$/);
    });

    it("throws when using unknown name from namespace", function () {
      assert.throws(function () {
        runner.transformAndRun("import * as b from 'b'\nb.a");
      }, /Unknown export \["a"] imported$/);
    });

    it("throws when using multiple unknown names", function () {
      assert.throws(function () {
        runner.transformAndRun("import { a, b, c, d } from 'a'");
      }, /Unknown exports \["b","c","d"] imported$/);
    });

    it("throws when using default export of module without default export", function () {
      assert.throws(function () {
        runner.transformAndRun("import a from 'a'");
      }, /Unknown export \["default"] imported$/);
    });

    it("throws when namespace and name imports are combined", function () {
      assert.throws(function () {
        runner.transformAndRun("import * as a from 'a'\nimport { b } from 'a'\na.c");
      }, /Unknown exports \["b","c"] imported$/);
    });

    it("throws when attempting to import __esModule", function () {
      // This one unfortunately won't work with { spec: false, specImport: true, loose: true } :cry:
      assert.throws(function () {
        runner.transformAndRun("import { __esModule } from 'b'");
      }, /Unknown export \["__esModule"] imported$/);
    });

    it("throws when using indexed access with constant string", function () {
      assert.throws(function () {
        runner.transformAndRun("import * as a from 'a'; a['b']");
      }, /Unknown export \["b"] imported$/);
    });

    it("throws when using indexed access with null", function () {
      assert.throws(function () {
        runner.transformAndRun("import * as a from 'a'; a[null]");
      }, /Unknown export null imported$/);
    });

    it("throws when using indexed access with variable", function () {
      assert.throws(function () {
        exports = runner.transformAndRun("import * as a from 'a'; const name = 'b'; a[name]");
      }, /Unknown export "b" imported$/);
    });

    it("throws when accessing unknown import when aliased", function () {
      this.skip("would require a Proxy-based implementation to work");

      assert.throws(function () {
        runner.transformAndRun("import * as a from 'a'; function get (ns, key) { return ns[key]; }; get(a, 'b')");
      }, /Unknown export "b" imported$/);
    });

    it("does not throw when only known imports are used", function () {
      runner.transformAndRun("import * as a from 'a'\nimport { b } from 'b'\na.a");
    });

    describe("with variable", function () {
      before(function () {
        runner.addModule("variable", "import * as a from 'a'\nconst name = 'a'\nexport const simple = a[name]\nexport const recursive = a[a[name]]");

        it("does not throw", function () {
          runner.getExportsOf("variable");
        });
      });

      describe("has the correct result", function () {
        let exports;

        before(function () {
          exports = runner.getExportsOf("variable");
        });

        it("simple", function () {
          assert.strictEqual(exports.simple, "a");
        });

        it("recursive", function () {
          assert.strictEqual(exports.recursive, "a");
        });
      });
    });

    describe("with Symbol", function () {
      before(function () {
        runner.addModule("symbol", "import * as a from 'a'\nexport default a[Symbol.toStringTag]");

        if (!helpers.hasToStringTag()) {
          this.skip();
        }
      });

      it("does not throw", function () {
        runner.getExportsOf("symbol");
      });

      it("has the correct result", function () {
        const exports = runner.getExportsOf("symbol");
        assert.strictEqual(exports.default, "Module");
      });

      it("does not throw with unknown symbols either", function () {
        runner.transformAndRun("import * as a from 'a'\na[Symbol('foo')]");
      });
    });
  });

  describe("error checking with commonjs", function () {
    it("throws when any name other than default is used", function () {
      assert.throws(function () {
        runner.transformAndRun("import { cjs } from 'cjs'");
      }, "Unknown export 'cjs' imported");
    });

    it("does not throw when default import of commonjs module is used", function () {
      runner.transformAndRun("import cjs from 'cjs'");
    });

    it("does not throw when only default is used from namespace import of commonjs module", function () {
      runner.transformAndRun("import * as ns from 'cjs'\nns.default");
    });
  });
});
