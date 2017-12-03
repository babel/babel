"use strict";

exports.__esModule = true;
exports.default = void 0;

var _standalone = require("@babel/standalone");

var notIncludedPlugins = {
  "transform-new-target": require("@babel/plugin-transform-new-target")
};
Object.keys(notIncludedPlugins).forEach(function (pluginName) {
  if (!_standalone.availablePlugins[pluginName]) {
    (0, _standalone.registerPlugin)(pluginName, notIncludedPlugins[pluginName]);
  }
});
var _default = _standalone.availablePlugins;
exports.default = _default;