import Benchmark from "benchmark";
import baseline from "@babel-baseline/parser";
import current from "@babel/parser";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return "<t a={x}>{y}".repeat(length) + "</t>".repeat(length);
}
function benchCases(name, implementation, options) {
  for (const length of [128, 256, 512, 1024]) {
    const input = createInput(length);
    suite.add(
      `${name} ${length} nested jsx elements with one attribute and text`,
      () => {
        implementation.parse(input, options);
      }
    );
  }
}

benchCases("baseline", baseline, { plugins: ["jsx"] });
benchCases("current", current, { plugins: ["jsx"] });

suite.on("cycle", report).run();
