import Benchmark from "benchmark";
import baseline from "../../lib/index-v2.js";
import current from "../../lib/index.js";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return "/x/dgimsuy;".repeat(length);
}
function benchCases(name, implementation, options) {
  for (const length of [256, 512, 1024, 2048]) {
    const input = createInput(length);
    suite.add(`${name} ${length} small regexp literal with all flags`, () => {
      implementation.parse(input, options);
    });
  }
}

benchCases("baseline", baseline);
benchCases("current", current);

suite.on("cycle", report).run();
