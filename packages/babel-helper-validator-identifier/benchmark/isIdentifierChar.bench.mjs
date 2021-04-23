import Benchmark from "benchmark";
import baseline from "@babel/helper-validator-identifier-baseline";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

suite.add("baseline#isIdentifierChar on 4 ASCII characters", () => {
  baseline.isIdentifierChar(0x61);
  baseline.isIdentifierChar(0x7b);
  baseline.isIdentifierChar(0x5f);
  baseline.isIdentifierChar(0x24);
});

suite.add("baseline#isIdentifierChar on 4 non-ASCII characters", () => {
  baseline.isIdentifierChar(0x80);
  baseline.isIdentifierChar(0x4e00);
  baseline.isIdentifierChar(0xffff);
  baseline.isIdentifierChar(0x10000);
});

suite.add("baseline#isIdentifierChar on TIP character", () => {
  baseline.isIdentifierChar(0x30000);
});

suite.add("current#isIdentifierChar on 4 ASCII characters", () => {
  current.isIdentifierChar(0x61);
  current.isIdentifierChar(0x7b);
  current.isIdentifierChar(0x5f);
  current.isIdentifierChar(0x24);
});

suite.add("current#isIdentifierChar on 4 non-ASCII characters", () => {
  current.isIdentifierChar(0x80);
  current.isIdentifierChar(0x4e00);
  current.isIdentifierChar(0xffff);
  current.isIdentifierChar(0x10000);
});

suite.add("current#isIdentifierChar on TIP character", () => {
  current.isIdentifierChar(0x30000);
});

suite.on("cycle", report).run();
