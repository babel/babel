/* eslint-env jest */
import * as babel from "@babel/core";
import { buildExternalHelpers } from "@babel/core";
import getFixtures from "@babel/helper-fixtures";
import sourceMap from "source-map";
import { codeFrameColumns } from "@babel/code-frame";
import defaults from "lodash/defaults";
import includes from "lodash/includes";
import * as helpers from "./helpers";
import extend from "lodash/extend";
import merge from "lodash/merge";
import resolve from "resolve";
import assert from "assert";
import fs from "fs";
import path from "path";
import vm from "vm";

import diff from "jest-diff";

const moduleCache = {};
const testContext = vm.createContext({
  ...helpers,
  process: process,
  transform: babel.transform,
  setTimeout: setTimeout,
  setImmediate: setImmediate,
});
testContext.global = testContext;

// Add chai's assert to the global context
// It has to be required inside the testContext as otherwise some assertions do not
// work as chai would reference globals (RegExp, Array, ...) from this context
vm.runInContext(
  "(function(require) { global.assert=require('chai').assert; });",
  testContext,
  {
    displayErrors: true,
  },
)(id => runModuleInTestContext(id, __filename));

// Initialize the test context with the polyfill, and then freeze the global to prevent implicit
// global creation in tests, which could cause things to bleed between tests.
runModuleInTestContext("@babel/polyfill", __filename);

// Populate the "babelHelpers" global with Babel's helper utilities.
runCodeInTestContext(buildExternalHelpers());

/**
 * A basic implementation of CommonJS so we can execute `@babel/polyfill` inside our test context.
 * This allows us to run our unittests
 */
function runModuleInTestContext(id: string, relativeFilename: string) {
  const filename = resolve.sync(id, {
    basedir: path.dirname(relativeFilename),
  });

  // Expose Node-internal modules if the tests want them. Note, this will not execute inside
  // the context's global scope.
  if (filename === id) return require(id);

  if (moduleCache[filename]) return moduleCache[filename].exports;

  const module = (moduleCache[filename] = {
    id: filename,
    exports: {},
  });
  const dirname = path.dirname(filename);
  const req = id => runModuleInTestContext(id, filename);

  const src = fs.readFileSync(filename, "utf8");
  const code = `(function (exports, require, module, __filename, __dirname) {${src}\n});`;

  vm
    .runInContext(code, testContext, {
      filename,
      displayErrors: true,
    })
    .call(module.exports, module.exports, req, module, filename, dirname);

  return module.exports;
}

/**
 * Run the given snippet of code inside a CommonJS module.
 *
 * Exposed for unit tests, not for use as an API.
 */
export function runCodeInTestContext(
  code: string,
  opts: { filename?: string } = {},
) {
  const filename = opts.filename || null;
  const dirname = filename ? path.dirname(filename) : null;
  const req = filename ? id => runModuleInTestContext(id, filename) : null;

  const module = {
    id: filename,
    exports: {},
  };

  // Expose the test options as "opts", but otherwise run the test in a CommonJS-like environment.
  // Note: This isn't doing .call(module.exports, ...) because some of our tests currently
  // rely on 'this === global'.
  const src = `(function(exports, require, module, __filename, __dirname, opts) {${code}\n});`;
  return vm.runInContext(src, testContext, {
    filename,
    displayErrors: true,
  })(module.exports, req, module, filename, dirname, opts);
}

function wrapPackagesArray(type, names, optionsDir) {
  return (names || []).map(function(val) {
    if (typeof val === "string") val = [val];

    // relative path (outside of monorepo)
    if (val[0][0] === ".") {
      if (!optionsDir) {
        throw new Error(
          "Please provide an options.json in test dir when using a " +
            "relative plugin path.",
        );
      }

      val[0] = path.resolve(optionsDir, val[0]);
    } else {
      // check node_modules/babel-x-y
      val[0] = __dirname + "/../../babel-" + type + "-" + val[0];
    }

    return val;
  });
}

