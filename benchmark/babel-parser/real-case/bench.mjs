import Benchmark from "benchmark";
import baseline from "@babel-baseline/parser";
import current from "@babel/parser";
import { report } from "../../util.mjs";
import { readFileSync } from "node:fs";

const suite = new Benchmark.Suite();

function createInput(length) {
  return readFileSync(new URL("./jquery-3.6.txt", import.meta.url), {
    encoding: "utf-8",
  }).repeat(length);
}

const inputs = [4].map(length => ({
  tag: length,
  body: createInput(length),
}));

function benchCases(name, implementation, options) {
  for (const input of inputs) {
    suite.add(`${name} ${input.tag} jquery 3.6`, () => {
      implementation(input.body, options);
    });
  }
}

benchCases("current", current.parse);
benchCases("baseline", baseline.parse);
benchCases("current", current.parse);
benchCases("baseline", baseline.parse);

suite.on("cycle", report).run();
