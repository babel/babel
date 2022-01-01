import Benchmark from "benchmark";
import baseline from "@babel-baseline/parser";
import current from "@babel/parser";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return "// c\n".repeat(length) + "{}";
}
current.parse(createInput(256), {});
function benchCases(name, implementation, options) {
  for (const length of [128, 256, 512, 1024]) {
    const input = createInput(length);
    const { parse } = implementation;
    suite.add(`${name} ${length} leading comments`, () => {
      parse(input, options);
    });
  }
}

benchCases("baseline", baseline);
benchCases("current", current);

suite.on("cycle", report).run();
