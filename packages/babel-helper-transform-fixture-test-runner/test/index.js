import { runCodeInTestContext } from "../lib/index.js";
import runner from "@babel/helper-plugin-test-runner";
import { fileURLToPath } from "node:url";

runner(import.meta.url);

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
    let err;
    try {
      runCodeInTestContext(`throw new Error()`, opts);
    } catch (error) {
      err = error;
    }
    expect(err.stack).toContain(opts.filename + ":1:7");
  });

  it("should stop when infinite loop", () => {
    expect(() => {
      runCodeInTestContext(`while (true) {}`, {
        filename: `${filename}.fake5`,
        timeout: 500,
      });
    }).toThrow("Script execution timed out");
  });
});
