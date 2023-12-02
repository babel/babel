import Benchmark from "benchmark";
import { readFileSync } from "fs";
import {
  report,
  currentCore,
  baselineCore,
  currentParser,
} from "../../util.mjs";

const suite = new Benchmark.Suite();

function createInput() {
  return currentParser.parse(
    readFileSync(
      new URL("./babel-parser-tokenizer-index.txt", import.meta.url),
      {
        encoding: "utf-8",
      }
    ),
    { sourceType: "module", plugins: ["typescript"] }
  );
}

const input = createInput();
function benchCases(name, implementation, options = {}) {
  suite.add(
    name,
    () => {
      implementation(input, {
        plugins: ["@babel/preset-env", "@babel/preset-typescript"],
        targets: "node 6",
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

benchCases("baseline", baselineCore.transformFromAstSync);
benchCases("current", currentCore.transformFromAstSync);

suite.on("cycle", report).run();
