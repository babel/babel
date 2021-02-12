import { multiple as getFixtures } from "@babel/helper-fixtures";
import { codeFrameColumns } from "@babel/code-frame";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rootPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../..",
);

const serialized = "$$ babel internal serialized type";

class FixtureError extends Error {
  constructor(previousError, fixturePath, code) {
    super(previousError.message);
    const messageLines = (previousError.message.match(/\n/g) || []).length + 1;

    let fixtureStackFrame = "";
    if (previousError.loc) {
      fixtureStackFrame =
        codeFrameColumns(
          code,
          {
            start: {
              line: previousError.loc.line,
              column: previousError.loc.column + 1,
            },
          },
          { highlightCode: true },
        ) +
        "\n" +
        `at fixture (${fixturePath}:${previousError.loc.line}:${
          previousError.loc.column + 1
        })\n`;
    }

    this.stack =
      previousError.constructor.name +
      ": " +
      previousError.message +
      "\n" +
      fixtureStackFrame +
      previousError.stack.split("\n").slice(messageLines).join("\n");
  }
}

export function runFixtureTests(fixturesPath, parseFunction) {
  const fixtures = getFixtures(fixturesPath);

  Object.keys(fixtures).forEach(function (name) {
    fixtures[name].forEach(function (testSuite) {
      testSuite.tests.forEach(function (task) {
        const testFn = task.disabled ? it.skip : it;

        testFn(name + "/" + testSuite.title + "/" + task.title, function () {
          try {
            runTest(task, parseFunction);
          } catch (err) {
            if (!task.expect.code && !process.env.CI) {
              const fn = path.dirname(task.expect.loc) + "/options.json";
              if (!fs.existsSync(fn)) {
                task.options = task.options || {};
                task.options.throws = err.message.replace(
                  /^.*Got error message: /,
                  "",
                );
                fs.writeFileSync(fn, JSON.stringify(task.options, null, 2));
              }
            }

            const fixturePath = `${path.relative(
              rootPath,
              fixturesPath,
            )}/${name}/${task.actual.filename}`;
            throw new FixtureError(err, fixturePath, task.actual.code);
          }
        });
      });
    });
  });
}

export function runThrowTestsWithEstree(fixturesPath, parseFunction) {
  const fixtures = getFixtures(fixturesPath);

  Object.keys(fixtures).forEach(function (name) {
    fixtures[name].forEach(function (testSuite) {
      testSuite.tests.forEach(function (task) {
        task.options.plugins = task.options.plugins || [];
        task.options.plugins.push("estree");

        const testFn = task.disabled ? it.skip : it;

        testFn(name + "/" + testSuite.title + "/" + task.title, function () {
          try {
            runTest(task, parseFunction, true);
          } catch (err) {
            const fixturePath = `${path.relative(
              rootPath,
              fixturesPath,
            )}/${name}/${task.actual.filename}`;
            throw new FixtureError(err, fixturePath, task.actual.code);
          }
        });
      });
    });
  });
}

// compact loc properties into a single line
function compactFixture(jsonString) {
  return jsonString.replace(
    /"start": (\d+),\s+"end": (\d+),\s+"loc": \{\s+"start":\s\{\s+"line": (\d+),\s+"column": (\d+)\s+\},\s+"end":\s\{\s+"line": (\d+),\s+"column": (\d+)\s+\s+\}(?:,\s+"identifierName": "(\S+)")?\s+\}/gm,
    (_, p1, p2, p3, p4, p5, p6, p7) => {
      return (
        `"start":${p1},"end":${p2},"loc":{"start":{"line":${p3},"column":${p4}},"end":{"line":${p5},"column":${p6}}` +
        (p7 ? `,"identifierName":"${p7}"}` : "}")
      );
    },
  );
}

function save(test, ast) {
  fs.writeFileSync(
    test.expect.loc,
    compactFixture(JSON.stringify(ast, (k, v) => serialize(v), 2)),
  );
}

/**
 * run parser on given tests
 *
 * @param {Test} A {@link packages/babel-helper-fixtures/src/index.js Test} instance
 generated from `getFixtures`
 * @param {*} parseFunction A parser with the same interface of `@babel/parser#parse`
 * @param {boolean} [compareErrorsOnly=false] Whether we should only compare the "errors"
 * of generated ast against the expected AST. Used for `runThrowTestsWithEstree` where an
 * ESTree AST is generated but we want to make sure `@babel/parser` still throws expected
 * recoverable errors on given code locations.
 * @returns {void}
 */
