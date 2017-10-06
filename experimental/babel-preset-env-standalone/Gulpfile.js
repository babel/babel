const path = require("path");
const registerBabelStandaloneTask = require("babel-standalone/src/gulpTasks")
  .registerBabelStandaloneTask;
const gulp = require("gulp");
const webpack = require("webpack");

const version = require("./package.json").version;

const plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": '"production"',
    "process.env": JSON.stringify({ NODE_ENV: "production" }),
    BABEL_VERSION: JSON.stringify(require("babel-core/package.json").version),
    VERSION: JSON.stringify(version),
  }),
  new webpack.NormalModuleReplacementPlugin(
    /\.\/available-plugins/,
    require.resolve(path.join(__dirname, "./src/available-plugins")),
  ),
  new webpack.NormalModuleReplacementPlugin(
    /caniuse-lite\/data\/regions\/.+/,
    require.resolve(path.join(__dirname, "./src/caniuse-lite-regions")),
  ),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

registerBabelStandaloneTask(
  gulp,
  "babel-preset-env",
  "babelPresetEnv",
  __dirname,
  version,
  plugins,
);
