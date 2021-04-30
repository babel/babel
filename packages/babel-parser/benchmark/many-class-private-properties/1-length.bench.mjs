import Benchmark from "benchmark";
import baseline from "@babel-baseline/parser";
import current from "../../lib/index.js";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();
// All codepoints in [0x4e00, 0x9ffc] is valid identifier name
function createInput(length) {
  if (length > 0x9ffc - 0x4e00) {
    throw new Error(
      "Does not support such big length, consider modify the `createInput`"
    );
  }
  let source = "class C { ";
  for (let i = 0; i < length; i++) {
    source += "#" + String.fromCharCode(0x4e00 + i) + ";";
  }
  return source + " }";
}
function benchCases(name, implementation, options) {
  for (const length of [256, 512, 1024, 2048]) {
    const input = createInput(length);
    suite.add(`${name} ${length} length-1 private properties`, () => {
      implementation.parse(input, options);
    });
  }
}

benchCases("baseline", baseline, { plugins: ["classPrivateProperties"] });
benchCases("current", current);

suite.on("cycle", report).run();
