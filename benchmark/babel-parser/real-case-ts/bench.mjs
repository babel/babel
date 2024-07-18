import { copyFileSync, readFileSync, rmSync } from "fs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { commonJS } from "$repo-utils";
import { Benchmark } from "../../util.mjs";

const { require } = commonJS(import.meta.url);

const benchmark = new Benchmark();

function createInput(length) {
  return readFileSync(new URL("ts-parser.txt", import.meta.url), {
    encoding: "utf-8",
  }).repeat(length);
}

const inputs = [1].map(length => ({
  tag: length,
  body: createInput(length),
}));

function benchCases(name, implementation, options) {
  for (const input of inputs) {
    benchmark.add(`${name} ${input.tag} typescript parser.ts`, () => {
      implementation(input.body, {
        sourceType: "module",
        plugins: ["typescript"],
        ...options,
      });
    });
  }
}
copyFileSync(
  require.resolve("@babel-baseline/parser"),
  "./parser-baseline.cjs"
);
copyFileSync(
  "../../../packages/babel-parser/lib/index.js",
  "./parser-current.cjs"
);

const baseline = require("./parser-baseline.cjs");
const current = require("./parser-current.cjs");

benchCases("current", current.parse);
benchCases("baseline", baseline.parse);
benchCases("current", current.parse);
benchCases("baseline", baseline.parse);

benchmark.suite.on("complete", () => {
  rmSync("./parser-current.cjs");
  rmSync("./parser-baseline.cjs");
});
benchmark.run();
