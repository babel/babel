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

const inputs = [1, 4, 16, 64].map(length => ({
  tag: length,
  body: createInput(length),
}));

function benchCases(name, implementation, options) {
  for (const input of inputs) {
    suite.add(`${name} ${input.tag} jquery 3.6`, () => {
      implementation(input.body, options);
    });
  }
}

benchCases("current", current.default);
benchCases("baseline", baseline.default);

suite.on("cycle", report).run();
