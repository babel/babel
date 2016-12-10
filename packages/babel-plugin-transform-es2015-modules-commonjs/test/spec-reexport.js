"use strict";

const assert = require("assert");
const helpers = require("./spec-test-helpers");

describe("spec star reexport", function () {
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

  describe("SameValue duplicate reexport", function () {
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
