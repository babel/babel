import runner from "@babel/helper-plugin-test-runner";
import { readFileSync } from "fs";
import { commonJS } from "$repo-utils";
import path from "path";

const { __dirname, require } = commonJS(import.meta.url);

runner(import.meta.url);

describe("systemjs exec", function () {
  // https://github.com/babel/babel/issues/16219
  it("should requeue helpers", function () {
    const content = readFileSync(
      path.join(__dirname, "fixtures/preset-env/requeue-helpers/output.js"),
      "utf8",
    );
    let ret;

    const System = {
      register: function (_, module) {
        ret = module().execute();
      },
    };

    eval((require, System, content));

    expect(ret).toBe("done");
  });
});
