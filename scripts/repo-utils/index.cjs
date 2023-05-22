/* eslint-disable no-undef */

const path = require("path");
const { readFileSync } = require("fs");
const { fileURLToPath } = require("url");
const { createRequire } = require("module");
const semver = require("semver");

let USE_ESM = false;
try {
  const type = readFileSync(
    path.join(__dirname, "../../.module-type"),
    "utf-8"
  ).trim();
  USE_ESM = type === "module";
} catch (_) {}

exports.USE_ESM = USE_ESM;

if (typeof jest !== "undefined") {
  exports.itNoESM = USE_ESM ? it.skip : it;
  exports.itESM = USE_ESM ? it : it.skip;
  exports.itGteESM = function (version) {
    return USE_ESM && semver.gte(process.version, version) ? it : it.skip;
  };
  exports.itGteNoESM = function (version) {
    return !USE_ESM && semver.gte(process.version, version) ? it : it.skip;
  };
  exports.itGte = function (version) {
    return semver.gte(process.version, version) ? it : it.skip;
  };
}

exports.commonJS = function (metaUrl) {
  const filename = fileURLToPath(metaUrl);
  const dirname = path.dirname(filename);
  return {
    __filename: filename,
    __dirname: dirname,
    // Only available in Node.js 12+
    require: createRequire ? createRequire(filename) : null,
  };
};
