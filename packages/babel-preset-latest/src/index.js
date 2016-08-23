const { buildPreset } = require("babel-preset-es2015");

module.exports = function preset(context, opts = {}) {
  return {
    presets: [
      opts.es2015 !== false && [buildPreset, opts.es2015],
      opts.es2016 !== false && require("babel-preset-es2016"),
      opts.es2017 !== false && require("babel-preset-es2017")
    ].filter(Boolean)
  };
};