function checkDuplicatedNodes(ast) {
  // TODO Remove all these function when regenerator doesn't
  // insert duplicated nodes

  const nodes = new WeakSet();
  const parents = new WeakMap();

  const setParent = (child, parent) => {
    if (typeof child === "object" && child !== null) {
      let p = parents.get(child);
      if (!p) {
        p = [];
        parents.set(child, p);
      }
      p.unshift(parent);
    }
  };
  const registerChildren = node => {
    for (const key in node) {
      if (Array.isArray(node[key])) {
        node[key].forEach(child => setParent(child, node));
      } else {
        setParent(node[key], node);
      }
    }
  };

  const parentIs = (node, test) => {
    return (parents.get(node) || []).some(parent => test(parent));
  };
  const isByRegenerator = node => {
    if (!node) {
      return false;
    } else if (node.type === "Identifier") {
      if (/^_(?:context|value|callee|marked)\d*$/.test(node.name)) {
        return true;
      } else if (
        /^t\d+$/.test(node.name) &&
        parentIs(
          node,
          parent =>
            parent.type === "MemberExpression" &&
            isByRegenerator(parent.object),
        )
      ) {
        // _context.t* // <-- t*
        return true;
      } else if (
        parentIs(
          node,
          parent =>
            parent.type === "VariableDeclarator" &&
            parentIs(
              parent,
              parent =>
                parent.type === "VariableDeclaration" &&
                parentIs(
                  parent,
                  parent =>
                    parent.type === "BlockStatement" &&
                    parentIs(
                      parent,
                      parent =>
                        parent.type === "FunctionExpression" &&
                        isByRegenerator(parent.id),
                    ),
                ),
            ),
        )
      ) {
        // regeneratorRuntime.mark(function _callee3() {
        //   var bar, _bar2; // <-- Those identifiers
        return true;
      } else if (
        parentIs(
          node,
          parent =>
            parent.type === "VariableDeclarator" &&
            parentIs(
              parent,
              parent =>
                parent.type === "VariableDeclaration" &&
                parentIs(
                  parent,
                  parent =>
                    parent.type === "BlockStatement" &&
                    parent.body.length === 2 &&
                    parent.body[1].type === "ReturnStatement" &&
                    parent.body[1].argument.type === "CallExpression" &&
                    parent.body[1].argument.callee.type ===
                      "MemberExpression" &&
                    parent.body[1].argument.callee.property.type ===
                      "Identifier" &&
                    parent.body[1].argument.callee.property.name === "wrap",
                ),
            ),
        )
      ) {
        // function foo() {
        //   var _len, // <-- Those identifiers
        //     items,
        //     _key,
        //     _args = arguments;
        //   return regeneratorRuntime.wrap(function foo$(_context) {
        return true;
      } else if (
        parentIs(
          node,
          parent =>
            parent.type === "CallExpression" &&
            parent.arguments.length === 3 &&
            parent.arguments[1] === node &&
            parent.callee.type === "MemberExpression" &&
            parent.callee.property.type === "Identifier" &&
            parent.callee.property.name === "wrap",
        )
      ) {
        // regeneratorRuntime.wrap(function foo$(_context) {
        //   ...
        // }, foo, this); // <- foo
        return true;
      } else if (
        parentIs(
          node,
          parent =>
            parent.type === "CallExpression" &&
            parent.callee.type === "MemberExpression" &&
            parent.callee.property.type === "Identifier" &&
            parent.callee.property.name === "mark",
        )
      ) {
        // regeneratorRuntime.mark(foo); // foo
        return true;
      }
    } else if (node.type === "MemberExpression") {
      // _context.next
      return isByRegenerator(node.object);
    } else if (node.type === "CallExpression") {
      return isByRegenerator(node.callee);
    } else if (node.type === "AssignmentExpression") {
      // _context.next = 4;
      return isByRegenerator(node.left);
    } else if (node.type === "NumericLiteral") {
      if (
        parentIs(
          node,
          parent =>
            parent.type === "AssignmentExpression" &&
            isByRegenerator(parent.left),
        )
      ) {
        // _context.next = 4; // <-- The 4
        return true;
      } else if (
        parentIs(
          node,
          parent =>
            parent.type === "CallExpression" &&
            parent.callee.type === "MemberExpression" &&
            isByRegenerator(parent.callee.object),
        )
      ) {
        // return _context.abrupt("break", 11); // <-- The 11
        return true;
      }
    }
    return false;
  };
  const hidePrivateProperties = (key, val) => {
    // Hides properties like _shadowedFunctionLiteral,
    // which makes the AST circular
    if (key[0] === "_") return "[Private]";
    return val;
  };
  babel.types.traverseFast(ast, node => {
    registerChildren(node);
    if (isByRegenerator(node)) return;
    if (nodes.has(node)) {
      throw new Error(
        "Do not reuse nodes. Use `t.cloneNode` to copy them.\n" +
          JSON.stringify(node, hidePrivateProperties, 2) +
          "\nParent:\n" +
          JSON.stringify(parents.get(node), hidePrivateProperties, 2),
      );
    }
    nodes.add(node);
  });
}

