"use strict";
const path = require("path");
const chalk = require("chalk");
const generateValidators = require("./generators/generateValidators");
const generateAsserts = require("./generators/generateAsserts");
const generateVirtualTypes = require("./generators/generateVirtualTypes");
const format = require("../../../scripts/utils/formatCode");
const writeFile = require("../../../scripts/utils/writeFileAndMkDir");

const baseDir = path.join(__dirname, "../src");

console.log("Generating @babel/traverse dynamic functions");

const validatorsFile = path.join(baseDir, "path/generated/validators.ts");
writeFile(validatorsFile, format(generateValidators(), validatorsFile));
console.log(`  ${chalk.green("✔")} Generated validators`);

const assertsFile = path.join(baseDir, "path/generated/assetions.ts");
writeFile(assertsFile, format(generateAsserts(), assertsFile));
console.log(`  ${chalk.green("✔")} Generated asserts`);

const virtualTypesFile = path.join(
  baseDir,
  "path/lib/generated/virtual-types.ts"
);
writeFile(virtualTypesFile, format(generateVirtualTypes(), virtualTypesFile));
console.log(`  ${chalk.green("✔")} Generated virtual types`);
