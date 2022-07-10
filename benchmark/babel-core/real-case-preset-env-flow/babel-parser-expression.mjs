import Benchmark from "benchmark";
import baseline from "@babel-baseline/core";
import current from "@babel/core";
import parser from "@babel-baseline/parser";
import { report } from "../../util.mjs";
import { readFileSync } from "fs";

const suite = new Benchmark.Suite();
const fixtureName = "babel-parser-expression.txt";

function createInput() {
  return parser.parse(
    readFileSync(new URL("./" + fixtureName, import.meta.url), {
      encoding: "utf-8",
    }),
    { sourceType: "module", plugins: ["flow"] }
  );
}
function benchCases(name, implementation, options) {
  const input = createInput();
  suite.add(
    `${name} ${fixtureName}`,
    () => {
      implementation(input, {
        plugins: ["@babel/preset-env", "@babel/preset-flow"],
        targets: "ie 11",
        configFile: false,
        babelrc: false,
        ...options,
      });
    },
    {
      // increase minSamples for accuracy
      minSamples: 100,
    }
  );
}

benchCases("baseline", baseline.transformFromAstSync, {});
benchCases("current", current.transformFromAstSync, {});

suite.on("cycle", report).run();
