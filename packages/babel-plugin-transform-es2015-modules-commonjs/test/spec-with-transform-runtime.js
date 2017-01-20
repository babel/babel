"use strict";

const path = require("path");
const assert = require("assert");
const helpers = require("./spec-test-helpers");

describe("spec with transform runtime", function () {
  const runner = new helpers.Runner({
    a: "export default 'a'",
    b: "export const b = 'b'",
    ab: "export { default as a } from 'a'\nexport { b } from 'b'",
    star: "export * from 'a'\nexport * from 'b'"
  });
  runner.babelConfig.plugins.push(require("../../babel-plugin-transform-runtime"));
  runner.fallbackRequire = function req(id) {
    if (id.startsWith("babel-runtime")) {
      id = path.resolve(__dirname, "../../", id);
    }
    return require(id);
  };

  it("throws without fallbackRequire", function () {
    const fallback = runner.fallbackRequire;
    try {
      runner.fallbackRequire = null;
      assert.throws(function () {
        runner.getExportsOf("a");
      }, /: Unmocked module.*\bbabel-runtime\b/);
    } finally {
      runner.fallbackRequire = fallback;
    }
  });

  it("has correct default exports", function () {
    assert.strictEqual(runner.getExportsOf("a").default, "a");
  });

  it("has correct named exports", function () {
    assert.strictEqual(runner.getExportsOf("b").b, "b");
  });

  it("has correct named reexports", function () {
    const exports = runner.getExportsOf("ab");
    assert.strictEqual(exports.a, "a");
    assert.strictEqual(exports.b, "b");
  });

  it("has correct star reexports", function () {
    const exports = runner.getExportsOf("star");

    assert.deepEqual(Object.keys(exports), [ "b" ]);
    assert.strictEqual(exports.b, "b");
  });
});
