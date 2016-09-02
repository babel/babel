const presetStage3 = require("babel-preset-stage-3");

const transformClassProperties = require("babel-plugin-transform-class-properties");
const transformObjectRestSpread = require("babel-plugin-transform-object-rest-spread");
const transformDecorators = require("babel-plugin-transform-decorators");

export const presets = [
  presetStage3
];

export const plugins = [
  transformClassProperties,
  transformObjectRestSpread,
  transformDecorators
];
