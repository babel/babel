import Benchmark from "benchmark";
import baseline from "@babel/helper-validator-identifier-baseline";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

suite.add("baseline#isIdentifierName on 3 ASCII words", () => {
  baseline.isIdentifierName("aforementioned");
  baseline.isIdentifierName("zap cannon");
  baseline.isIdentifierName("Pneumonoultramicroscopicsilicovolcanoconiosis");
});

suite.add("baseline#isIdentifierName on 3 non-ASCII words", () => {
  baseline.isIdentifierName("مذكور أعلاه");
  baseline.isIdentifierName("cañón de zap");
  baseline.isIdentifierName("𠡦𠧋𡆠囝〇𠁈𢘑𤯔𠀑埊");
});

suite.add("current#isIdentifierName on 3 ASCII words", () => {
  current.isIdentifierName("aforementioned");
  current.isIdentifierName("zap cannon");
  current.isIdentifierName("Pneumonoultramicroscopicsilicovolcanoconiosis");
});

suite.add("current#isIdentifierName on 3 non-ASCII words", () => {
  current.isIdentifierName("مذكور أعلاه");
  current.isIdentifierName("cañón de zap");
  current.isIdentifierName("𠡦𠧋𡆠囝〇𠁈𢘑𤯔𠀑埊");
});

suite.on("cycle", report).run();
