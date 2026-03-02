import Benchmark from "benchmark";
import baseline from "@babel-baseline/types";
import current from "@babel/types";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementations) {
  const funcName = "memberExpression";
  for (const version in implementations) {
    const t = implementations[version];
    const func = t[funcName];
    const idObj = t.identifier("obj");
    const idProp = t.identifier("prop");
    suite.add(`${version} ${funcName} builder`, () => {
      func(idObj, idProp, /*computed?*/ false /*, optional? missing*/);
    });
  }
}

benchCases({ baseline, current });

suite.on("cycle", report).run();
