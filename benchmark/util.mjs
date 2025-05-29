/* eslint-disable import/no-extraneous-dependencies */

import * as currentTypes from "@babel/types";
import baselineTypes from "@babel-baseline/types";
import _currentGenerator from "@babel/generator";
import _baselineGenerator from "@babel-baseline/generator";
import * as currentCore from "@babel/core";
import baselineCore from "@babel-baseline/core";
import _currentTraverse from "@babel/traverse";
import _baselineTraverse from "@babel-baseline/traverse";
import currentPresetEnv from "@babel/preset-env";
import currentPresetTypescript from "@babel/preset-typescript";
import currentPluginCommonjs from "@babel/plugin-transform-modules-commonjs";
import baselinePresetEnv from "@babel-baseline/preset-env";
import baselinePresetTypescript from "@babel-baseline/preset-typescript";
import baselinePluginCommonjs from "@babel-baseline/plugin-transform-modules-commonjs";

import { USE_ESM } from "$repo-utils";
import { Bench } from "tinybench";
import { globSync } from "glob";
import { withCodSpeed } from "@codspeed/tinybench-plugin";
import { readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import assert from "node:assert";
import { tmpdir } from "node:os";

const currentGenerator = USE_ESM
  ? _currentGenerator
  : _currentGenerator.default;
const currentTraverse = USE_ESM ? _currentTraverse : _currentTraverse.default;
const baselineTraverse = _baselineTraverse.default;
const baselineGenerator = _baselineGenerator.default;

const currentParser = await copyPkg("@babel/parser");
const baselineParser = await copyPkg("@babel-baseline/parser");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const onlyCurrent = process.argv.includes("--only-current");
const onlyBaseline = process.argv.includes("--only-baseline");

if (!globalThis.gc) {
  console.warn("Recommend running with --expose-gc.");
}

async function copyPkg(name) {
  const src = fileURLToPath(import.meta.resolve(name));
  const dst = path.join(
    tmpdir(),
    "babel-benchmark",
    name.replace("/", "-") + ".js"
  );
  mkdirSync(path.dirname(dst), { recursive: true });
  copyFileSync(src, dst);
  try {
    return await import(pathToFileURL(dst));
  } catch (error) {
    console.error("Please run with `make prepublish-build`");
    return {};
  }
}

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

function loadFixtures(type = "*") {
  const fixtures = globSync(`fixtures/*.${type}.txt`, {
    cwd: __dirname,
  }).sort();

  return fixtures.map(fixture => ({
    name: path.basename(fixture, ".txt"),
    content: readFileSync(path.join(__dirname, fixture), "utf-8"),
  }));
}

function generateCaseName(url) {
  const filename = fileURLToPath(url);
  return path.relative(__dirname, filename).replace(/\\/g, "/");
}

class Benchmark {
  constructor() {
    this.bench = withCodSpeed(
      new Bench({
        time: 5000,
      })
    );
  }
  add(name, fn, options) {
    this.bench.add(name, fn, options);
  }
  async run() {
    this.bench.addEventListener("cycle", function (event) {
      const task = event.task;
      const timeMs = task.result.mean;
      const time =
        timeMs < 10
          ? `${Math.round(timeMs * 1000) / 1000}ms`
          : `${Math.round(timeMs)}ms`;
      const msg = `${task.name}: ${formatNumber(task.result.hz)} ops/sec ±${
        Math.round(task.result.rme * 100) / 100
      }% ${task.result.samples.length} runs (${time})`;
      console.log(msg);

      globalThis.gc?.();
    });
    this.bench.addEventListener("error", function (event) {
      console.error(event.task.result.error);
    });
    await this.bench.run();
  }
}

const bench = new Benchmark();

const baselineCases = [];
const currentCases = [];

function addBaselineCase(name, fn, args) {
  baselineCases.push({
    name: `${name} @ baseline`,
    fn: () => {
      fn.apply(null, args);
    },
  });
}

function addCurrentCase(name, fn, args) {
  currentCases.push({
    name: `${name} @ current`,
    fn: () => {
      fn.apply(null, args);
    },
  });
}

function addBenchCase(name, baseline, current, args) {
  addBaselineCase(name, baseline, args);
  addCurrentCase(name, current, args);
}

setTimeout(async () => {
  if (onlyCurrent) {
    currentCases.forEach(({ name, fn }) => {
      bench.add(name, fn);
    });
  } else if (onlyBaseline) {
    baselineCases.forEach(({ name, fn }) => {
      bench.add(name, fn);
    });
  } else {
    assert.strictEqual(baselineCases.length, currentCases.length);
    for (let i = 0; i < baselineCases.length; i++) {
      bench.add(currentCases[i].name, currentCases[i].fn);
      bench.add(baselineCases[i].name, baselineCases[i].fn);
    }
  }

  await bench.run();
}, 0);

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
  currentPresetEnv,
  currentPresetTypescript,
  currentPluginCommonjs,
  baselinePresetEnv,
  baselinePresetTypescript,
  baselinePluginCommonjs,
  Benchmark,
  loadFixtures,
  generateCaseName,
  bench as benchmark,
  addBenchCase,
  addBaselineCase,
  addCurrentCase,
};