function run(task) {
  const actual = task.actual;
  const expected = task.expect;
  const exec = task.exec;
  const opts = task.options;
  const optionsDir = task.optionsDir;

  function getOpts(self) {
    const newOpts = merge(
      {
        filename: self.loc,
        filenameRelative: self.filename,
        sourceFileName: self.filename,
        sourceType: "script",
        babelrc: false,
      },
      opts,
    );

    newOpts.plugins = wrapPackagesArray("plugin", newOpts.plugins, optionsDir);
    newOpts.presets = wrapPackagesArray(
      "preset",
      newOpts.presets,
      optionsDir,
    ).map(function(val) {
      if (val.length > 2) {
        throw new Error(
          "Unexpected extra options " +
            JSON.stringify(val.slice(2)) +
            " passed to preset.",
        );
      }

      return val;
    });

    return newOpts;
  }

  let execCode = exec.code;
  let result;
  let resultExec;

  if (execCode) {
    const execOpts = getOpts(exec);
    result = babel.transform(execCode, execOpts);
    checkDuplicatedNodes(result.ast);
    execCode = result.code;

    try {
      resultExec = runCodeInTestContext(execCode, execOpts);
    } catch (err) {
      // Pass empty location to include the whole file in the output.
      err.message =
        `${exec.loc}: ${err.message}\n` + codeFrameColumns(execCode, {});
      throw err;
    }
  }

  let actualCode = actual.code;
  const expectCode = expected.code;
  if (!execCode || actualCode) {
    result = babel.transform(
      actualCode,
      Object.assign(
        {
          sourceMapTarget: task.expect.filename,
        },
        getOpts(actual),
      ),
    );
    checkDuplicatedNodes(result.ast);
    if (
      !expected.code &&
      result.code &&
      !opts.throws &&
      fs.statSync(path.dirname(expected.loc)).isDirectory() &&
      !process.env.CI
    ) {
      const expectedFile = expected.loc.replace(
        /\.m?js$/,
        result.sourceType === "module" ? ".mjs" : ".js",
      );

      console.log(`New test file created: ${expectedFile}`);
      fs.writeFileSync(expectedFile, `${result.code}\n`);

      if (expected.loc !== expectedFile) {
        try {
          fs.unlinkSync(expected.loc);
        } catch (e) {}
      }
    } else {
      actualCode = result.code.trim();
      expect(actualCode).toEqualFile({
        filename: expected.loc,
        code: expectCode,
      });

      if (actualCode) {
        expect(expected.loc).toMatch(
          result.sourceType === "module" ? /\.mjs$/ : /\.js$/,
        );
      }
    }
  }

  if (task.sourceMap) {
    expect(result.map).toEqual(task.sourceMap);
  }

  if (task.sourceMappings) {
    const consumer = new sourceMap.SourceMapConsumer(result.map);

    task.sourceMappings.forEach(function(mapping) {
      const actual = mapping.original;

      const expected = consumer.originalPositionFor(mapping.generated);
      expect({ line: expected.line, column: expected.column }).toEqual(actual);
    });
  }

  if (execCode && resultExec) {
    return resultExec;
  }
}

const toEqualFile = () => ({
  compare: (actual, { filename, code }) => {
    const pass = actual === code;
    return {
      pass,
      message: () => {
        const diffString = diff(code, actual, {
          expand: false,
        });
        return (
          `Expected ${filename} to match transform output.\n` +
          `To autogenerate a passing version of this file, delete the file and re-run the tests.\n\n` +
          `Diff:\n\n${diffString}`
        );
      },
    };
  },
  negativeCompare: () => {
    throw new Error("Negation unsupported");
  },
});

export default function(
  fixturesLoc: string,
  name: string,
  suiteOpts = {},
  taskOpts = {},
  dynamicOpts?: Function,
) {
  const suites = getFixtures(fixturesLoc);

  for (const testSuite of suites) {
    if (includes(suiteOpts.ignoreSuites, testSuite.title)) continue;

    describe(name + "/" + testSuite.title, function() {
      jest.addMatchers({
        toEqualFile,
      });

      for (const task of testSuite.tests) {
        if (
          includes(suiteOpts.ignoreTasks, task.title) ||
          includes(suiteOpts.ignoreTasks, testSuite.title + "/" + task.title)
        ) {
          continue;
        }

        it(
          task.title,
          !task.disabled &&
            function() {
              function runTask() {
                run(task);
              }

              defaults(task.options, {
                sourceMap: !!(task.sourceMappings || task.sourceMap),
              });

              extend(task.options, taskOpts);

              if (dynamicOpts) dynamicOpts(task.options, task);

              const throwMsg = task.options.throws;
              if (throwMsg) {
                // internal api doesn't have this option but it's best not to pollute
                // the options object with useless options
                delete task.options.throws;

                assert.throws(runTask, function(err) {
                  return (
                    throwMsg === true || err.message.indexOf(throwMsg) >= 0
                  );
                });
              } else {
                if (task.exec.code) {
                  const result = run(task);
                  if (result && typeof result.then === "function") {
                    return result;
                  }
                } else {
                  runTask();
                }
              }
            },
        );
      }
    });
  }
}
