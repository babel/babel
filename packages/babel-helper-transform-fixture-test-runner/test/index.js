import { runCodeInTestContext } from "../lib/index.js";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);

describe("helper-transform-fixture-test-runner", function () {
  it("should not execute code in Node's global context", function () {
    try {
      global.foo = "outer";
      runCodeInTestContext(
        `
          expect(global.foo).toBeUndefined();
          global.foo = "inner";
        `,
        {
          filename: `${filename}.fake1`,
        },
      );

      expect(global.foo).toBe("outer");
      runCodeInTestContext(
        `
          expect(global.foo).toBe("inner");
        `,
        {
          filename: `${filename}.fake2`,
        },
      );
    } finally {
      delete global.foo;
      runCodeInTestContext(
        `
          delete global.foo;
        `,
        {
          filename: `${filename}.fake3`,
        },
      );
    }
  });
  it("should print correct trace position when error is thrown in the first line", () => {
    const opts = {
      filename: `${filename}.fake4`,
    };
    runCodeInTestContext(
      `try { throw new Error() } catch (e) {
          opts.stack = e.stack
        }
      `,
      opts,
    );
    expect(opts.stack).toContain(opts.filename + ":1:13");
  });
});
