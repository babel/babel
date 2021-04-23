import Benchmark from "benchmark";
import baseline from "@babel/helper-validator-identifier-baseline";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

suite.add("baseline#isStrictBindReservedWord on 4 keywords", () => {
  baseline.isStrictBindReservedWord("arguments");
  baseline.isStrictBindReservedWord("eval");
  baseline.isStrictBindReservedWord("implements");
  baseline.isStrictBindReservedWord("instanceof");
});

suite.add("baseline#isStrictBindReservedWord on 4 non-keywords", () => {
  baseline.isStrictBindReservedWord("argumentss");
  baseline.isStrictBindReservedWord("evals");
  baseline.isStrictBindReservedWord("implement");
  baseline.isStrictBindReservedWord("instanceOf");
});

suite.add("current#isStrictBindReservedWord on 4 keywords", () => {
  current.isStrictBindReservedWord("arguments");
  current.isStrictBindReservedWord("eval");
  current.isStrictBindReservedWord("implements");
  current.isStrictBindReservedWord("instanceof");
});

suite.add("current#isStrictBindReservedWord on 4 non-keywords", () => {
  current.isStrictBindReservedWord("argumentss");
  current.isStrictBindReservedWord("evals");
  current.isStrictBindReservedWord("implement");
  current.isStrictBindReservedWord("instanceOf");
});

suite.on("cycle", report).run({ async: false });
