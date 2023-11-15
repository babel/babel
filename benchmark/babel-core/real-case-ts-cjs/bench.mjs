import { readFileSync } from "fs";
import {
  currentCore,
  baselineCore,
  presetTypescript,
  Benchmark,
} from "../../util.mjs";
import commonjs from "@babel/plugin-transform-modules-commonjs";

const benchmark = new Benchmark();

const input = readFileSync(
  new URL("./babel-parser-tokenizer-index.txt", import.meta.url),
  "utf-8"
);
function benchCases(name, implementation, options = {}) {
  benchmark.add(
    name,
    () => {
      implementation(input, {
        presets: [presetTypescript],
        plugins: [commonjs],
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

benchCases("baseline", baselineCore.transformSync);
benchCases("current", currentCore.transformSync);

benchmark.run();
