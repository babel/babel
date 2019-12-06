import { multiple as getFixtures } from "@babel/helper-fixtures";
import { codeFrameColumns } from "@babel/code-frame";
import fs from "fs";
import path from "path";

const rootPath = path.join(__dirname, "../../../..");

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
        `at fixture (${fixturePath}:${previousError.loc.line}:${previousError
          .loc.column + 1})\n`;
    }

    this.stack =
      previousError.constructor.name +
      ": " +
      previousError.message +
      "\n" +
      fixtureStackFrame +
      previousError.stack
        .split("\n")
        .slice(messageLines)
        .join("\n");
  }
}

// https://github.com/estree/estree/blob/master/es2020.md#bigintliteral
function bigIntReplacer(key, value) {
  return typeof value === "bigint" ? null : value;
}

export function runFixtureTests(fixturesPath, parseFunction) {
  const fixtures = getFixtures(fixturesPath);

  Object.keys(fixtures).forEach(function(name) {
    fixtures[name].forEach(function(testSuite) {
      testSuite.tests.forEach(function(task) {
        const testFn = task.disabled ? it.skip : it;

        testFn(name + "/" + testSuite.title + "/" + task.title, function() {
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
                fs.writeFileSync(
                  fn,
                  JSON.stringify(task.options, bigIntReplacer, "  "),
                );
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

  Object.keys(fixtures).forEach(function(name) {
    fixtures[name].forEach(function(testSuite) {
      testSuite.tests.forEach(function(task) {
        if (!task.options.throws) return;

        task.options.plugins = task.options.plugins || [];
        task.options.plugins.push("estree");

        const testFn = task.disabled ? it.skip : it;

        testFn(name + "/" + testSuite.title + "/" + task.title, function() {
          try {
            runTest(task, parseFunction);
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

function save(test, ast) {
  // Ensure that RegExp and Errors are serialized as strings
  forceToString(RegExp, () =>
    forceToString(Error, () =>
      fs.writeFileSync(
        test.expect.loc,
        JSON.stringify(ast, bigIntReplacer, "  "),
      ),
    ),
  );
}

function forceToString(obj, cb) {
  const { toJSON } = obj.prototype;
  obj.prototype.toJSON = obj.prototype.toString;
  cb();
  obj.prototype.toJSON = toJSON;
}

function runTest(test, parseFunction) {
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
          fs.writeFileSync(
            fn,
            JSON.stringify(test.options, bigIntReplacer, "  "),
          );
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
      const contents = JSON.stringify(test.options, bigIntReplacer, "  ");
      if (contents === "{}") {
        fs.unlinkSync(fn);
      } else {
        fs.writeFileSync(
          fn,
          JSON.stringify(test.options, bigIntReplacer, "  "),
        );
      }
      test.expect.loc += "on";
      return save(test, ast);
    }

    throw new Error(
      "Expected error message: " + opts.throws + ". But parsing succeeded.",
    );
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

function ppJSON(v) {
  v = v instanceof RegExp || v instanceof Error ? v.toString() : v;
  return JSON.stringify(v, bigIntReplacer, 2);
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
    exp instanceof RegExp ||
    act instanceof RegExp ||
    exp instanceof Error ||
    act instanceof Error
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
