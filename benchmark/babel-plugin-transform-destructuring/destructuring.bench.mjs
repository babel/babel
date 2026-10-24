// Run with Node.js >= 26:
//   node --experimental-bench --no-warnings --bench destructuring.bench.mjs
// or, for a process-isolated A/B comparison with several rounds:
//   node run.mjs [rounds]
import { bench, suite } from "node:bench";
import { transformSync } from "@babel/core";

import baselineDestructuring from "@babel-baseline/plugin-transform-destructuring";
import baselineObjectRestSpread from "@babel-baseline/plugin-transform-object-rest-spread";
import baselineDestructuringPrivate from "@babel-baseline/plugin-proposal-destructuring-private";
import currentDestructuring from "@babel/plugin-transform-destructuring";
import currentObjectRestSpread from "@babel/plugin-transform-object-rest-spread";
import currentDestructuringPrivate from "@babel/plugin-proposal-destructuring-private";

import {
  destructuring,
  objectRestSpread,
  mixed,
  privateDestructuring,
} from "./inputs.mjs";

const implementations = {
  baseline: {
    destructuring: baselineDestructuring,
    objectRestSpread: baselineObjectRestSpread,
    destructuringPrivate: baselineDestructuringPrivate,
  },
  current: {
    destructuring: currentDestructuring,
    objectRestSpread: currentObjectRestSpread,
    destructuringPrivate: currentDestructuringPrivate,
  },
};

const cases = [
  {
    name: "destructuring",
    input: destructuring,
    plugins: ({ destructuring }) => [destructuring],
  },
  {
    name: "object-rest-spread",
    input: objectRestSpread,
    plugins: ({ objectRestSpread }) => [objectRestSpread],
  },
  {
    name: "destructuring + object-rest-spread",
    input: mixed,
    plugins: ({ destructuring, objectRestSpread }) => [
      objectRestSpread,
      destructuring,
    ],
  },
  {
    name: "destructuring-private",
    input: privateDestructuring,
    plugins: ({ destructuringPrivate }) => [destructuringPrivate],
  },
];

const OPS_PER_SAMPLE = 2;

for (const { name, input, plugins } of cases) {
  suite(name, () => {
    for (const [implementation, pluginSet] of Object.entries(implementations)) {
      const options = {
        configFile: false,
        babelrc: false,
        filename: "input.js",
        plugins: plugins(pluginSet),
        targets: "ie 11",
      };
      bench(implementation, t => {
        t.start();
        for (let i = 0; i < OPS_PER_SAMPLE; i++) {
          transformSync(input, options);
        }
        t.end(OPS_PER_SAMPLE);
      });
    }
  });
}
