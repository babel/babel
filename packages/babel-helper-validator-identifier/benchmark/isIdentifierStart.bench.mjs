import Benchmark from "benchmark";
import baseline from "@babel/helper-validator-identifier-baseline";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

suite.add("baseline#isIdentifierStart on 4 ASCII characters", () => {
  baseline.isIdentifierStart("a");
  baseline.isIdentifierStart("{");
  baseline.isIdentifierStart("_");
  baseline.isIdentifierStart("$");
});

suite.add("baseline#isIdentifierStart on 4 non-ASCII characters", () => {
  baseline.isIdentifierStart("\x80");
  baseline.isIdentifierStart("\u4e00");
  baseline.isIdentifierStart("\uffff");
  baseline.isIdentifierStart("\u{10000}");
});

suite.add("current#isIdentifierStart on 4 ASCII characters", () => {
  current.isIdentifierStart("a");
  current.isIdentifierStart("{");
  current.isIdentifierStart("_");
  current.isIdentifierStart("$");
});

suite.add("current#isIdentifierStart on 4 non-ASCII characters", () => {
  current.isIdentifierStart("\x80");
  current.isIdentifierStart("\u4e00");
  current.isIdentifierStart("\uffff");
  current.isIdentifierStart("\u{10000}");
});

suite.on("cycle", report).run();
