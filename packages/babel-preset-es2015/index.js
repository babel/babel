var plugins = require("./plugins")();

module.exports = {
  plugins: plugins.map(function (plugin) {
    if (Array.isArray(plugin)) {
      plugin = [require(plugin[0]), plugin[1]];
    }
    else plugin = require(plugin);
    return plugin;
  })
};
