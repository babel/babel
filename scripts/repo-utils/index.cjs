// NOTE: This file must be runnable on all Node.js version
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-node-protocol */
// @ts-check

const path = require("path");
const { fileURLToPath } = require("url");
const { createRequire } = require("module");
const semver = require("semver");

// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value) {
  return Boolean(value) && value !== "false" && value !== "0";
}

exports.repoRoot = path.resolve(__dirname, "../../");

const USE_ESM = true;
exports.USE_ESM = USE_ESM;
exports.IS_BABEL_8 = () => true;

if (typeof jest !== "undefined") {
  const dummy = () => {};
  dummy.only = dummy.skip = dummy;
  dummy.each = () => dummy;
  exports.itDummy = dummy;
  exports.itBabel8 = bool(process.env.BABEL_9_BREAKING) ? dummy : it;
  exports.itBabel9 = bool(process.env.BABEL_9_BREAKING) ? it : dummy;
  exports.itNoESM = USE_ESM ? dummy : it;
  exports.itESM = USE_ESM ? it : dummy;
  exports.itGte = function (version) {
    return semver.gte(process.version, version) ? it : dummy;
  };
  exports.itLt = function (version) {
    return semver.lt(process.version, version) ? it : dummy;
  };
  exports.itSatisfies = function (version) {
    return semver.satisfies(process.version, version) ? it : dummy;
  };
  exports.itNegate = function (jestIt) {
    return jestIt === dummy ? it : dummy;
  };
  exports.itNoWin32 = process.platform === "win32" ? dummy : it;
  exports.describeBabel8 = bool(process.env.BABEL_9_BREAKING)
    ? dummy
    : describe;
  exports.describeBabel9 = bool(process.env.BABEL_9_BREAKING)
    ? describe
    : dummy;
  exports.describeGte = function (version) {
    return semver.gte(process.version, version) ? describe : describe.skip;
  };
  exports.describeSatisfies = function (version) {
    return semver.satisfies(process.version, version)
      ? describe
      : describe.skip;
  };
  exports.describeNoCITGM = __dirname.includes("citgm_tmp")
    ? describe.skip
    : describe;
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
