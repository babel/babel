// @ts-check
import path from "node:path";
import fs, { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import TestRunner from "../utils/parser-test-runner.js";
import { TestCaseParser } from "./_harnessIO.cjs";
import * as ts from "typescript";

/**
 * Get the encoding of a file based on its BOM.
 * @param {string} path
 * @returns {"utf-8" | "utf-16le" | "utf-16be"}
 */
const getEncoding = path =>
  ({ fffe: "utf-16le", feff: "utf-16be" })[
    fs.readFileSync(path).subarray(0, 2).toString("hex")
  ] || "utf-8";

const dirname = path.dirname(fileURLToPath(import.meta.url));

function* loadTests(dir) {
  const names = fs.readdirSync(dir).map(name => [name, path.join(dir, name)]);

  for (const [name, filename] of names) {
    const encoding = getEncoding(filename);
    if (encoding === "utf-16be" || encoding === "utf-16le") continue;
    yield {
      name,
      contents: fs.readFileSync(filename, encoding),
    };
  }
}

const TSTestsPath = path.join(dirname, "../../../build/typescript/tests");

/**
 *
 * @param {TestCaseParser.TestCaseContent} testCase
 */
function hasErrorsWithTS(testCase) {
  /**
   * @type {ts.CompilerOptions}
   */
  const options = {
    noLib: true,
    noResolve: true,
  };
  const host = ts.createCompilerHost(options);
  host.readFile = fileName => {
    const unit = testCase.testUnitData.find(unit => unit.name === fileName);
    return unit ? unit.content : readFileSync(fileName, "utf8");
  };

  const program = ts.createProgram({
    rootNames: testCase.testUnitData.map(unit => unit.name),
    options,
    host,
  });
  const syntacticDiagnostics = program.getSyntacticDiagnostics();
  const semanticDiagnostics = program.getSemanticDiagnostics();
  return syntacticDiagnostics.length > 0 || semanticDiagnostics.length > 0;
}

const IgnoreRegExp = /@noTypesAndSymbols|ts-ignore|\n#!/;
const AlwaysStrictRegExp = /^\/\/\s*@alwaysStrict:\s*true/m;

const runner = new TestRunner({
  testDir: path.join(TSTestsPath, "./cases/compiler"),
  allowlist: path.join(dirname, "allowlist.txt"),
  logInterval: 50,
  shouldUpdate: process.argv.includes("--update-allowlist"),

  *getTests() {
    for (const test of loadTests(this.testDir)) {
      if (IgnoreRegExp.test(test.contents)) {
        yield { id: test.name, expectedError: false, contents: "" };
        continue;
      }

      const strictMode = AlwaysStrictRegExp.test(test.contents) || void 0;
      const testCase = TestCaseParser.makeUnitsFromTest(
        test.contents,
        path.join(this.testDir, test.name)
      );
      const files = testCase.testUnitData
        .map(unit => [unit.name, unit.content])
        .filter(([sourceFilename, contents]) => {
          if (contents == null) return false;
          return (
            !/\.(?:css|js|json|md)$/.test(sourceFilename) &&
            contents.split("\n").some(line => !/^\s*$|^\/\/[^\n]*$/.test(line))
          );
        })
        .map(([sourceFilename, contents]) => ({
          contents,
          sourceFilename,
          sourceType: "unambiguous",
          strictMode,
          plugins: [
            ["typescript", { dts: sourceFilename.endsWith(".d.ts") }],
            "decorators-legacy", // For TS parameter decorator
            "decoratorAutoAccessors",
            "importAssertions",
            /\.[tj]sx$/.test(sourceFilename) && "jsx",
          ].filter(plugin => !!plugin),
        }));

      const expectedError = files.length > 0 && hasErrorsWithTS(testCase);

      yield { id: test.name, expectedError, contents: files };
    }
  },
});

runner.run().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
