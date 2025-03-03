import Benchmark from "benchmark";
import { baselineParser, currentParser, report } from "../../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return "(" + "x ?".repeat(length) + "0" + ": x".repeat(length) + ");";
}
function benchCases(name, implementation, options) {
  for (const length of [256, 512, 1024, 2048]) {
    const input = createInput(length);
    suite.add(`${name} ${length} nested conditional expressions`, () => {
      implementation.parse(input, options);
    });
  }
}

benchCases("baseline", baselineParser);
benchCases("current", currentParser);

suite.on("cycle", report).run();
