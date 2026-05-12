import { loadPartialConfigSync } from "../lib/index.js";
import path from "node:path";
import { commonJS } from "$repo-utils";

const { __dirname, require } = commonJS(import.meta.url);

// Changes from https://github.com/TypeStrong/ts-node/blob/ddb05ef23be92a90c3ecac5a0220435c65ebbd2a/src/test/helpers/reset-node-environment.ts
// - Removed type annotations
// - Replaced lodash imports with native implementations
// import { has, mapValues, sortBy } from 'lodash';

const has = Object.hasOwn;
const mapValues = (obj, callback) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, callback(value, key, obj)]),
  );
const sortBy = (array, callback) =>
  array.toSorted((a, b) => Math.sign(callback(a) - callback(b)));

// Reset node environment
// Useful because ts-node installation necessarily must mutate the node environment.
// Yet we want to run tests in-process for speed.
// So we need to reliably reset everything changed by ts-node installation.

const defaultRequireExtensions = captureObjectState(require.extensions);
// Avoid node deprecation warning for accessing _channel
const defaultProcess = captureObjectState(process, ["_channel"]);
const defaultModule = captureObjectState(require("node:module"));
const defaultError = captureObjectState(Error);
const defaultGlobal = captureObjectState(global);

/**
 * Undo all of ts-node & co's installed hooks, resetting the node environment to default
 * so we can run multiple test cases which `.register()` ts-node.
 *
 * Must also play nice with `nyc`'s environmental mutations.
 */
function resetNodeEnvironment() {
  const sms = require("@cspotcode/source-map-support");
  // We must uninstall so that it resets its internal state; otherwise it won't know it needs to reinstall in the next test.
  sms.uninstall();
  // Must remove handlers to avoid a memory leak
  sms.resetRetrieveHandlers();

  // Modified by ts-node hooks
  resetObject(
    require.extensions,
    defaultRequireExtensions,
    undefined,
    undefined,
    undefined,
    true,
  );

  // ts-node attaches a property when it registers an instance
  // source-map-support monkey-patches the emit function
  // Avoid node deprecation warnings for setting process.config or accessing _channel
  resetObject(process, defaultProcess, undefined, ["_channel"], ["config"]);

  // source-map-support swaps out the prepareStackTrace function
  resetObject(Error, defaultError);

  // _resolveFilename et.al. are modified by ts-node, tsconfig-paths, source-map-support, yarn, maybe other things?
  resetObject(require("node:module"), defaultModule, undefined, [
    "wrap",
    "wrapper",
  ]);

  // May be modified by REPL tests, since the REPL sets globals.
  // Avoid deleting nyc's coverage data.
  resetObject(global, defaultGlobal, ["__coverage__"]);

  // Reset our ESM hooks
  process.__test_setloader__?.(undefined);
}

function captureObjectState(object, avoidGetters = []) {
  const descriptors = Object.getOwnPropertyDescriptors(object);
  const values = mapValues(descriptors, (_d, key) => {
    if (avoidGetters.includes(key)) return descriptors[key].value;
    return object[key];
  });
  return {
    descriptors,
    values,
  };
}
// Redefine all property descriptors and delete any new properties
function resetObject(
  object,
  state,
  doNotDeleteTheseKeys = [],
  doNotSetTheseKeys = [],
  avoidSetterIfUnchanged = [],
  reorderProperties = false,
) {
  const currentDescriptors = Object.getOwnPropertyDescriptors(object);
  for (const key of Object.keys(currentDescriptors)) {
    if (doNotDeleteTheseKeys.includes(key)) continue;
    if (has(state.descriptors, key)) continue;
    delete object[key];
  }
  // Trigger nyc's setter functions
  for (const [key, value] of Object.entries(state.values)) {
    try {
      if (doNotSetTheseKeys === true || doNotSetTheseKeys.includes(key))
        continue;
      if (avoidSetterIfUnchanged.includes(key) && object[key] === value)
        continue;
      state.descriptors[key].set?.call(object, value);
    } catch {}
  }
  // Reset descriptors
  Object.defineProperties(object, state.descriptors);

  if (reorderProperties) {
    // Delete and re-define each property so that they are in original order
    const originalOrder = Object.keys(state.descriptors);
    const properties = Object.getOwnPropertyDescriptors(object);
    const sortedKeys = sortBy(Object.keys(properties), name =>
      originalOrder.includes(name) ? originalOrder.indexOf(name) : 999,
    );
    for (const key of sortedKeys) {
      delete object[key];
      Object.defineProperty(object, key, properties[key]);
    }
  }
}

// #END https://github.com/TypeStrong/ts-node/blob/ddb05ef23be92a90c3ecac5a0220435c65ebbd2a/src/test/helpers/reset-node-environment.ts

// The integration tests should not be mixed with other tests because the `register` function
// will affect node's built-in ts support.
describe("@babel/core config ts-node integration", () => {
  let service;
  beforeAll(() => {
    service = require("ts-node").register({
      experimentalResolver: true,
      compilerOptions: {
        module: "CommonJS",
      },
    });
    service.enabled(true);
  });
  afterAll(() => {
    service.enabled(false);
    resetNodeEnvironment();
  });
  it("should work with ts-node", async () => {
    require(
      path.join(
        __dirname,
        "fixtures/config-ts/simple-cts-with-ts-node/babel.config.cts",
      ),
    );

    const config = loadPartialConfigSync({
      configFile: path.join(
        __dirname,
        "fixtures/config-ts/simple-cts-with-ts-node/babel.config.cts",
      ),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });
});
