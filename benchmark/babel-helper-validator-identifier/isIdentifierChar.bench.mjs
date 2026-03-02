import Benchmark from "benchmark";
import baseline from "@babel-baseline/helper-validator-identifier";
import current from "@babel/helper-validator-identifier";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementation, name) {
  suite.add(name + "#isIdentifierChar on 4 ASCII characters", () => {
    implementation.isIdentifierChar(0x61);
    implementation.isIdentifierChar(0x7b);
    implementation.isIdentifierChar(0x5f);
    implementation.isIdentifierChar(0x24);
  });

  suite.add(name + "#isIdentifierChar on 4 non-ASCII characters", () => {
    implementation.isIdentifierChar(0x80);
    implementation.isIdentifierChar(0x4e00);
    implementation.isIdentifierChar(0xffff);
    implementation.isIdentifierChar(0x10000);
  });

  suite.add(name + "#isIdentifierChar on TIP character", () => {
    implementation.isIdentifierChar(0x30000);
  });
}

benchCases(baseline, "baseline");
benchCases(current, "current");

suite.on("cycle", report).run();
