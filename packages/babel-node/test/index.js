import path from "path";
import { writeFileSync } from "fs";
import { commonJS } from "$repo-utils";
import { buildProcessTests } from "@babel/helper-transform-fixture-test-runner";

const { require, __dirname } = commonJS(import.meta.url);

const fixtureLoc = path.join(__dirname, "fixtures");
const binLoc = path.join(__dirname, "../lib/babel-node");

const tests = buildProcessTests(fixtureLoc, function (test, tmpDir) {
  test.binLoc = binLoc;
  test.opts.env = { ...test.opts.env, BABEL_DISABLE_CACHE: true };
  if (test.testName === "require") {
    writeFileSync(
      path.join(tmpDir, ".babelrc"),
      JSON.stringify({
        presets: [
          require.resolve("@babel/preset-env"),
          [require.resolve("@babel/preset-react"), { runtime: "classic" }],
        ],
      }),
    );
  }
  if (!test.opts.inFiles["package.json"]) {
    test.opts.inFiles["package.json"] = `{ "type": "commonjs" }`;
    writeFileSync(path.join(tmpDir, "package.json"), `{ "type": "commonjs" }`);
  }
});

describe("bin/babel-node", function () {
  for (const test of tests) {
    (test.skip ? it.skip : it)(test.suiteName + " " + test.testName, test.fn);
  }
});
