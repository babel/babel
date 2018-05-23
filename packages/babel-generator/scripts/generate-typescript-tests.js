/*
Copies tests from the @babel/parser's TypeScript test suite to @babel/generator.
*/
const {
  copySync,
  emptyDirSync,
  existsSync,
  readdirSync,
  readFileSync,
} = require("fs-extra");
const { join } = require("path");

const testsFrom = join(
  __dirname,
  "../../babel-parser/test/fixtures/typescript"
);
const testsTo = join(__dirname, "../test/fixtures/typescript");

emptyDirSync(testsTo);

copySync(join(testsFrom, "options.json"), join(testsTo, "options.json"));

for (const groupName of readdirSync(testsFrom)) {
  if (groupName === "options.json") continue;

  const groupFromDir = join(testsFrom, groupName);
  const testNames = readdirSync(groupFromDir);
  const groupHasOptions = testNames.includes("options.json");

  for (const testName of testNames) {
    if (testName === "options.json") {
      continue;
    }

    const testFromDir = join(groupFromDir, testName);
    const testToDir = join(testsTo, `${groupName}-${testName}`);

    let optionsJsonFrom;
    const ownOptions = join(testFromDir, "options.json");
    if (existsSync(ownOptions)) {
      const options = JSON.parse(readFileSync(ownOptions));
      // Don't include a test that doesn't parse or does not provide babel AST
      if (options.throws || options.plugins.indexOf("estree") >= 0) {
        continue;
      }
      optionsJsonFrom = ownOptions;
    } else if (groupHasOptions) {
      // Copy group options to each individual one, since we don't have groups here.
      optionsJsonFrom = join(groupFromDir, "options.json");
    }

    emptyDirSync(testToDir);
    if (optionsJsonFrom) {
      copySync(optionsJsonFrom, join(testToDir, "options.json"));
    }
    copySync(join(testFromDir, "actual.js"), join(testToDir, "actual.js"));
  }
}
