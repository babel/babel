import * as currentTypes from "@babel/types";
import * as baselineTypes from "@babel-baseline/types";
import * as currentParser from "@babel/parser";
import * as baselineParser from "@babel-baseline/parser";
import * as currentGenerator from "@babel/generator";
import * as baselineGenerator from "@babel-baseline/generator";
import * as currentCore from "@babel/core";
import * as baselineCore from "@babel-baseline/core";
import * as currentTraverse from "@babel/traverse";
import * as baselineTraverse from "@babel-baseline/traverse";
import presetEnv from "@babel/preset-env";
import presetTypescript from "@babel/preset-typescript";

import benchmark from "benchmark";

export function report(event) {
  const bench = event.target;
  const timeMs = bench.stats.mean * 1000;
  const time =
    timeMs < 10
      ? `${Math.round(timeMs * 1000) / 1000}ms`
      : `${Math.round(timeMs)}ms`;
  const msg = `${bench.name}: ${formatNumber(bench.hz)} ops/sec ±${
    Math.round(bench.stats.rme * 100) / 100
  }% (${time})`;
  console.log(msg);
}

function formatNumber(x) {
  if (x < 100) return `${Math.round(x * 100) / 100}`;
  return `${Math.round(x)}`.replace(/\d(?=(?:\d{3})+$)/g, "$&_");
}

class Benchmark {
  constructor() {
    this.suite = new benchmark.Suite();
  }
  add(name, fn, options) {
    this.suite.add(name, fn, options);
  }
  run() {
    this.suite.on("cycle", report);
    this.suite.on("error", function (event) {
      console.error(event.target.error);
    });
    this.suite.run();
  }
}

export {
  currentTypes,
  baselineTypes,
  currentParser,
  baselineParser,
  currentGenerator,
  baselineGenerator,
  currentCore,
  baselineCore,
  currentTraverse,
  baselineTraverse,
  presetEnv,
  presetTypescript,
  Benchmark,
};
