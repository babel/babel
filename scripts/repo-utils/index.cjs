/* eslint-disable no-undef */

const path = require("path");
const { readFileSync } = require("fs");
const { fileURLToPath } = require("url");
const { createRequire } = require("module");
const semver = require("semver");

exports.repoRoot = path.resolve(__dirname, "../../");

let USE_ESM = false;
try {
  const type = readFileSync(
    path.join(__dirname, "../../.module-type"),
    "utf-8"
  ).trim();
  USE_ESM = type === "module";
} catch (_) {}

function bool(value) {
  return Boolean(value) && value !== "false" && value !== "0";
}
exports.USE_ESM = USE_ESM;
exports.IS_BABEL_8 = () => bool(process.env.BABEL_8_BREAKING);

if (typeof jest !== "undefined") {
  const dummy = () => {};
  dummy.only = dummy.skip = dummy;
  exports.itDummy = dummy;
  exports.itNoESM = USE_ESM ? dummy : it;
  exports.itESM = USE_ESM ? it : dummy;
  exports.itGteESM = function (version) {
    return USE_ESM && semver.gte(process.version, version) ? it : dummy;
  };
  exports.itGteNoESM = function (version) {
    return !USE_ESM && semver.gte(process.version, version) ? it : dummy;
  };
  exports.itGte = function (version) {
    return semver.gte(process.version, version) ? it : dummy;
  };
  exports.itNoWin32 = process.platform === "win32" ? dummy : it;
  exports.itBabel8 = process.env.BABEL_8_BREAKING ? it : dummy;
  exports.itBabel7 = process.env.BABEL_8_BREAKING ? dummy : it;
  exports.itBabel7NoESM = process.env.BABEL_8_BREAKING
    ? dummy
    : exports.itNoESM;
  exports.itBabel7GteNoESM = function (version) {
    return process.env.BABEL_8_BREAKING ? dummy : exports.itGteNoESM(version);
  };
  exports.describeESM = USE_ESM ? describe : dummy;
  exports.describeBabel7 = process.env.BABEL_8_BREAKING ? dummy : describe;
  exports.describeBabel7NoESM = USE_ESM ? dummy : exports.describeBabel7;
  exports.describeBabel8 = process.env.BABEL_8_BREAKING ? describe : dummy;
  exports.describeGte = function (version) {
    return semver.gte(process.version, version) ? describe : describe.skip;
  };
}

exports.commonJS = function (metaUrl) {
  if (!metaUrl) {
    throw new Error("commonJS() requires import.meta.url");
  }
  const filename = fileURLToPath(metaUrl);
  const dirname = path.dirname(filename);
  return {
    __filename: filename,
    __dirname: dirname,
    // Only available in Node.js 12+
    require: createRequire ? createRequire(filename) : null,
  };
};
