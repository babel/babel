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
      }, "Unknown export 'b' imported");
    });

    it("throws when importing renamed unknown name", function () {
      assert.throws(function () {
        runner.transformAndRun("import { b as a } from 'a'");
      }, "Unknown export 'b' imported");
    });

    it("throws when using unknown name from namespace", function () {
      assert.throws(function () {
        runner.transformAndRun("import * as b from 'b'\nb.a");
      }, "Unknown export 'a' imported");
    });

    it("throws when using multiple unknown names", function () {
      assert.throws(function () {
        runner.transformAndRun("import { a, b, c, d } from 'a'");
      }, "Unknown exports 'b', 'c', 'd' imported");
    });

    it("throws when using default export of module without default export", function () {
      assert.throws(function () {
        runner.transformAndRun("import a from 'a'");
      }, "Unknown export 'default' imported");
    });

    it("throws when namespace and name imports are combined", function () {
      assert.throws(function () {
        runner.transformAndRun("import * as a, { b } from 'a'\na.c");
      }, "Unknown exports 'b', 'c' imported");
    });

    it("does not throw when only known imports are used", function () {
      runner.transformAndRun("import * as a from 'a'\nimport { b } from 'b'\na.a");
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
