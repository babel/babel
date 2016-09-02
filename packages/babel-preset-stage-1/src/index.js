const presetStage2 = require("babel-preset-stage-2");

const transformClassConstructorCall = require("babel-plugin-transform-class-constructor-call");
const transformExportExtensions = require("babel-plugin-transform-export-extensions");

export const presets = [
  presetStage2
];

export const plugins = [
  transformClassConstructorCall,
  transformExportExtensions
];
