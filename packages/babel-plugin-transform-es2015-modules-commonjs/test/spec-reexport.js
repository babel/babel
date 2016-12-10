"use strict";

const assert = require("assert");
const babel = require("../../babel-core");
const vm = require("vm");

describe("spec star reexport", function () {
  const modules = {
    a: "export const name = {key: 'value'}",
    b: "export const name = {key: 'value'}",
    aSame: "export const name = 'name'",
    bSame: "export const name = 'name'"
  };

  const cached = {};

  function makeContext () {
    const context = { module: { exports: {} }, require: contextRequire };
    context.exports = context.module.exports;
    return context;
  }

  function transformAndRunInNewContext (code, context) {
    if (typeof context === "undefined") {
      context = makeContext();
    }

    code = babel.transform(code, {
      "plugins": [
        [require("../"), {spec: true}],
      ],
      "ast": false,
    }).code;
    vm.runInNewContext(code, context);

    return context.module.exports;
  }

  function contextRequire (id) {
    if (id in modules) {
      if (!cached[id]) {
        cached[id] = makeContext();
        transformAndRunInNewContext(modules[id], cached[id]);
      }
      return cached[id].module.exports;
    }
    throw new Error("Unmocked module " + id + " required");
  }

  it("throws when not shadowed and duplicate is not SameValue", function () {
    assert.throws(function () {
      transformAndRunInNewContext("export * from 'a'\nexport * from 'b'");
    });
  });

  it("does not throw when not shadowed but is SameValue", function () {
    transformAndRunInNewContext("export * from 'aSame'\nexport * from 'bSame'");
  });

  it("does not throw when shadowed even if it is not SameValue", function () {
    transformAndRunInNewContext("export * from 'a'\nexport * from 'b'\nexport const name = {}");
  });
});
