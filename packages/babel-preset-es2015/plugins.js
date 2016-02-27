var assign = Object.assign || whatever;

var plugins = [
  "babel-plugin-transform-es2015-template-literals",
  "babel-plugin-transform-es2015-literals",
  "babel-plugin-transform-es2015-function-name",
  "babel-plugin-transform-es2015-arrow-functions",
  "babel-plugin-transform-es2015-block-scoped-functions",
  "babel-plugin-transform-es2015-classes",
  "babel-plugin-transform-es2015-object-super",
  "babel-plugin-transform-es2015-shorthand-properties",
  "babel-plugin-transform-es2015-computed-properties",
  "babel-plugin-transform-es2015-for-of",
  "babel-plugin-transform-es2015-sticky-regex",
  "babel-plugin-transform-es2015-unicode-regex",
  "babel-plugin-check-es2015-constants",
  "babel-plugin-transform-es2015-spread",
  "babel-plugin-transform-es2015-parameters",
  "babel-plugin-transform-es2015-destructuring",
  "babel-plugin-transform-es2015-block-scoping",
  "babel-plugin-transform-es2015-typeof-symbol",
  "babel-plugin-transform-es2015-modules-commonjs",
  ["babel-plugin-transform-regenerator", { async: false, asyncGenerators: false }],
];

module.exports = function (opts) {
  var loose = false;
  var modules = true;
  if (opts !== undefined){
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.modules !== undefined) modules = opts.modules;
  }

  if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
  if (typeof modules !== "boolean") throw new Error("Preset es2015 'modules' option must be a boolean.");

  var loosePlugins = [
    "template-literals",
    "classes",
    "computed-properties",
    "for-of",
    "spread",
    "destructuring",
    "modules-commonjs"
  ];

  var exportedPlugins = [].concat(plugins);

  if (!modules) {
    exportedPlugins.splice(exportedPlugins.indexOf(
      "babel-plugin-transform-es2015-modules-commonjs"
    ), 1);
  }

  return exportedPlugins.map(function (plugin) {
    plugin = [].concat(plugin);
    var pluginOpts = {};

    if (
      loosePlugins.indexOf("babel-plugin-transform-es2015-" + plugin[0]) >= 0
    ) {
      pluginOpts.loose = loose;
    }

    plugin[1] = assign(pluginOpts, plugin[1]);
    return plugin;
  });
};
