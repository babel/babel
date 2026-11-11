import * as currentTypes from "@babel/types";
import * as baselineTypes from "@babel-baseline/types";
import currentGenerator from "@babel/generator";
import baselineGenerator from "@babel-baseline/generator";
import * as currentCore from "@babel/core";
import * as baselineCore from "@babel-baseline/core";
import currentTraverse from "@babel/traverse";
import baselineTraverse from "@babel-baseline/traverse";
import currentPresetEnv from "@babel/preset-env";
import currentPresetTypescript from "@babel/preset-typescript";
import currentPluginCommonjs from "@babel/plugin-transform-modules-commonjs";
import baselinePresetEnv from "@babel-baseline/preset-env";
import baselinePresetTypescript from "@babel-baseline/preset-typescript";
import baselinePluginCommonjs from "@babel-baseline/plugin-transform-modules-commonjs";

import { Bench } from "tinybench";
import { withCodSpeed } from "@codspeed/tinybench-plugin";
import {
  readFileSync,
  copyFileSync,
  mkdirSync,
  globSync,
  renameSync,
  statSync,
} from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import assert from "node:assert";
import { tmpdir } from "node:os";

const currentParser = await copyPkg("@babel/parser");
const baselineParser = await copyPkg("@babel-baseline/parser");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const onlyCurrent = process.argv.includes("--only-current");
const onlyBaseline = process.argv.includes("--only-baseline");
// --fixture=<name> (repeatable) only runs the cases of the given fixtures,
// e.g. --fixture=jquery-3.6.js.
const onlyFixtures = process.argv
  .filter(arg => arg.startsWith("--fixture="))
  .map(arg => arg.slice("--fixture=".length));
// --list prints one "<suite> <fixture>" line per fixture that each suite
// would run, and runs nothing. Running the suite file with
// --fixture=<fixture> runs that part of the benchmark on its own. Lines are
// ordered longest first by ./simulation-durations.json, the seconds each line
// took in CodSpeed's simulation mode on CI, so that parallel runs do not end
// with one long case running alone. Lines missing from it come first, largest
// fixture first.
// --list=simulation and --list=walltime only print the cases that CI runs in
// that CodSpeed mode.
const listArg = process.argv.find(
  arg => arg === "--list" || arg.startsWith("--list=")
);
const listOnly = listArg !== undefined;
const listMode = listArg?.slice("--list=".length) || undefined;
if (listMode !== undefined && !["simulation", "walltime"].includes(listMode)) {
  throw new Error(`Unknown ${listArg}, expected simulation or walltime`);
}
// A single measured call of these fixtures takes 4 to 25 minutes under
// Valgrind, so CI benchmarks them in walltime mode instead of simulation.
const walltimeFixtures = new Set(["typescript-5.6.2.js", "ts-checker.mjs"]);
const listed = [];
// --iterations=<n> sets the minimum number of samples per case, which
// otherwise defaults to tinybench's 64. Each case still runs for at least 5s.
const iterationsArg = process.argv.find(arg => arg.startsWith("--iterations="));
const iterations = iterationsArg
  ? Number(iterationsArg.slice("--iterations=".length))
  : undefined;
if (
  iterations !== undefined &&
  !(Number.isInteger(iterations) && iterations > 0)
) {
  throw new Error(`Expected a positive integer in ${iterationsArg}`);
}

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
  // Benchmarks may run in parallel: copy then rename, so that no process
  // imports a copy that another process has truncated but not yet written.
  const tmp = `${dst}.${process.pid}`;
  copyFileSync(src, tmp);
  renameSync(tmp, dst);
  try {
    return await import(pathToFileURL(dst));
  } catch (error) {
    console.error("Please run with `make prepublish-build`");
    return await import(name);
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

function loadFixtures(url, type = "*", { exclude = [] } = {}) {
  const fixtures = globSync(`fixtures/*.${type}.txt`, {
    cwd: __dirname,
  })
    .sort()
    .map(file => ({ file, name: path.basename(file, ".txt") }))
    .filter(
      ({ name }) =>
        !exclude.includes(name) &&
        (onlyFixtures.length === 0 || onlyFixtures.includes(name))
    );

  if (listOnly) {
    const suite = generateCaseName(url);
    for (const { file, name } of fixtures) {
      if (
        listMode !== undefined &&
        walltimeFixtures.has(name) !== (listMode === "walltime")
      ) {
        continue;
      }
      const { size } = statSync(path.join(__dirname, file));
      listed.push({ suite, name, size });
    }
    return [];
  }

  return fixtures.map(({ file, name }) => ({
    name,
    content: readFileSync(path.join(__dirname, file), "utf-8"),
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
        iterations,
        warmup: false,
        retainSamples: true,
      })
    );
  }
  add(name, fn, options) {
    this.bench.add(name, fn, options);
  }
  async run() {
    this.bench.addEventListener("cycle", function (event) {
      const task = event.task;
      const { latency, throughput } = task.result;
      const timeMs = latency.mean;
      const time =
        timeMs < 10
          ? `${Math.round(timeMs * 1000) / 1000}ms`
          : `${Math.round(timeMs)}ms`;
      const msg = `${task.name}: ${formatNumber(throughput.mean)} ops/sec ±${
        Math.round(latency.rme * 100) / 100
      }% ${latency.samplesCount} runs (${time})`;
      console.log(msg);

      globalThis.gc?.();
    });
    this.bench.addEventListener("error", function (event) {
      console.error(event.task.result.error);
    });
    this.bench.runSync();
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
  if (listOnly) {
    const durations = JSON.parse(
      readFileSync(path.join(__dirname, "simulation-durations.json"), "utf-8")
    );
    const duration = ({ suite, name }) =>
      durations[`${suite} ${name}`] ?? Infinity;
    listed.sort((a, b) => duration(b) - duration(a) || b.size - a.size);
    for (const { suite, name } of listed) console.log(`${suite} ${name}`);
    return;
  }

  if (onlyFixtures.length > 0 && currentCases.length === 0) {
    console.error(`No benchmark case for --fixture=${onlyFixtures.join(",")}`);
    process.exitCode = 1;
    return;
  }

  if (onlyCurrent) {
    currentCases.forEach(({ name, fn }) => {
      bench.add(name, fn, { async: false });
    });
  } else if (onlyBaseline) {
    baselineCases.forEach(({ name, fn }) => {
      bench.add(name, fn, { async: false });
    });
  } else {
    assert.strictEqual(baselineCases.length, currentCases.length);
    for (let i = 0; i < baselineCases.length; i++) {
      bench.add(currentCases[i].name, currentCases[i].fn, { async: false });
      bench.add(baselineCases[i].name, baselineCases[i].fn, { async: false });
    }
  }

  bench.run();
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
