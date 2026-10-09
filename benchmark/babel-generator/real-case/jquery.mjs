import Benchmark from "benchmark";
import {
  baselineParser,
  baselineGenerator,
  currentGenerator,
} from "../../util.mjs";
import { report } from "../../util.mjs";
import { readFileSync } from "node:fs";

const suite = new Benchmark.Suite();

function createInput(length) {
  return baselineParser.parse(
    readFileSync(new URL("./jquery-3.6.txt", import.meta.url), {
      encoding: "utf-8",
    }).repeat(length)
  );
}

const inputs = [1, 4, 16, 64].map(length => ({
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

benchCases("current", currentGenerator.default);
benchCases("baseline", baselineGenerator.default.default);

suite.on("cycle", report).run();
