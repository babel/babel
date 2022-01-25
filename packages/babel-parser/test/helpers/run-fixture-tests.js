import { multiple as getFixtures } from "@babel/helper-fixtures";
import { writeFileSync, existsSync, unlinkSync } from "fs";
import { join } from "path";
import Difference from "./difference.js";
import FixtureError from "./fixture-error.js";
import toFuzzedOptions from "./to-fuzzed-options.js";
import { serialize, deserialize } from "./serialization.js";
import toContextualSyntaxError from "./to-contextual-syntax-error.js";

const { OVERWRITE } = process.env;

export default function runFixtureTests(
  fixturesPath,
  parseFunction,
  onlyCompareErrors = false,
) {
  const fixtures = getFixtures(fixturesPath);

  for (const [name, testSuites] of Object.entries(fixtures)) {
    for (const { title, tests } of testSuites) {
      for (const test of tests) {
        runAutogeneratedParseTests(
          parseFunction,
          `${name}/${title}`,
          test,
          onlyCompareErrors,
        );
      }
    }
  }
}

function runAutogeneratedParseTests(
  parse,
  prefix,
  task,
  onlyCompareErrors = false,
) {
  const { expect, options } = task;
  const testFn = task.disabled ? it.skip : it;

  const expected = deserialize(expect.loc, options, expect.code);
  const title = `${prefix}/${task.title}`;
  const toStartPosition = ({ startLine = 1, startColumn = 0 }) =>
    `(${startLine}, ${startColumn})`;

  toFuzzedOptions(options)
    .map(([adjust, options], index) => ({
      ...task,
      title: `${title} start = ${toStartPosition(options)}`,
      adjust,
      options,
      expected,
      filename: task.actual.loc,
      source: task.actual.code,
      original: index === 0,
    }))
    .forEach(test =>
      testFn(test.title, () => runParseTest(parse, test, onlyCompareErrors)),
    );
}

const toJustErrors = result => ({
  threw: result.threw,
  ast: result.ast && { errors: result.ast.errors },
});

function runParseTest(parse, test, onlyCompareErrors) {
  const { adjust, expected, source, filename, options } = test;

  if (expected.threw && expected.ast) {
    throw Error(
      "File expected.json exists although options specify throws. Remove expected.json.",
    );
  }

  const actual = parseWithRecovery(parse, source, filename, options);
  const difference = new Difference(
    adjust,
    onlyCompareErrors ? toJustErrors(expected) : expected,
    onlyCompareErrors ? toJustErrors(actual) : actual,
  );
  const error = FixtureError.fromDifference(difference, actual);

  // No differences means we passed and there's nothing left to do.
  if (error === FixtureError.None) return;

  // If we're not overwriting the current values with whatever we get this time
  // around, then we have a legitimate error that we need to report.
  if (!OVERWRITE) throw error;

  // We only write the output of the original test, not all it's auto-generated
  // variations.
  if (!test.original) return;

  // When only comparing errors, we don't want to overwrite the AST JSON because
  // it belongs to a different test.
  if (onlyCompareErrors) return;

  const [extended, serialized] = serialize(actual.ast);
  const testLocation = test.optionsDir;
  const extension = extended ? ".extended.json" : ".json";
  const outputLocation = join(testLocation, `output${extension}`);

  const reverseExtension = extended ? ".json" : ".extended.json";
  const previousLocation = join(testLocation, `output${reverseExtension}`);

  // If we're switching formats, make sure to remove the old format.
  if (previousLocation !== outputLocation && existsSync(previousLocation)) {
    unlinkSync(reverseExtension);
  }

  // Remove the other one...
  writeFileSync(outputLocation, serialized, "utf-8");
}

function parseWithRecovery(parse, source, filename, options) {
  try {
    const ast = parse(source, { errorRecovery: true, ...options });

    // Normalize the AST
    //
    // TODO: We should consider doing something more involved here as
    // we may miss bugs where we put unexpected falsey objects in these
    // properties.
    if (ast.comments && !ast.comments.length) delete ast.comments;
    if (ast.errors && !ast.errors.length) delete ast.errors;
    else {
      ast.errors = ast.errors.map(error =>
        toContextualSyntaxError(error, source, filename, options),
      );
    }

    return { threw: false, ast };
  } catch (error) {
    return {
      threw: toContextualSyntaxError(error, source, filename, options),
      ast: false,
    };
  }
}
