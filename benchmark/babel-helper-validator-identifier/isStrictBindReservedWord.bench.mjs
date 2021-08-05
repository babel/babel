import Benchmark from "benchmark";
import baseline from "@babel-baseline/helper-validator-identifier";
import current from "@babel/helper-validator-identifier";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementation, name) {
  suite.add(name + "#isStrictBindReservedWord on 4 keywords", () => {
    implementation.isStrictBindReservedWord("arguments");
    implementation.isStrictBindReservedWord("eval");
    implementation.isStrictBindReservedWord("implements");
    implementation.isStrictBindReservedWord("instanceof");
  });

  suite.add(name + "#isStrictBindReservedWord on 4 non-keywords", () => {
    implementation.isStrictBindReservedWord("argumentss");
    implementation.isStrictBindReservedWord("evals");
    implementation.isStrictBindReservedWord("implement");
    implementation.isStrictBindReservedWord("instanceOf");
  });
}

benchCases(baseline, "baseline");
benchCases(current, "current");

suite.on("cycle", report).run({ async: false });
