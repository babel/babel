const assert = require("assert");
const helpers = require("./spec-test-helpers");

test("spec Interop import", function () {
  const runner = new helpers.Runner();

  const fakeMod = { "fakeFs": true };
  runner.addToCache("fs", { module: { exports: fakeMod } });

  const exports = runner.transformAndRun(
    "import * as ns from 'fs'\nimport fs from 'fs'\nexport { fs, ns }\n"
  );

  assert(Object.isFrozen(exports), "exports is frozen");
  assert.strictEqual(Object.getPrototypeOf(exports), null, "exports has null prototype");

  if (helpers.hasToStringTag()) {
    assert.strictEqual(exports[Symbol.toStringTag], "Module", "exports is tagged as Module");
  } else {
    it.skip("exports is tagged as Module");
  }

  assert.deepEqual(
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

  assert.deepEqual(
    Object.getOwnPropertyDescriptor(ns, "__esModule"),
    { value: true, configurable: false, writable: false, enumerable: false },
    "__esModule in the imported ns Module"
  );

  assert(Object.isFrozen(ns), "ns export is frozen");
  assert.strictEqual(Object.getPrototypeOf(ns), null, "ns export has null prototype");

  if (helpers.hasToStringTag()) {
    assert.strictEqual(ns[Symbol.toStringTag], "Module", "ns export is tagged as Module");
  } else {
    it.skip("ns export is tagged as Module");
  }

  const imported = Object.getOwnPropertyNames(ns).filter(function (name) { return name !== "__esModule"; });

  assert.deepEqual(imported, [ "default" ], "No exports other than 'default' in ns Module");

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
