import assert from "assert";
import path from "path";
import vm from "vm";
import Benchmark from "benchmark";
import chalk from "chalk";

import baseline from "@babel-baseline/core";
import current from "@babel/core";
import { report } from "../util.mjs";

const SCRIPT_NAME = path.parse(process.argv[1]).name;
const VERBOSE = process.argv.some(x => x === "-v" || x === "--verbose");

const suite = new Benchmark.Suite();

export default function runner({ code, expect, loopCount = 1 }) {
  benchCase({
    title: `${SCRIPT_NAME} baseline`,
    babel: baseline,
    options: {
      plugins: ["module:@babel-baseline/plugin-transform-spread"],
    },
    code,
    expect,
    loopCount,
  });

  benchCase({
    title: `${SCRIPT_NAME} current`,
    babel: current,
    options: {
      plugins: ["@babel/plugin-transform-spread"],
    },
    code,
    expect,
    loopCount,
  });

  suite.on("cycle", report).run();
}

function benchCase({ title, babel, options, code, expect, loopCount }) {
  const transpiled = babel.transformSync(code, {
    babelrc: false,
    configFile: false,
    ...options,
  });

  if (VERBOSE) {
    console.log(chalk.grey(`// ${title}`));
    console.log(chalk.cyan(transpiled.code));
  }

  // prepare VM context with the transpiled code
  const context = vm.createContext();
  vm.runInContext(transpiled.code, context);
  const check = vm.runInContext(`work()`, context);
  assert.deepEqual(check, expect);

  // compile script that will call function `work` many times
  // to disperse the effect of startup overhead on benchmarks
  const loopScript = new vm.Script(`
    for (let i = ${loopCount}; i--; work());
  `);

  suite.add(title, () => loopScript.runInContext(context));
}
