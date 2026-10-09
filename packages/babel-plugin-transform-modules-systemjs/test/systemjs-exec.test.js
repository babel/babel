import { readFileSync } from "node:fs";
import {
  runCodeInTestContext,
  createTestContext,
} from "@babel/helper-transform-fixture-test-runner";

describe("systemjs exec", function () {
  // https://github.com/babel/babel/issues/16219
  it("should requeue helpers", function () {
    const filename = new URL(
      "./fixtures/preset-env/requeue-helpers/output.js",
      import.meta.url,
    );
    const content = readFileSync(filename, "utf8");

    let res;

    const context = createTestContext();
    context.System = {
      register: function (_, module) {
        res = module().execute();
      },
    };

    runCodeInTestContext(content, { filename }, context);

    expect(res).toBe("ok");
  });
});
