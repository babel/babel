// @ts-check
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import TestRunner from "../utils/parser-test-runner.js";
import ErrorCodes from "./error-codes.js";

/**
 * Get the encoding of a file based on its BOM.
 * @param {string} path
 * @returns {"utf-8" | "utf-16le" | "utf-16be"}
 */
const getEncoding = path =>
  ({ fffe: "utf-16le", feff: "utf-16be" })[
    fs.readFileSync(path).subarray(0, 2).toString("hex")
  ] || "utf-8";

const ErrorCodeRegExp = new RegExp(ErrorCodes.join("|"));

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

function generateTSBaselineErrorMap() {
  const errorMap = new Map();
  const baselineDir = path.join(TSTestsPath, "baselines/reference");
  for (const filename of fs.readdirSync(baselineDir)) {
    if (filename.endsWith(".errors.txt")) {
      const testBasenameWithoutOptions = filename
        .slice(0, -".errors.txt".length)
        .replace(/\(\S+\)$/, "");
      errorMap.set(testBasenameWithoutOptions, filename);
    }
  }
  return errorMap;
}

const TSBaselineErrorMap = generateTSBaselineErrorMap();

// Check if the baseline errors contain the codes that should also be thrown from babel-parser
function baselineContainsParserErrorCodes(testName) {
  const testBasename = path.basename(testName, path.extname(testName));
  if (!TSBaselineErrorMap.has(testBasename)) {
    return false;
  }
  return ErrorCodeRegExp.test(
    fs.readFileSync(
      path.join(
        TSTestsPath,
        "baselines/reference",
        TSBaselineErrorMap.get(testBasename)
      ),
      "utf8"
    )
  );
}

const IgnoreRegExp = /@noTypesAndSymbols|ts-ignore|\n#!/;

const runner = new TestRunner({
  testDir: path.join(TSTestsPath, "./cases/compiler"),
  allowlist: path.join(dirname, "allowlist.md"),
  logInterval: 50,
  shouldUpdate: process.argv.includes("--update-allowlist"),

  *getTests() {
    for (const test of loadTests(this.testDir)) {
      if (IgnoreRegExp.test(test.contents)) {
        yield { id: test.name, expectedError: false, contents: "" };
        continue;
      }

      const files = toFiles(test.contents, test.name);
      const expectedError =
        files.length > 0 && baselineContainsParserErrorCodes(test.name);

      yield {
        id: test.name,
        expectedError,
        contents: files,
        fileName: test.name,
      };
    }
  },
});

const AlwaysStrictRegExp = /^\/\/\s*@alwaysStrict:\s*true/m;
const jsxPragmaRegExp = /^\/\/\s*@jsx:\s*\S+/m;

function toFiles(contents, name) {
  const rawContents = contents;
  const strictMode = AlwaysStrictRegExp.test(rawContents) || void 0;
  const isJSX = jsxPragmaRegExp.test(rawContents);
  return splitTwoslashCodeInfoFiles(rawContents, "default", `${name}/`)
    .map(([filename, lines]) => [
      filename.replace(/\/default$/, ""),
      lines.join("\n"),
    ])
    .filter(
      ([sourceFilename, contents]) =>
        !/\.(?:css|json|md)$/.test(sourceFilename) &&
        // Some test cases deliberately include non-JS content to assert that they are not
        // read by tsc due to an error thrown before.
        !/^\s*(?:This file is not|Nor is this one|content not parsed|not read)/m.test(
          contents
        ) &&
        contents.split("\n").some(line => !/^\s*$|^\/\/[^\n]*$/.test(line))
    )
    .map(([sourceFilename, contents]) => ({
      contents,
      sourceFilename,
      sourceType: "unambiguous",
      strictMode,
      plugins: [
        /\.[cm]?tsx?$/.test(sourceFilename) && [
          "typescript",
          { dts: sourceFilename.endsWith(".d.ts") },
        ],
        "decorators-legacy", // For TS parameter decorator
        "decoratorAutoAccessors",
        (isJSX || /\.[tj]sx$/.test(sourceFilename)) && "jsx",
      ].filter(plugin => !!plugin),
    }));
}

const BracketedFileRegExp = /\/\/\/\/\s*\[([^\]]+)\][^\n]*(?:\n|$)/;
const AtFileRegExp = /(?:^|\n)\/\/\s*@filename:\s*(\S+)\s*(?:\n|$)/i;

// Modified from: https://github.com/microsoft/TypeScript-Website/blob/v2/packages/ts-twoslasher/src/index.ts
/**
 * Split a code string into multiple files based on twoslash `//` comments.
 * @param {string} code
 * @param {string} defaultFileName
 * @param {string} root
 * @returns {Array<[string, string[]]>}
 */
function splitTwoslashCodeInfoFiles(code, defaultFileName, root = "") {
  const lines = code.split(/\r\n?|\n/);

  let nameForFile = code.includes(`@filename: ${defaultFileName}`)
    ? "global.ts"
    : defaultFileName;
  let currentFileContent = [];
  /**
   * @type {Array<[string, string[]]>}
   */
  const fileMap = [];

  for (const line of lines) {
    const newFileName = BracketedFileRegExp.test(line)
      ? // @ts-expect-error checked above
        line.match(BracketedFileRegExp)[1]
      : (line.match(AtFileRegExp)?.[1] ?? false);
    if (newFileName) {
      fileMap.push([root + nameForFile, currentFileContent]);
      nameForFile = newFileName;
      currentFileContent = [];
    } else {
      currentFileContent.push(line);
    }
  }
  fileMap.push([root + nameForFile, currentFileContent]);
  return fileMap;
}

runner.run().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
