import assert from 'assert';
import vm from "vm";
import Benchmark from "benchmark";
import chalk from "chalk";

import baseline from "@babel-baseline/traverse";
import current from "@babel/traverse";
import generator from "@babel/generator";
import parser from "@babel/parser";
import { report } from "../../util.mjs";

const suite = new Benchmark.Suite();

function createInput(implementation) {
  const traverse = implementation.default;
  const ast = parser.parse(`
    function makeArray() {
      return arguments;
    }
  `);
  // convert `arguments` node in AST to Array
  traverse(ast, {
    Identifier(path) {
      const { node, scope } = path;
      if (node.name === "arguments") {
        path.replaceWith(scope.toArray(node));
        path.skip();
      }
    }
  });
  return generator.default(ast);
}

function benchCase(version, implementation) {
  const source = createInput(implementation);
  console.log(chalk.grey(`// ${version}`));
  console.log(chalk.cyan(source.code));

  // prepare VM context with the transformed function `makeArray`
  const context = vm.createContext();
  vm.runInContext(source.code, context);
  assert.deepEqual(
    vm.runInContext(`makeArray("bacon", "egg", "spam")`, context),
    [ "bacon", "egg", "spam" ],
  );

  // compile script calling function `makeArray` in a loop
  // to disperse startup overhead effect on timings
  const loopScript = new vm.Script(`
    for (let i = 1000; i--; ) {
      makeArray("bacon", "egg", "spam");
    }
  `);
  suite.add(
    `${version}`,
    () => {
      loopScript.runInContext(context);
    },
    {
      minSamples: 100, // increase for accuracy
    },
  );
}

function benchCases(implementations) {
  for (const version in implementations) {
    benchCase(version, implementations[version]);
  }
}

benchCases({ baseline, current });

suite.on("cycle", report).run();
