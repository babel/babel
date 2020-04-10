"use strict";
const path = require("path");
const chalk = require("chalk");
const generateValidators = require("./generators/generateValidators");
const generateAsserts = require("./generators/generateAsserts");
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
