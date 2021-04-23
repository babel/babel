import Benchmark from "benchmark";
import baseline from "@babel/helper-validator-identifier-baseline";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

suite.add("baseline#isIdentifierStart on 4 ASCII characters", () => {
  baseline.isIdentifierStart(0x61);
  baseline.isIdentifierStart(0x7b);
  baseline.isIdentifierStart(0x5f);
  baseline.isIdentifierStart(0x24);
});

suite.add("baseline#isIdentifierStart on 4 non-ASCII characters", () => {
  baseline.isIdentifierStart(0x80);
  baseline.isIdentifierStart(0x4e00);
  baseline.isIdentifierStart(0xffff);
  baseline.isIdentifierStart(0x10000);
});

suite.add("baseline#isIdentifierStart on TIP character", () => {
  baseline.isIdentifierStart(0x30000);
});

suite.add("current#isIdentifierStart on 4 ASCII characters", () => {
  current.isIdentifierStart(0x61);
  current.isIdentifierStart(0x7b);
  current.isIdentifierStart(0x5f);
  current.isIdentifierStart(0x24);
});

suite.add("current#isIdentifierStart on 4 non-ASCII characters", () => {
  current.isIdentifierStart(0x80);
  current.isIdentifierStart(0x4e00);
  current.isIdentifierStart(0xffff);
  current.isIdentifierStart(0x10000);
});

suite.add("current#isIdentifierStart on TIP character", () => {
  current.isIdentifierStart(0x30000);
});

suite.on("cycle", report).run();
