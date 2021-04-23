import Benchmark from "benchmark";
import baseline from "@babel/helper-validator-identifier-baseline";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

suite.add("baseline#isIdentifierChar on 4 ASCII characters", () => {
  baseline.isIdentifierChar("a");
  baseline.isIdentifierChar("{");
  baseline.isIdentifierChar("_");
  baseline.isIdentifierChar("$");
});

suite.add("baseline#isIdentifierChar on 4 non-ASCII characters", () => {
  baseline.isIdentifierChar("\x80");
  baseline.isIdentifierChar("\u4e00");
  baseline.isIdentifierChar("\uffff");
  baseline.isIdentifierChar("\u{10000}");
});

suite.add("current#isIdentifierChar on 4 ASCII characters", () => {
  current.isIdentifierChar("a");
  current.isIdentifierChar("{");
  current.isIdentifierChar("_");
  current.isIdentifierChar("$");
});

suite.add("current#isIdentifierChar on 4 non-ASCII characters", () => {
  current.isIdentifierChar("\x80");
  current.isIdentifierChar("\u4e00");
  current.isIdentifierChar("\uffff");
  current.isIdentifierChar("\u{10000}");
});

suite.on("cycle", report).run();
