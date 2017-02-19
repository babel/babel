#!/usr/bin/env node

const path       = require("path");
const resolveCwd = require("resolve-cwd");
const localCLI   = resolveCwd("babel-cli");

function resolveLocalOrGlobalBinary () {
  if (localCLI && path.relative(localCLI, __filename) !== "") {
    if (process.stdout.isTTY) {
      console.log("Using the locally installed Babel CLI");
    }

    const localBase = localCLI.replace("index.js", "");
    return path.join(localBase, "bin/babel.js");
  } else {
    return "../lib/babel";
  }
}

module.exports = resolveLocalOrGlobalBinary;

require(resolveLocalOrGlobalBinary());
