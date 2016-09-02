const presetStage1 = require("babel-preset-stage-1");

const transformDoExpressions = require("babel-plugin-transform-do-expressions");
const transformFunctionBind = require("babel-plugin-transform-function-bind");

export const presets = [
  presetStage1
];

export const plugins = [
  transformDoExpressions,
  transformFunctionBind
];
