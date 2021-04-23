import Benchmark from "benchmark";
import baseline from "@babel/helper-validator-identifier-baseline";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

suite.add("baseline#isKeyword on 4 keywords", () => {
  baseline.isKeyword("debugger");
  baseline.isKeyword("throw");
  baseline.isKeyword("extends");
  baseline.isKeyword("instanceof");
});

suite.add("baseline#isKeyword on 4 non-keywords", () => {
  baseline.isKeyword("debuggerr");
  baseline.isKeyword("threw");
  baseline.isKeyword("extend");
  baseline.isKeyword("instanceOf");
});

suite.add("current#isKeyword on 4 keywords", () => {
  current.isKeyword("debugger");
  current.isKeyword("throw");
  current.isKeyword("extends");
  current.isKeyword("instanceof");
});

suite.add("current#isKeyword on 4 non-keywords", () => {
  current.isKeyword("debuggerr");
  current.isKeyword("threw");
  current.isKeyword("extend");
  current.isKeyword("instanceOf");
});

suite.on("cycle", report).run();
