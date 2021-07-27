import Benchmark from "benchmark";
import baseline from "@babel-baseline/helper-validator-identifier";
import current from "@babel/helper-validator-identifier";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementation, name) {
  suite.add(name + "#isKeyword on 4 keywords", () => {
    implementation.isKeyword("debugger");
    implementation.isKeyword("throw");
    implementation.isKeyword("extends");
    implementation.isKeyword("instanceof");
  });

  suite.add(name + "#isKeyword on 4 non-keywords", () => {
    implementation.isKeyword("debuggerr");
    implementation.isKeyword("threw");
    implementation.isKeyword("extend");
    implementation.isKeyword("instanceOf");
  });
}

benchCases(baseline, "baseline");
benchCases(current, "current");

suite.on("cycle", report).run();