function runTest(test, parseFunction, compareErrorsOnly = false) {
  const opts = test.options;

  if (opts.throws && test.expect.code) {
    throw new Error(
      "File expected.json exists although options specify throws. Remove expected.json.",
    );
  }

  let ast;
  try {
    ast = parseFunction(test.actual.code, { errorRecovery: true, ...opts });
  } catch (err) {
    if (opts.throws) {
      if (err.message === opts.throws) {
        return;
      } else {
        if (process.env.OVERWRITE) {
          const fn = path.dirname(test.expect.loc) + "/options.json";
          test.options = test.options || {};
          test.options.throws = err.message;
          fs.writeFileSync(fn, JSON.stringify(test.options, null, 2));
          return;
        }

        err.message =
          "Expected error message: " +
          opts.throws +
          ". Got error message: " +
          err.message;
        throw err;
      }
    }

    throw err;
  }

  if (ast.comments && !ast.comments.length) delete ast.comments;
  if (ast.errors && !ast.errors.length) delete ast.errors;

  if (!test.expect.code && !opts.throws && !process.env.CI) {
    test.expect.loc += "on";
    return save(test, ast);
  }

  if (opts.throws) {
    if (process.env.OVERWRITE) {
      const fn = path.dirname(test.expect.loc) + "/options.json";
      test.options = test.options || {};
      delete test.options.throws;
      const contents = JSON.stringify(test.options, null, 2);
      if (contents === "{}") {
        fs.unlinkSync(fn);
      } else {
        fs.writeFileSync(fn, JSON.stringify(test.options, null, 2));
      }
      test.expect.loc += "on";
      return save(test, ast);
    }

    throw new Error(
      "Expected error message: " + opts.throws + ". But parsing succeeded.",
    );
  } else if (compareErrorsOnly) {
    const mis = misMatch(JSON.parse(test.expect.code).errors, ast.errors);
    if (mis) {
      throw new Error(mis);
    }
  } else {
    const mis = misMatch(JSON.parse(test.expect.code), ast);

    if (mis) {
      if (process.env.OVERWRITE) {
        return save(test, ast);
      }
      throw new Error(mis);
    }
  }
}

function serialize(value) {
  if (typeof value === "bigint") {
    return {
      [serialized]: "BigInt",
      value: value.toString(),
    };
  } else if (value instanceof RegExp) {
    return {
      [serialized]: "RegExp",
      source: value.source,
      flags: value.flags,
    };
  } else if (value instanceof Error) {
    // Errors are serialized to a simple string, because are used frequently
    return value.toString();
  }
  return value;
}

function ppJSON(v) {
  if (typeof v === "bigint" || v instanceof Error || v instanceof RegExp) {
    return ppJSON(serialize(v));
  }

  if (v && typeof v === "object" && v[serialized]) {
    switch (v[serialized]) {
      case "BigInt":
        return typeof BigInt === "undefined" ? "null" : v.value + "n";
      case "RegExp":
        return `/${v.source}/${v.flags}`;
    }
  } else if (typeof v === "string" && /^[A-Z][a-z]+Error: /.test(v)) {
    // Errors are serialized to a simple string, because are used frequently
    return v;
  }

  return JSON.stringify(v, (k, v) => serialize(v), 2);
}

function addPath(str, pt) {
  if (str.charAt(str.length - 1) === ")") {
    return str.slice(0, str.length - 1) + "/" + pt + ")";
  } else {
    return str + " (" + pt + ")";
  }
}

function misMatch(exp, act) {
  if (
    act instanceof RegExp ||
    act instanceof Error ||
    typeof act === "bigint" ||
    (exp && typeof exp === "object" && exp[serialized])
  ) {
    const left = ppJSON(exp);
    const right = ppJSON(act);
    if (left !== right) return left + " !== " + right;
  } else if (Array.isArray(exp)) {
    if (!Array.isArray(act)) return ppJSON(exp) + " != " + ppJSON(act);
    if (act.length != exp.length) {
      return "array length mismatch " + exp.length + " != " + act.length;
    }
    for (let i = 0; i < act.length; ++i) {
      const mis = misMatch(exp[i], act[i]);
      if (mis) return addPath(mis, i);
    }
  } else if (!exp || !act || typeof exp != "object" || typeof act != "object") {
    if (exp !== act && typeof exp != "function") {
      return ppJSON(exp) + " !== " + ppJSON(act);
    }
  } else {
    for (const prop of Object.keys(exp)) {
      const mis = misMatch(exp[prop], act[prop]);
      if (mis) return addPath(mis, prop);
    }

    for (const prop of Object.keys(act)) {
      if (typeof act[prop] === "function") {
        continue;
      }

      if (!(prop in exp) && act[prop] !== undefined) {
        return `Did not expect a property '${prop}'`;
      }
    }
  }
}
