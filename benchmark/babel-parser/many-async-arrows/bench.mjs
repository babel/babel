import Benchmark from "benchmark";
import baseline from "@babel-baseline/parser";
import current from "@babel/parser";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return "async () => {};".repeat(length);
}
function benchCases(name, implementation, options) {
  for (const length of [256, 512, 1024, 2048]) {
    const input = createInput(length);
    suite.add(`${name} ${length} async arrow functions`, () => {
      implementation.parse(input, options);
    });
  }
}

benchCases("baseline", baseline);
benchCases("current", current);

suite.on("cycle", report).run();
