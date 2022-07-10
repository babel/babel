/*
Copies tests from the @babel/parser's TypeScript test suite to @babel/generator.
*/
const fs = require("fs");
const { join } = require("path");

const testsFrom = join(
  __dirname,
  "../../babel-parser/test/fixtures/typescript"
);
const testsTo = join(__dirname, "../test/fixtures/typescript");

fs.rmdirSync(testsTo, { recursive: true });
fs.mkdirSync(testsTo);

fs.copyFileSync(join(testsFrom, "options.json"), join(testsTo, "options.json"));

for (const groupName of fs.readdirSync(testsFrom)) {
  if (groupName === "options.json") continue;

  const groupFromDir = join(testsFrom, groupName);
  const testNames = fs.readdirSync(groupFromDir);
  const groupHasOptions = testNames.includes("options.json");

  for (const testName of testNames) {
    if (testName === "options.json") {
      continue;
    }

    const testFromDir = join(groupFromDir, testName);
    const testToDir = join(testsTo, `${groupName}-${testName}`);

    let optionsJsonFrom;
    const ownOptions = join(testFromDir, "options.json");
    if (fs.existsSync(ownOptions)) {
      const options = JSON.parse(fs.readFileSync(ownOptions));
      // Don't include a test that doesn't parse or does not provide babel AST
      if (
        options.throws ||
        !options.plugins ||
        options.plugins.indexOf("estree") >= 0
      ) {
        continue;
      }
      optionsJsonFrom = ownOptions;
    } else if (groupHasOptions) {
      // Copy group options to each individual one, since we don't have groups here.
      optionsJsonFrom = join(groupFromDir, "options.json");
    }

    fs.rmdirSync(testToDir, { recursive: true });
    fs.mkdirSync(testToDir);
    if (optionsJsonFrom) {
      fs.copyFileSync(optionsJsonFrom, join(testToDir, "options.json"));
    }
    if (fs.existsSync(join(testFromDir, "input.js"))) {
      fs.copyFileSync(
        join(testFromDir, "input.js"),
        join(testToDir, "input.js")
      );
    } else if (fs.existsSync(join(testFromDir, "input.tsx"))) {
      fs.copyFileSync(
        join(testFromDir, "input.tsx"),
        join(testToDir, "input.tsx")
      );
    } else if (fs.existsSync(join(testFromDir, "input.jsx"))) {
      fs.copyFileSync(
        join(testFromDir, "input.jsx"),
        join(testToDir, "input.jsx")
      );
    } else if (fs.existsSync(join(testFromDir, "input.ts"))) {
      fs.copyFileSync(
        join(testFromDir, "input.ts"),
        join(testToDir, "input.ts")
      );
    }
  }
}
