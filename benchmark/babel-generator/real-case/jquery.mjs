import Benchmark from "benchmark";
import baseline from "@babel-baseline/generator";
import current from "@babel/generator";
import parser from "@babel/parser";
import { report } from "../../util.mjs";
import { readFileSync } from "fs";

const suite = new Benchmark.Suite();

function createInput(length) {
  return parser.parse(
    readFileSync(new URL("./jquery-3.6.txt", import.meta.url), {
      encoding: "utf-8",
    }).repeat(length)
  );
}

function benchCases(name, implementation, options) {
  for (const length of [1, 2]) {
    const input = createInput(length);
    suite.add(`${name} ${length} jquery 3.6`, () => {
      implementation(input, options);
    });
  }
}

benchCases("baseline", baseline.default);
benchCases("current", current.default);

suite.on("cycle", report).run();
