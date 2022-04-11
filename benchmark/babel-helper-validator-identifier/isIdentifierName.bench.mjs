import Benchmark from "benchmark";
import baseline from "@babel-baseline/helper-validator-identifier";
import current from "@babel/helper-validator-identifier";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementation, name) {
  suite.add(name + "#isIdentifierName on 2 short ASCII words", () => {
    implementation.isIdentifierName("aforementioned");
    implementation.isIdentifierName("zap cannon");
  });

  suite.add(name + "#isIdentifierName on 1 long ASCII words", () => {
    implementation.isIdentifierName(
      "Pneumonoultramicroscopicsilicovolcanoconiosis"
    );
  });

  suite.add(name + "#isIdentifierName on 3 non-ASCII words", () => {
    implementation.isIdentifierName("مذكور أعلاه");
    implementation.isIdentifierName("cañón de zap");
    implementation.isIdentifierName("𠡦𠧋𡆠囝〇𠁈𢘑𤯔𠀑埊");
  });
}

benchCases(baseline, "baseline");
benchCases(current, "current");

suite.on("cycle", report).run();
