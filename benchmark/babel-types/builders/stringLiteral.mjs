import Benchmark from "benchmark";
import baseline from "@babel-baseline/types";
import current from "@babel/types";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementations) {
  const funcName = "stringLiteral";
  for (const version in implementations) {
    const t = implementations[version];
    const func = t[funcName];
    suite.add(`${version} ${funcName} builder`, () => {
      func("bar");
    });
  }
}

benchCases({ baseline, current });

suite.on("cycle", report).run();
