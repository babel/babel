import { runCodeInTestContext } from "..";

describe("helper-transform-fixture-test-runner", function() {
  it("should not execute code in Node's global context", function() {
    try {
      global.foo = "outer";
      runCodeInTestContext(
        `
          expect(global.foo).toBeUndefined();
          global.foo = "inner";
        `,
        {
          filename: `${__filename}.fake1`,
        },
      );

      expect(global.foo).toBe("outer");
      runCodeInTestContext(
        `
          expect(global.foo).toBe("inner");
        `,
        {
          filename: `${__filename}.fake2`,
        },
      );
    } finally {
      delete global.foo;
      runCodeInTestContext(
        `
          delete global.foo;
        `,
        {
          filename: `${__filename}.fake3`,
        },
      );
    }
  });
});
