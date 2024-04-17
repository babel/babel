import baseline from "@babel-baseline/parser";
import current from "@babel/parser";
import { Benchmark } from "../../util.mjs";
import { readFileSync } from "fs";

const benchmark = new Benchmark();

function createInput(length) {
  return readFileSync(new URL("ts-parser.txt", import.meta.url), {
    encoding: "utf-8",
  }).repeat(length);
}

const inputs = [1].map(length => ({
  tag: length,
  body: createInput(length),
}));

function benchCases(name, implementation, options) {
  for (const input of inputs) {
    benchmark.add(`${name} ${input.tag} typescript parser.ts`, () => {
      implementation(input.body, {
        sourceType: "module",
        plugins: ["typescript"],
        ...options,
      });
    });
  }
}

benchCases("current", current.parse);
benchCases("baseline", baseline.parse);
benchCases("current", current.parse);
benchCases("baseline", baseline.parse);

benchmark.run();
