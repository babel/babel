import Benchmark from "benchmark";
import baseline from "@babel-baseline/traverse";
import current from "@babel/traverse";
import parser from "@babel-baseline/parser";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();
function createInput(length) {
  return parser.parse(";".repeat(length));
}
function benchCases(name, implementation, options) {
  for (const length of [256, 512, 1024, 2048]) {
    const input = createInput(length);
    suite.add(`${name} ${length} empty statements`, () => {
      implementation(input, options);
    });
  }
}

benchCases("baseline", baseline.default, {
  enter() {},
});
benchCases("baseline mutating context", baseline.default, {
  enter(path) {
    path.context = undefined;
  },
});
benchCases("current", current.default, {
  enter() {},
});
benchCases("current mutating context", current.default, {
  enter(path) {
    path.context = undefined;
  },
});

suite.on("cycle", report).run();
