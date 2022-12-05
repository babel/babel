import Benchmark from "benchmark";
import baseline from "@babel-baseline/helper-compilation-targets";
import current from "@babel/helper-compilation-targets";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite("", { initCount: 0 });
function benchCases(implementation, name) {
  suite.add(name + "#getTargets last1", () => {
    implementation({
      browsers: [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version",
        "last 1 iOS version",
        "last 1 edge version",
      ],
    });
  });
  suite.add(name + "#getTargets last100", () => {
    implementation({
      browsers: [
        "last 100 chrome version",
        "last 100 firefox version",
        "last 100 safari version",
        "last 100 iOS version",
        "last 100 edge version",
      ],
    });
  });
  suite.add(name + "#getTargets chrome 49 ie 11", () => {
    implementation({
      browsers: ["chrome 49", "ie 11"],
    });
  });
}

benchCases(baseline.default, "baseline");
benchCases(current.default, "current");

suite.on("cycle", report).run();
