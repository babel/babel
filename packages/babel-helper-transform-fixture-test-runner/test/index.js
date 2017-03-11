import assert from "assert";
import { runCodeInTestContext } from "..";

describe("helper-transform-fixture-test-runner", function() {
  it("should not execute code in Node's global context", function() {
    try {
      global.foo = "outer";
      runCodeInTestContext(`
        assert.equal(global.foo, undefined);
        global.foo = "inner";
      `);

      assert.equal(global.foo, "outer");
      runCodeInTestContext(`
        assert.equal(global.foo, "inner");
      `);
    } finally {
      delete global.foo;
      runCodeInTestContext(`
        delete global.foo;
      `);
    }
  });
});
