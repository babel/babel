import { Linter } from "eslint";
import fs from "fs";
import path from "path";
import * as parser from "../../../../../babel-eslint-parser/lib/index.cjs";
import { fileURLToPath } from "url";

const linter = new Linter();
linter.defineParser("@babel/eslint-parser", parser);

const paths = {
  fixtures: path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../..",
    "fixtures",
    "rules",
  ),
};

const encoding = "utf8";
const errorLevel = 2;

const baseEslintOpts = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "script",
    requireConfigFile: false,
    babelOptions: { configFile: false },
  },
};

/**
 * Load a fixture and run linter.verify() on it.
 * Pass the return value to done().
 * @param object opts
 * @param function done
 */
function lint(opts) {
  return new Promise((resolve, reject) => {
    readFixture(opts.fixture, (err, src) => {
      if (err) return reject(err);
      resolve(linter.verify(src, opts.eslint));
    });
  });
}

/**
 * Read a fixture file, passing the content to done().
 * @param string|array id
 * @param function done
 */
function readFixture(id, done) {
  if (Array.isArray(id)) id = path.join.apply(path, id);
  if (!path.extname(id)) id += ".js";
  fs.readFile(path.join(paths.fixtures, id), encoding, done);
}
// readFixture

describe("Rules:", () => {
  // eslint-disable-next-line jest/valid-describe-callback
  describe("`strict`", strictSuite);
});

function strictSuite() {
  const ruleId = "strict";

  describe("when set to 'never'", () => {
    const eslintOpts = Object.assign({}, baseEslintOpts, {
      rules: {},
    });
    eslintOpts.rules[ruleId] = [errorLevel, "never"];

    ["global-with", "function-with"].forEach(fixture => {
      it(`should error on ${
        fixture.match(/^[^-]+/)[0]
      } directive`, async () => {
        const report = await lint({
          fixture: ["strict", fixture],
          eslint: eslintOpts,
        });
        expect(report[0].ruleId).toBe(ruleId);
      });
    });
  });

  describe("when set to 'global'", () => {
    const eslintOpts = Object.assign({}, baseEslintOpts, {
      rules: {},
    });
    eslintOpts.rules[ruleId] = [errorLevel, "global"];

    it("shouldn't error on single global directive", async () => {
      const report = await lint({
        fixture: ["strict", "global-with"],
        eslint: eslintOpts,
      });
      expect(report.length).toBe(0);
    });

    it("should error twice on global directive: no and function directive: yes", async () => {
      const report = await lint({
        fixture: ["strict", "function-with"],
        eslint: eslintOpts,
      });
      expect(report[0].ruleId).toBe(ruleId);
    });

    it("should error on function directive", async () => {
      const report = await lint({
        fixture: ["strict", "global-with-function-with"],
        eslint: eslintOpts,
      });
      expect(report[0].ruleId).toBe(ruleId);
      // This is to make sure the test fails prior to adapting Babel AST
      // directive representation to ESLint format. Otherwise it reports an
      // error for missing global directive that masquerades as the expected
      // result of the previous assertion.
      expect(report[0].nodeType).not.toBe("Program");
    });

    it("should error on no directive", async () => {
      const report = await lint({
        fixture: ["strict", "none"],
        eslint: eslintOpts,
      });
      expect(report[0].ruleId).toBe(ruleId);
    });
  });

  describe("when set to 'function'", () => {
    const eslintOpts = Object.assign({}, baseEslintOpts, {
      rules: {},
    });
    eslintOpts.rules[ruleId] = [errorLevel, "function"];

    it("shouldn't error on single function directive", async () => {
      const report = await lint({
        fixture: ["strict", "none"],
        eslint: eslintOpts,
      });
      expect(report.length).toBe(0);
    });

    it("should error twice on function directive: no and global directive: yes", async () => {
      const report = await lint({
        fixture: ["strict", "global-with-function-without"],
        eslint: eslintOpts,
      });
      [0, 1].forEach(i => {
        expect(report[i].ruleId).toBe(ruleId);
      });
    });

    it("should error on only global directive", async () => {
      const report = await lint({
        fixture: ["strict", "global-with"],
        eslint: eslintOpts,
      });
      expect(report[0].ruleId).toBe(ruleId);
    });

    it("should error on extraneous global directive", async () => {
      const report = await lint({
        fixture: ["strict", "global-with-function-with"],
        eslint: eslintOpts,
      });
      expect(report[0].ruleId).toBe(ruleId);
      expect(report[0].nodeType.indexOf("Function")).toBe(-1);
    });
  });
}
