const assert = require("assert");
const babel = require("../../babel-core");
const vm = require("vm");

test("spec Interop import", function () {
  const src = "import * as ns from 'fs'\nimport fs from 'fs'\nexport { fs, ns }\n";

  const fakeMod = { "fakeFs": true };
  const context = {
    module: {
      exports: {}
    },
    require: function (id) {
      if (id === "fs") return fakeMod;
      throw new Error("Unmocked module " + id + " required");
    }
  };
  context.exports = context.module.exports;

  const code = babel.transform(src, {
    "plugins": [
      [require("../"), {spec: true}],
    ],
    "ast": false,
  }).code;

  vm.runInNewContext(code, context);

  const exports = context.module.exports;

  assert(Object.isFrozen(exports), "exports is frozen");
  assert.strictEqual(Object.getPrototypeOf(exports), null, "exports has null prototype");

  if (typeof Symbol === "function" && Symbol.toStringTag) {
    assert.strictEqual(exports[Symbol.toStringTag], "Module", "exports is tagged as Module");
  }

  assert.deepStrictEqual(
    Object.getOwnPropertyDescriptor(exports, "__esModule"),
    { value: true, configurable: false, writable: false, enumerable: false },
    "__esModule in top level Module"
  );

  const nsDesc = Object.getOwnPropertyDescriptor(exports, "ns");

  assert(nsDesc.enumerable, "ns export is enumerable");
  // This should be the actual observable behavior, but freezing the export
  // makes this change to false.
  // // assert(nsDesc.writable, "ns export is writable");
  assert(!nsDesc.writable, "ns export happens to not be writable");
  assert(!nsDesc.configurable,"ns export is not configurable");

  const fsDesc = Object.getOwnPropertyDescriptor(exports, "fs");

  assert(fsDesc.enumerable, "fs export is enumerable");
  // fsDesc.writable cannot be true like the spec asks because...
  // // assert.strictEqual(fsDesc.writable, true);
  // ...fsDesc.get must be provided (and be a function)
  assert.strictEqual(typeof fsDesc.get, "function", "fs export is a getter");
  assert(!fsDesc.configurable, "fs export is not configurable");

  const ns = exports.ns;

  assert.deepStrictEqual(
    Object.getOwnPropertyDescriptor(ns, "__esModule"),
    { value: true, configurable: false, writable: false, enumerable: false },
    "__esModule in the imported ns Module"
  );

  assert(Object.isFrozen(ns), "ns export is frozen");
  assert.strictEqual(Object.getPrototypeOf(ns), null, "ns export has null prototype");

  if (typeof Symbol === "function" && Symbol.toStringTag) {
    assert.strictEqual(ns[Symbol.toStringTag], "Module", "ns export is tagged as Module");
  }

  const imported = Object.getOwnPropertyNames(ns).filter(function (name) { return name !== "__esModule"; });

  assert.deepStrictEqual(imported, [ "default" ], "No exports other than 'default' in ns Module");

  const defaultDesc = Object.getOwnPropertyDescriptor(ns, "default");

  assert.strictEqual(defaultDesc.enumerable, true, "ns.default export is enumerable");
  // This is also not writable for the same reason nsDesc.writable was false
  // // assert.strictEqual(defaultDesc.writable, true, "ns.default export is writable");
  assert.strictEqual(defaultDesc.writable, false, "ns export happens to not be writable");
  assert.strictEqual(defaultDesc.configurable, false, "ns.default export is configurable");
  assert.strictEqual("value" in defaultDesc, true, "ns.default export has a value");

  assert(!("__esModule" in ns.default), "ns.default export is not a Module");
  assert.strictEqual(ns.default, fakeMod, "ns.default export is the commonjs namespace");
  assert.strictEqual(exports.fs, fakeMod, "fs reexport is the commonjs namespace");
});
