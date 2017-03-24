"use strict";

const babel = require("../.babelrc");
const register = require("babel-register").default;
const path = require("path");

if (babel.plugins) {
  // correct path of relative plugins
  babel.plugins = babel.plugins.map(function (plugin) {
    if (plugin.charAt(0) === ".") {
      return plugin.replace(/^\./, path.join(__dirname, ".."));
    }

    return plugin;
  });
}

register(babel);
register({
  extensions: [".js"],
  // Only js files in the test folder but not in the subfolder fixtures.
  only: [/packages\/.+\/test\/(?!fixtures\/).+\.js$/],
  babelrc: false,
  compact: true,
});
