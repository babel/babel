import runner from "@babel/helper-plugin-test-runner";
import { readFileSync } from "fs";
import { commonJS } from "$repo-utils";
import path from "path";
import {
  runCodeInTestContext,
  createTestContext,
} from "@babel/helper-transform-fixture-test-runner";

const { __dirname } = commonJS(import.meta.url);

runner(import.meta.url);

describe("systemjs exec", function () {
  // https://github.com/babel/babel/issues/16219
  it("should requeue helpers", function () {
    const filename = path.join(
      __dirname,
      "fixtures/preset-env/requeue-helpers/output.js",
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
