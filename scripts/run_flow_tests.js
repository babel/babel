"use strict";

const path = require("path");
const chalk = require("chalk");
const parse = require("..").parse;

const flowDirectory = path.join(__dirname, "../build/flow");
const hardcodedTestFile = path.join(flowDirectory, "src/parser/test/hardcoded_tests.js");

const hardcodedTests = require(hardcodedTestFile).sections;
const options = {
  plugins: [
    "jsx",
    "flow",
    "asyncGenerators",
    "objectRestSpread"
  ],
  sourceType: "module",
};

const flowOptionsMapping = {
  "esproposal_class_instance_fields": "classProperties",
  "esproposal_class_static_fields": "classProperties",
  "esproposal_export_star_as": "exportExtensions",
  "esproposal_decorators": "decorators",
};

let failedTests = 0;
let successTests = 0;
Object.keys(hardcodedTests).forEach((sectionName) => {
  console.log("");
  console.log(`### ${sectionName} ###`);
  Object.keys(hardcodedTests[sectionName]).forEach((code) => {
    const shouldSuccess = !Object.keys(hardcodedTests[sectionName][code])
      .some(
        (key) => {
          const value = hardcodedTests[sectionName][code][key];
          if (key === "errors.length" && value === 0) return false;
          if (key === "errors" && Array.isArray(value) && value.length === 0) return false;
          if (!key.startsWith("errors")) return false;

          return true;
        }
      );

    const parserOptions = hardcodedTests[sectionName][code]["%parse_options%"];
    const babylonOptions = Object.assign({}, options );
    babylonOptions.plugins = babylonOptions.plugins.slice();

    if (parserOptions) {
      Object.keys(parserOptions).forEach((option) => {
        if (!parserOptions[option]) return;
        if (!flowOptionsMapping[option]) throw new Error("Parser options not mapped " + option);
        babylonOptions.plugins.push(flowOptionsMapping[option]);
      });
    }

    let failed = false;
    let exception = null;
    try {
      parse(code, babylonOptions);
    } catch (e) {
      exception = e;
      failed = true;
    }

    if (!failed && shouldSuccess || failed && !shouldSuccess) {
      successTests++;
      console.log(chalk.green(`✔ ${code}`));
    } else {
      failedTests++;
      printErrorMessage(code, exception, shouldSuccess, hardcodedTests[sectionName][code], babylonOptions)
    }
  });
});

function printErrorMessage(code, exception, shouldSuccess, data, babylonOptions) {
  console.log(chalk.red(`✘ ${code}`));
  console.log(chalk.yellow(`  Should ${shouldSuccess ? "parse successfully" : `fail parsing`}, but did not`));
  if (exception) console.log(chalk.yellow(`  Failed with: \`${exception.message}\``));
  if (data["errors.0.message"]) console.log(chalk.yellow(`  Expected error message similar to: \`${data["errors.0.message"]}\``));
  console.log(chalk.yellow(`  Active plugins: ${JSON.stringify(babylonOptions.plugins)}`));

}

console.log();
console.log(chalk.green(`✔ ${successTests} tests passed`));
console.log(chalk.red(`✔ ${failedTests} tests failed`));

process.exit(failedTests > 0 ? 1 : 0);

