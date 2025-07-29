// @ts-check
/**
 * Usage:
 * # Update AST/output.js for Babel 8
 * OVERWRITE=1 BABEL_8_BREAKING=1 yarn jest
 * # Run this script to create all Babel 7 tests required for the Babel 8 AST changes
 * node ./scripts/generate-babel-7-tests.mjs
 * # Update AST/output.js for Babel 7
 * OVERWRITE=1 yarn jest
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, cpSync } from "node:fs";
import { dirname, join, basename } from "node:path";

/**
 * Get a list of unstaged modified test output files.
 * @returns {string[]} - The list of unstaged modified test output files.
 */
function getUnstagedModifiedTestOutput() {
  try {
    // Get the status and filter for unstaged files
    const output = execSync(
      "git status --porcelain=v1 -z -- './packages/*/test/fixtures/**/output.*' './packages/*/test/fixtures/**/stdout.txt' './packages/*/test/fixtures/**/stderr.txt'",
      { encoding: "utf-8" }
    );

    const files = [];
    // Filter for unstaged changes
    for (const line of output.split("\0")) {
      if (line[1] === "M") {
        files.push(line.slice(3));
      }
    }
    return files;
  } catch (error) {
    console.error("Error getting git status:", error.message);
    return [];
  }
}

/**
 * Assign properties from input to a JSON file, creating or updating it.
 * @param {string} jsonFile - The path to the JSON file.
 * @param {object} inputProperties - The properties to assign.
 */
function assignJSONFile(jsonFile, inputProperties) {
  let options = inputProperties;
  const jsonFileExists = existsSync(jsonFile);
  if (jsonFileExists) {
    try {
      options = {
        ...JSON.parse(readFileSync(jsonFile, "utf-8")),
        ...inputProperties,
      };
    } catch (error) {
      console.error(`Error reading ${jsonFile}:`, error.message);
    }
  }
  try {
    writeFileSync(jsonFile, JSON.stringify(options, null, 2) + "\n", "utf-8");
    console.log(`${jsonFileExists ? "Updated" : "Created"} ${jsonFile}`);
  } catch (error) {
    console.error(`Error writing ${jsonFile}:`, error.message);
  }
}

/**
 * Update the options.json files for Babel 8 breaking changes.
 * @param {string[]} files - The files to update.
 */
function updateBabel8BreakingTrue(files) {
  for (const file of files) {
    const dirPath = dirname(file);
    const optionsPath = join(dirPath, "options.json");
    assignJSONFile(optionsPath, { BABEL_8_BREAKING: true });
  }
}

/**
 * Create Babel 7 tests for the given files.
 * @param {string[]} files - The files to create tests for.
 */
function createBabel7Tests(files) {
  for (const file of files) {
    const dirPath = dirname(file);
    const parentDir = dirname(dirPath);
    const folderName = basename(dirPath);
    const babel7Dir = join(parentDir, `${folderName}-babel-7`);
    const optionsPath = join(babel7Dir, "options.json");

    try {
      if (!existsSync(babel7Dir)) {
        cpSync(dirPath, babel7Dir, { recursive: true });
        console.log(`Created Babel 7 copy at ${babel7Dir}`);
      }
      assignJSONFile(optionsPath, { BABEL_8_BREAKING: false });
    } catch (error) {
      console.error(`Error processing ${dirPath}:`, error.message);
    }
  }
}

function main() {
  const changedFiles = getUnstagedModifiedTestOutput();
  updateBabel8BreakingTrue(changedFiles);
  createBabel7Tests(changedFiles);
}

main();
