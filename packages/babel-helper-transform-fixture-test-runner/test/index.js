import { runCodeInTestContext } from "..";

describe("helper-transform-fixture-test-runner", function() {
  it("should not execute code in Node's global context", function() {
    try {
      global.foo = "outer";
      runCodeInTestContext(`
        expect(global.foo).toBeUndefined();
        global.foo = "inner";
      `);

      expect(global.foo).toBe("outer");
      runCodeInTestContext(`
        expect(global.foo).toBe("inner");
      `);
    } finally {
      delete global.foo;
      runCodeInTestContext(`
        delete global.foo;
      `);
    }
  });
});
