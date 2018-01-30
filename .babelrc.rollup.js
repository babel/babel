"use strict";

const cloneDeep = require("lodash/cloneDeep");
const babelrc = require("./.babelrc.js");

const config = cloneDeep(babelrc);

const presetEnv = config.presets.find(preset => preset[0] === "@babel/env");

if (!presetEnv) {
  throw new Error("Error while extracting @preset/env from .babelrc.js");
}

presetEnv[1].modules = false;

module.exports = config;
