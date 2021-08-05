import Benchmark from "benchmark";
import baseline from "../../lib/index-main.js";
import current from "@babel/parser";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return "abcde12345z;".repeat(length);
}
current.parse("a");
function benchCases(name, implementation, options) {
  for (const length of [64, 128, 256, 512]) {
    const input = createInput(length);
    suite.add(`${name} ${length} length-11 identifiers`, () => {
      implementation.parse(input, options);
    });
  }
}

benchCases("baseline", baseline);
benchCases("current", current);

suite.on("cycle", report).run();
