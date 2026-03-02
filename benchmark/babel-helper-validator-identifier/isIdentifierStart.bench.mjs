import Benchmark from "benchmark";
import baseline from "@babel-baseline/helper-validator-identifier";
import current from "@babel/helper-validator-identifier";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementation, name) {
  suite.add(name + "#isIdentifierStart on 4 ASCII characters", () => {
    implementation.isIdentifierStart(0x61);
    implementation.isIdentifierStart(0x7b);
    implementation.isIdentifierStart(0x5f);
    implementation.isIdentifierStart(0x24);
  });

  suite.add(name + "#isIdentifierStart on 4 non-ASCII characters", () => {
    implementation.isIdentifierStart(0x80);
    implementation.isIdentifierStart(0x4e00);
    implementation.isIdentifierStart(0xffff);
    implementation.isIdentifierStart(0x10000);
  });

  suite.add(name + "#isIdentifierStart on TIP character", () => {
    implementation.isIdentifierStart(0x30000);
  });
}

benchCases(baseline, "baseline");
benchCases(current, "current");

suite.on("cycle", report).run();
