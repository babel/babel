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
    });
  });

  it("does not throw when not shadowed but is SameValue", function () {
    runner.transformAndRun("export * from 'aSame'\nexport * from 'bSame'");
  });

  it("does not throw when shadowed even if it is not SameValue", function () {
    runner.transformAndRun("export * from 'a'\nexport * from 'b'\nexport const name = {}");
  });
});
