"use strict";

const assert = require("assert");
const helpers = require("./spec-test-helpers");

describe("spec reexport", function () {
  const runner = new helpers.Runner({
    a: "export const a = 'a'",
    b: "export const b = 'b'",
    ab: "export { a } from 'a'\nexport { b } from 'b'",
    ns: "import * as ab from 'ab'\nexport { ab }",
    star: "export * from 'ab'\nexport * from 'ns'"
  });

  describe("individual reexports", function () {
    const exports = runner.getExportsOf("ab");

    it("is frozen", function () {
      assert(Object.isFrozen(exports));
    });

    it("has a null prototype", function () {
      assert.strictEqual(Object.getPrototypeOf(exports), null);
    });

    it("is tagged as Module", function () {
      if (helpers.hasToStringTag()) {
        assert.strictEqual(exports[Symbol.toStringTag], "Module");
      } else {
        this.skip();
      }
    });

    it("has the __esModule flag", function () {
      assert.deepEqual(
        Object.getOwnPropertyDescriptor(exports, "__esModule"),
        { value: true, configurable: false, writable: false, enumerable: false }
      );
    });

    it("has no exports other than 'a' and 'b'", function () {
      const keys = Object.keys(exports);
      assert.strictEqual(keys.length, 2);
      assert(keys.indexOf("a") >= 0);
      assert(keys.indexOf("b") >= 0);
    });

    it("has the correct values", function () {
      assert.strictEqual(exports.a, "a");
      assert.strictEqual(exports.b, "b");
    });
  });

  describe("namespace reexport", function () {
    const exports = runner.getExportsOf("ns");

    it("the reexport is frozen", function () {
      assert(Object.isFrozen(exports.ab));
    });

    it("the reexport has a null prototype", function () {
      assert.strictEqual(Object.getPrototypeOf(exports.ab), null);
    });

    it("the reexport is tagged as Module", function () {
      if (helpers.hasToStringTag()) {
        assert.strictEqual(exports.ab[Symbol.toStringTag], "Module");
      } else {
        this.skip();
      }
    });

    it("the reexport has the __esModule flag", function () {
      assert.deepEqual(
        Object.getOwnPropertyDescriptor(exports.ab, "__esModule"),
        { value: true, configurable: false, writable: false, enumerable: false }
      );
    });

    it("the reexport has the correct values", function () {
      assert.strictEqual(exports.ab.a, "a");
      assert.strictEqual(exports.ab.b, "b");
    });
  });

  describe("star reexport", function () {
    const exports = runner.getExportsOf("star");


    it("is frozen", function () {
      assert(Object.isFrozen(exports));
    });

    it("has a null prototype", function () {
      assert.strictEqual(Object.getPrototypeOf(exports), null);
    });

    it("is tagged as Module", function () {
      if (helpers.hasToStringTag()) {
        assert.strictEqual(exports[Symbol.toStringTag], "Module");
      } else {
        this.skip();
      }
    });

    it("has the __esModule flag", function () {
      assert.deepEqual(
        Object.getOwnPropertyDescriptor(exports, "__esModule"),
        { value: true, configurable: false, writable: false, enumerable: false }
      );
    });

    it("has no exports other than 'a', 'b' and 'ab'", function () {
      const keys = Object.keys(exports);
      assert.strictEqual(keys.length, 3);
      assert(keys.indexOf("a") >= 0);
      assert(keys.indexOf("b") >= 0);
      assert(keys.indexOf("ab") >= 0);
    });

    it("has the correct values", function () {
      assert.strictEqual(exports.a, "a");
      assert.strictEqual(exports.b, "b");
      assert.strictEqual(exports.ab, runner.getExportsOf("ab"));
    });
  });
});

describe("spec reexport star with duplicates", function () {
  const runner = new helpers.Runner({
    a: "export const name = {key: 'value'}",
    b: "export const name = {key: 'value'}",
    aSame: "export const name = 'name'",
    bSame: "export const name = 'name'"
  });

  it("throws when not shadowed and duplicate is not SameValue", function () {
    assert.throws(function () {
      runner.transformAndRun("export * from 'a'\nexport * from 'b'");
    }, "Cannot redefine property: name");
  });

  describe("SameValue", function () {
    const exports = runner.transformAndRun("export * from 'aSame'\nexport * from 'bSame'");

    it("has the correct value", function () {
      assert.strictEqual(exports.name, "name");
    });
  });

  describe("shadowed reexport", function () {
    const exports = runner.transformAndRun("export * from 'a'\nexport * from 'b'\nexport const name = 'foo'");

    it("has the correct value", function () {
      assert.strictEqual(exports.name, "foo");
    });
  });
});
